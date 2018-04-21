// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import moment from 'moment'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../../styled/FormBox'
import {
  updateContactInitAction
} from '../../../../ducks/restaurant'
import Progress from '../../Progress'

const Contact = ({
  updateContact,
  contact
}) => {
  if (!contact) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>
        <span>Contact Information</span>
        <Progress type={'UPDATE_CONTACT'}/>
      </FormBoxHead>
      <FormBoxBody>
        <Form
          onSubmit={(output) => {
            updateContact(output);
          }}
          defaultValues={contact}
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
  );
}

export default connect(
  state => ({}), {
    updateContact: updateContactInitAction,
  },
)(Contact);
