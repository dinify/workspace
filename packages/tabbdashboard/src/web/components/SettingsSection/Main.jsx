// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { Error } from '../../../flow'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SwitchButton from 'react-switch-button'
import 'react-switch-button/dist/react-switch-button.css'
import Dropzone from 'react-dropzone'



import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit, FieldWrapper, Label } from '../styled/FormBox';

import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
  updateLocationInitAction,
  updateHoursInitAction,
  updateBankInitAction,
  uploadMainImageInitAction
} from '../../../ducks/restaurant'

type MainProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  update: typeof updateInitAction,
  updateCategory: typeof updateCategoryInitAction,
  updateSocial: typeof updateSocialInitAction,
  updateContact: typeof updateContactInitAction,
  updateLocation: typeof updateLocationInitAction,
  updateBank: typeof updateBankInitAction,
  updateHours: typeof updateHoursInitAction,
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

const areaNames = R.sort((a, b) => {
  return a.localeCompare(b);
},[
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
]).map((a) => ({label: a, value: a.toUpperCase()}));

const MainContrainer = styled.div`
  column-count: 3;
  column-gap: 0;
  @media (max-width: 1150px) {
    column-count: 2;
  }
  @media (max-width: 860px) {
    column-count: 1;
  }
`

const Main = ({
  lastError,
  loggedRestaurant,
  update,
  updateCategory,
  updateSocial,
  updateContact,
  updateLocation,
  updateBank,
  updateHours,
  updateDone,
  uploadMainImage
}: MainProps) =>
  (<MainContrainer>

    <div style={{marginLeft: '10px'}}>
      {updateDone === 'updating' ? 'Updating...' : ''}
      {updateDone === 'done' ? 'Everything is up to date.' : ''}
    </div>

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
    <FormBoxHead>Type of Restaurant</FormBoxHead>
    <FormBoxBody center pt={20} pb={20}>
      <SwitchButton
        name="switch-type"
        label="Restaurant"
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
    <FormBoxHead>Main Image</FormBoxHead>
    <FormBoxBody>
      <Dropzone
        accept="image/jpg, image/jpeg, image/png"
        onDrop={(accepted, rejected) => {
          if (accepted && accepted.length > 0) uploadMainImage({ file: accepted[0] })
        }}
        style={{
          width: '250px',
          padding: '10px',
          fontSize: '11px',
          border: '1px dashed #ccc',
          margin: '10px 0'
        }}
      >
        <p>Try dropping your photo here, or click to select file to upload.</p>
        <p>Only *.jpg and *.png image will be accepted</p>
      </Dropzone>

      <img
        src={`https://s3.eu-central-1.amazonaws.com/tabb/tabb-restaurant-image/RESTAURANT_${loggedRestaurant.id}?datetime=${Date.now()}`}
        width="250"
      />
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
              <FieldWrapper>
                <i className="ion-social-facebook" />
                <Text field='facebookURL' placeholder='https://www.facebook.com/myRestaurant' />
              </FieldWrapper>
              <FieldWrapper>
                <i className="ion-social-instagram-outline" />
                <Text field='instagramURL' placeholder='https://www.instagram.com/myRestaurant' />
              </FieldWrapper>
              <FormBoxSubmit>SAVE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>

    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Business Hours</FormBoxHead>
    <FormBoxBody half>
      <Form
        onSubmit={(hours) => {
          console.log('Success!', hours);
          updateHours(hours);
        }}
        defaultValues={{
          weekdayFrom: loggedRestaurant.businessHours.weekday.from,
          weekdayTo: loggedRestaurant.businessHours.weekday.to,
          weekendFrom: loggedRestaurant.businessHours.weekend.from,
          weekendTo: loggedRestaurant.businessHours.weekend.to
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Label>Workday</Label>
              <Text field='weekdayFrom' placeholder='Weekday from' />
              <span> - </span>
              <Text field='weekdayTo' placeholder='Weekday to' />
              <Label>Weekend</Label>
              <Text field='weekendFrom' placeholder='Weekend from' />
              <span> - </span>
              <Text field='weekendTo' placeholder='Weekend to' />
              <FormBoxSubmit>SAVE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Banking Information</FormBoxHead>
    <FormBoxBody>
      <Form
        onSubmit={(bank) => {
          console.log('Success!', bank);
          updateBank(bank);
        }}
        defaultValues={loggedRestaurant.bank}
        validate={({ name, beneficiaryName, IBAN }) => {
          return {
            name: !name ? 'Bank name is required' : undefined,
            beneficiaryName: !beneficiaryName ? 'Beneficiary Name is required' : undefined,
            IBAN: !IBAN ? 'IBAN is required' : undefined,
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='name' placeholder='Bank name' />
              <Text field='beneficiaryName' placeholder='Beneficiary name' />
              <Text field='IBAN' placeholder='IBAN number' />
              <FormBoxSubmit>SAVE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>
    </FormBoxBody>
  </FormBox>


</MainContrainer>);

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
  updateHours: updateHoursInitAction,
  updateBank: updateBankInitAction,
  uploadMainImage: uploadMainImageInitAction
},
)(Main);
