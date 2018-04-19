// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import SwitchButton from 'react-switch-button'
import 'react-switch-button/dist/react-switch-button.css'
import Dropzone from 'react-dropzone'
import moment from 'moment'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  FieldWrapper,
  Label
} from '../styled/FormBox';
import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
  updateLocationInitAction,
  uploadMainImageInitAction
} from '../../../ducks/restaurant'

import BusinessHours from './Forms/BusinessHours'
import Banking from './Forms/Banking'
import Social from './Forms/Social'
import Location from './Forms/Location'

const TODO = styled.div `
  text-align: center;
  padding: 20px;
  color: rgba(0,0,0,0.3)
`;

const MainContrainer = styled.div `
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
  loggedRestaurant,
  update,
  updateCategory,
  updateContact,
  updateDone,
  uploadMainImage
}) => {
  if (!loggedRestaurant) return (<div />)
  return (<MainContrainer>

    <div style={{marginLeft: '10px'}}>
      {updateDone === 'updating' ? 'Updating...' : ''}
      {updateDone === 'done' ? 'Everything is up to date.' : ''}
    </div>

    <FormBox>
      <FormBoxHead>Restaurant Name</FormBoxHead>
      <FormBoxBody>
        <Form
          onSubmit={({ name }) => {
            update({ name });
          }}
          defaultValues={{
            name: loggedRestaurant.name
          }}
          validate={({ name }) => {
            return {
              name: !name ? 'Restaurant Name is required' : undefined,
            }
          }}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <Text field='name' placeholder='Restaurant Name' />
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
        label="Classic"
        labelRight="QLess"
        type="switch"
        defaultChecked={loggedRestaurant.type === 'QLESS'}
        onChange={() => {
          if(loggedRestaurant.type === 'CLASSIC') {
            updateCategory({ category: 'QLESS'})
          } else {
            updateCategory({ category: 'CLASSIC'})
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
        validate={({ website, email, phone }) => {
          return {
            website: !website ? 'Website is required' : undefined,
            email: !email ? 'Email is required' : undefined,
            phone: !phone ? 'Phone is required' : undefined,
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='website' placeholder='Website' />
              <Text field='email' placeholder='Email address' />
              <Text field='phone' placeholder='Phone number' />

              <FormBoxSubmit>SAVE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>

    </FormBoxBody>
  </FormBox>

  <Location loggedRestaurant={loggedRestaurant} />

  <Social social={loggedRestaurant.social} />

  <BusinessHours openHours={loggedRestaurant.open_hours} />

  <Banking payout={loggedRestaurant.payout} />

</MainContrainer>);
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    updateDone: state.restaurant.updateDone
  }), {
    update: updateInitAction,
    updateCategory: updateCategoryInitAction,
    updateContact: updateContactInitAction,
    uploadMainImage: uploadMainImageInitAction
  },
)(Main);
