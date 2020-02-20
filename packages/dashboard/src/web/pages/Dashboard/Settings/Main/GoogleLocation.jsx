import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import find from 'ramda/es/find';
import includes from 'ramda/es/includes';
import anyPass from 'ramda/es/anyPass';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import {
  updateRestaurantAsync
} from 'features/restaurant/actions';
import Progress from 'web/components/Progress';
import PlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { compose, withProps } from 'recompose';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import TextField from '@material-ui/core/TextField';
import AddressForm from 'web/components/AddressForm';
import { change as setFormFields } from 'redux-form';


const addressByPlaceId = (placeId) => new Promise((resolve, reject) => {
  geocodeByPlaceId(placeId)
    .then(results => {
      const result = results[0];
      if (!result) {
        resolve(null);
        return;
      };
      getLatLng(result)
        .then((latlng) => {
          const addressComponents = result.address_components;

          let route = find((item) => item.types.includes('route'))(addressComponents);
          if (route) route = route.short_name;

          let streetNumber = find((item) => anyPass(
            ['street_number', 'premise'].map((t) => (types) => includes(t, types))
          )(item.types))(addressComponents);
          if (streetNumber) streetNumber = streetNumber.short_name;

          let city = find((item) => anyPass([
            'locality',
            'administrative_area_level_3',
            'administrative_area_level_2',
            'administrative_area_level_1'
          ].map((t) => (types) => includes(t, types))
          )(item.types))(addressComponents);
          if (city) city = city.short_name;

          let postalCode = find((item) => item.types.includes('postal_code'))(addressComponents);
          if (postalCode) postalCode = postalCode.short_name;

          let country = find((item) => item.types.includes('country'))(addressComponents);
          if (country) country = country.short_name;

          resolve({ route, streetNumber, city, postalCode, country, latlng });
        })
        .catch(reject);
    })
    .catch(reject);
})

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (a, placeId) => {
    const { setMapPosition, setAddress } = this.props;
    addressByPlaceId(placeId).then((address) => {
      if (address) {
        setMapPosition(address.latlng);
        setAddress(address);
      }
    }).catch((error) => console.error(error));
  };

  render() {
    const { t } = this.props;
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              fullWidth
              {...getInputProps({
                placeholder: t('searchPlaces'),
                className: 'location-search-input',
              })}
            />
            <div
              className="autocomplete-dropdown-container"
              style={{
                position: 'absolute', zIndex: 2147483647,
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)'
              }}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style: { ...style, padding: '10px 5px' },
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const MapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%`, overflow: 'hidden' }} />,
    containerElement: (
      <div
        style={{
          height: `220px`,
          borderRadius: '6px',
          overflow: 'hidden',
          marginTop: '10px',
        }}
      />
    ),
    mapElement: <div style={{ height: `100%`, overflow: 'hidden' }} />,
  }),
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    center={{ lat: props.latitude, lng: props.longitude }}
    defaultOptions={{
      scrollwheel: false,
    }}
  >
    <Marker
      draggable
      onDragEnd={o => {
        props.updateLocation({
          longitude: o.latLng.lng(),
          latitude: o.latLng.lat(),
        });
      }}
      position={{
        lat: props.latitude,
        lng: props.longitude,
      }}
      onRightClick={() => { }}
    />
  </GoogleMap>
));

const Location = ({ updateRestaurant, restaurant, address, setFormFields }) => {
  const { t } = useTranslation();
  if (!restaurant) return <div />;
  const latitude = Number(restaurant.latitude) || 50.08730075;
  const longitude = Number(restaurant.longitude) || 14.4207852;
  return (
    <FormBox>
      <FormBoxHead>
        <span>{t('location')}</span>
        <Progress type={'UPDATE_LOCATION'} />
      </FormBoxHead>
      <FormBoxBody>
        <LocationSearchInput
          t={t}
          setAddress={(a) => {
            if (a.route && a.streetNumber) {
              setFormFields('settings/address', 'street', `${a.route} ${a.streetNumber}`);
            }
            if (a.city) setFormFields('settings/address', 'locality', a.city);
            if (a.postalCode) setFormFields('settings/address', 'postal_code', a.postalCode);
          }}
          setMapPosition={(latlng) =>
            updateRestaurant({
              longitude: latlng.lng,
              latitude: latlng.lat,
            })
          }
        />
        <MapComponent
          updateLocation={updateRestaurant}
          restaurant={restaurant}
          latitude={latitude}
          longitude={longitude}
        />
        <AddressForm onSubmit={(fields) => updateRestaurant(
          {
            address: {
              business:
              {
                street: fields.street,
                locality: fields.locality, // city
                postal_code: fields.postal_code,
                country: 'Czechia',
                region: 'Prague'
              }
            }
          }
        )} initialValues={address} />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(null, {
  updateRestaurant: updateRestaurantAsync.request,
  setFormFields
})(Location);
