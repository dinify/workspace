// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../../flow';
import { Link } from 'react-router-dom';
import { Form, Text, Select } from 'react-form';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';

import _ from 'underscore';

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from '../styled/FormBox';

import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
  updateLocationInitAction,
} from '../../../ducks/restaurant'

type MainProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  update: typeof updateInitAction,
  updateCategory: typeof updateCategoryInitAction,
  updateSocial: typeof updateSocialInitAction,
  updateContact: typeof updateContactInitAction,
  updateLocation: typeof updateLocationInitAction,
  updateDone: Any,
};

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
        position={{
            lat: props.lat,
            lng: props.lng,
        }}
        onRightClick={() => props.onMarkerRightClick(1)}
      />
  </GoogleMap>
));

const TODO = styled.div`
  text-align: center;
  padding: 20px;
  color: rgba(0,0,0,0.3)
`;

const areaNames = [
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
].map((a) => ({label: a, value: a.toUpperCase()}));

const Main = ({
  lastError,
  loggedRestaurant,
  update,
  updateCategory,
  updateSocial,
  updateContact,
  updateLocation,
  updateDone,
}: MainProps) =>
  (<div>

    <div style={{textAlign: 'center'}}>
      {updateDone === 'updating' ? 'Updating...' : ''}
      {updateDone === 'done' ? 'Everything is up to date.' : ''}
    </div>

  <FormBox>
    <FormBoxHead>Type of Restaurant</FormBoxHead>
    <FormBoxBody center pt={20} pb={20}>
      <SwitchButton
        name="switch-type"
        label="Classic"
        labelRight="QLESS"
        type="switch"
        defaultChecked={loggedRestaurant.category === 'QUEUELESS'}
        onChange={() => {
          if(loggedRestaurant.category === 'RESTAURANT') {
            // by now it's gonna be QLESS
            updateCategory({ category: 'QUEUELESS'})
          } else { // it's QLESS, so by now it's gonna be RESTAURANT
            updateCategory({ category: 'RESTAURANT'})
          }
        }}
      />
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Restaurant Name</FormBoxHead>
    <FormBoxBody>

      <Form
        onSubmit={({ restaurantName }) => {
          console.log('Success!', { restaurantName });
          update({ restaurantName });
        }}
        defaultValues={{
          restaurantName: loggedRestaurant.restaurantName
        }}
        validate={({ restaurantName }) => {
          return {
            restaurantName: !restaurantName ? 'Restaurant Name is required' : undefined,
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='restaurantName' placeholder='Restaurant Name' />
              <FormBoxSubmit>SAVE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>

    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Main Image</FormBoxHead>
    <FormBoxBody>
      <TODO>work in progress</TODO>
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Contact Information</FormBoxHead>
    <FormBoxBody>

      <Form
        onSubmit={(contact) => {
          console.log('Success!', contact);
          updateContact(contact);
        }}
        defaultValues={loggedRestaurant.contact}
        validate={({ nameInCharge, email, mobile }) => {
          return {
            nameInCharge: !nameInCharge ? 'Name is required' : undefined,
            email: !email ? 'Email is required' : undefined,
            mobile: !mobile ? 'Mobile is required' : undefined,
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='nameInCharge' placeholder='Name in charge' />
              <Text field='email' placeholder='Email address' />
              <Text field='mobile' placeholder='Mobile number' />

              <FormBoxSubmit>SAVE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>

    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Social Media</FormBoxHead>
    <FormBoxBody>

      <Form
        onSubmit={(social) => {
          updateSocial(social);
        }}
        defaultValues={loggedRestaurant.socialMedia}
        validate={({ facebookURL, instagramURL }) => {
          return {
            facebookURL: !facebookURL ? 'Facebook URL is required' : undefined,
            instagramURL: !instagramURL ? 'Instagram URL is required' : undefined,
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='facebookURL' placeholder='https://www.facebook.com/myRestaurant' />
              <Text field='instagramURL' placeholder='https://www.instagram.com/myRestaurant' />

              <FormBoxSubmit>SAVE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>

    </FormBoxBody>
  </FormBox>


  <FormBox>
    <FormBoxHead>Location</FormBoxHead>
    <FormBoxBody>

      <Form
        onSubmit={(loc) => {
          console.log(loc);
          updateLocation(loc);
        }}
        defaultValues={loggedRestaurant.location}
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
                containerElement={
                  <div style={{ height: `200px`, margin: '10px 0' }} />
                }
                mapElement={
                  <div style={{ height: `200px` }} />
                }
                onMapLoad={_.noop}
                onMapClick={_.noop}
                onMarkerRightClick={_.noop}
                lng={loggedRestaurant.location.longitude}
                lat={loggedRestaurant.location.latitude}
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


  <FormBox>
    <FormBoxHead>Business Hours</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Weekday" type="text" />
      <input placeholder="Weekend" type="text" />
      <FormBoxSubmit>SAVE</FormBoxSubmit>
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Banking Information</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Bank name" type="text" />
      <input placeholder="Enter beneficiary name" type="text" />
      <input placeholder="Enter IBAN number" type="text" />
      <FormBoxSubmit>SAVE</FormBoxSubmit>
    </FormBoxBody>
  </FormBox>


</div>);

export default connect(
state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant,
  updateDone: state.restaurant.updateDone
}),
{
  update: updateInitAction,
  updateCategory: updateCategoryInitAction,
  updateSocial: updateSocialInitAction,
  updateContact: updateContactInitAction,
  updateLocation: updateLocationInitAction,
},
)(Main);
