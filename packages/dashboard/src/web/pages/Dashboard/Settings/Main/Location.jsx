// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import { updateLocationInitAction } from 'ducks/restaurant/actions';
import Progress from 'web/components/Progress';

const MapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.32&libraries=geometry,drawing,places&key=AIzaSyCdMtav7DF_cnPOKLuy4DJiJOqwdmbuMKM',
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
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    defaultOptions={{
      scrollwheel: false,
    }}
  >
    <Marker
      draggable={true}
      onDragEnd={o => {
        console.log(o.latLng.lat(), o.latLng.lng());
        props.updateLocation({
          name: 'name must be here',
          longitude: o.latLng.lng(),
          latitude: o.latLng.lat(),
        });
      }}
      position={{
        lat: props.latitude,
        lng: props.longitude,
      }}
      onRightClick={() => props.onMarkerRightClick(1)}
    />
  </GoogleMap>
));

const Location = ({ updateLocation, loggedRestaurant }) => {
  if (!loggedRestaurant) return <div />;
  const latitude = loggedRestaurant.latitude || 50.08730075;
  const longitude = loggedRestaurant.longitude || 14.4207852;
  return (
    <FormBox>
      <FormBoxHead>
        <span>Location</span>
        <Progress type={'UPDATE_LOCATION'} />
      </FormBoxHead>
      <FormBoxBody>
        <MapComponent
          updateLocation={updateLocation}
          loggedRestaurant={loggedRestaurant}
          latitude={latitude}
          longitude={longitude}
        />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(state => ({}), {
  updateLocation: updateLocationInitAction,
})(Location);
