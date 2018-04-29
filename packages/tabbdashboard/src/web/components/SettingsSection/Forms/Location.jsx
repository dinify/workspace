// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import moment from 'moment'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  FieldWrapper,
  Label
} from '../../styled/FormBox'
import {
  updateLocationInitAction
} from '../../../../ducks/restaurant'
import Progress from '../../Progress'
import FlatButton from 'material-ui/FlatButton';

const areaNames = R.sort((a, b) => {
  return a.localeCompare(b);
}, [
  'Qibla',
  'Sharq',
  'Mirqab',
  'Salmiya',
  'Hawally',
  'Farwaniya',
  'Mubarak Al Kabeer',
  'Ahmadi',
  'Shuwaikh',
  'The Avenues Rai',
  'Jahra',
  'Jabriya',
  'Gulf Road seaside',
]).map((a) => ({
  label: a,
  value: a.toUpperCase()
}));


const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.32&libraries=geometry,drawing,places&key=AIzaSyCdMtav7DF_cnPOKLuy4DJiJOqwdmbuMKM",
    loadingElement: <div style={{ height: `100%`, overflow:'hidden' }} />,
    containerElement: <div style={{ height: `220px`, borderRadius: "6px", overflow: "hidden", marginTop: "10px" }} />,
    mapElement: <div style={{ height: `100%`, overflow:'hidden' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    defaultOptions={{
      scrollwheel: false
    }}
  >
    <Marker
      draggable={true}
      onDragEnd={(o) => {
        console.log(o.latLng.lat(), o.latLng.lng())
        props.updateLocation({
          name: "name must be here",
          longitude: o.latLng.lng(),
          latitude: o.latLng.lat()
        })
      }}
      position={{
        lat: props.latitude,
        lng: props.longitude
      }}
      onRightClick={() => props.onMarkerRightClick(1)}
    />
  </GoogleMap>
)

const Location = ({
  updateLocation,
  loggedRestaurant
}) => {
  if (!loggedRestaurant) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>
        <span>Location</span>
        <Progress type={'UPDATE_LOCATION'}/>
      </FormBoxHead>
      <FormBoxBody>
        <MapComponent
          updateLocation={updateLocation}
          loggedRestaurant={loggedRestaurant}
          latitude={loggedRestaurant.latitude}
          longitude={loggedRestaurant.longitude}
        />
        <Form
          onSubmit={({ name, longitude, latitude }) => {
            updateLocation({ name, longitude, latitude })
          }}
          defaultValues={{
            longitude: loggedRestaurant.longitude,
            latitude: loggedRestaurant.latitude
          }}
          validate={({ longitude, latitude }) => {
            return {
              longitude: !longitude ? 'Longitude is required' : undefined,
              latitude: !latitude ? 'Latitude URL is required' : undefined,
            }
          }}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>

                <Text field='longitude' placeholder='Longitude' />
                <Text field='latitude' placeholder='Latitude' />
                <FlatButton type="submit" label="Update" fullWidth={true} />
              </form>
            )
          }}
        </Form>
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateLocation: updateLocationInitAction,
  },
)(Location);
