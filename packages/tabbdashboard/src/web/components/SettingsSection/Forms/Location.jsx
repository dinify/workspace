// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
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

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    onClick={props.onMapClick}
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
        lat: props.lat,
        lng: props.lng
      }}
      onRightClick={() => props.onMarkerRightClick(1)}
    />
  </GoogleMap>
));

const Location = ({
  updateLocation,
  loggedRestaurant
}) => {
  if (!loggedRestaurant) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>Location</FormBoxHead>
      <FormBoxBody>
        <Form
          onSubmit={({ name, longitude, latitude }) => {
            updateLocation({ name, longitude, latitude })
          }}
          defaultValues={{
            longitude: loggedRestaurant.longitude,
            latitude: loggedRestaurant.latitude
          }}
          validate={({ name, longitude, latitude }) => {
            return {
              name: !name ? 'Area name is required' : undefined,
              longitude: !longitude ? 'Longitude is required' : undefined,
              latitude: !latitude ? 'Latitude URL is required' : undefined,
            }
          }}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <Select
                  field='name'
                  options={areaNames}
                />
                <GettingStartedGoogleMap
                  updateLocation={updateLocation}
                  loggedRestaurant={loggedRestaurant}
                  containerElement={
                    <div style={{ height: `200px`, margin: '10px 0' }} />
                  }
                  mapElement={
                    <div style={{ height: `200px` }} />
                  }
                  lng={loggedRestaurant.longitude}
                  lat={loggedRestaurant.latitude}
                />
                <Text field='longitude' placeholder='Longitude' />
                <Text field='latitude' placeholder='Latitude' />
                <FormBoxSubmit>SAVE</FormBoxSubmit>
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
