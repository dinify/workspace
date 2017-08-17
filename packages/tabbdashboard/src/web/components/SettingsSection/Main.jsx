// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';

import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from './styled/FormBox';

import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
} from '../../ducks/restaurant'

type MainProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  update: typeof updateInitAction,
  updateCategory: typeof updateCategoryInitAction,
  updateSocial: typeof updateSocialInitAction,
  updateContact: typeof updateContactInitAction,
};

const Main = ({ lastError, loggedRestaurant, update, updateCategory, updateSocial, updateContact }: MainProps) =>
  (<div>
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
      <input placeholder="Longitude" type="text" />
      <input placeholder="Latitude" type="text" />
    </FormBoxBody>
  </FormBox>


  <FormBox>
    <FormBoxHead>Business Hours</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Weekday" type="text" />
      <input placeholder="Weekend" type="text" />
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Banking Information</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Bank name" type="text" />
      <input placeholder="Enter beneficiary name" type="text" />
      <input placeholder="Enter IBAN number" type="text" />
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Options</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Enter option category" type="text" />
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Add-Ons</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Enter add-on item name" type="text" />
      <input placeholder="Price" type="text" />
    </FormBoxBody>
  </FormBox>

  <FormBox>
    <FormBoxHead>Set Tablet(s)</FormBoxHead>
    <FormBoxBody>
      <input placeholder="Tablet ID" type="text" />
      <input placeholder="Password" type="text" />
      <FormBoxSubmit>SAVE</FormBoxSubmit>
    </FormBoxBody>
  </FormBox>
</div>);

export default connect(
state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant
}),
{
  update: updateInitAction,
  updateCategory: updateCategoryInitAction,
  updateSocial: updateSocialInitAction,
  updateContact: updateContactInitAction,
},
)(Settings);