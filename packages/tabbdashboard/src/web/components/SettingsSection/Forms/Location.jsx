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
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    defaultOptions={{
      scrollwheel: false
    }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
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
          isMarkerShown
        />
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
