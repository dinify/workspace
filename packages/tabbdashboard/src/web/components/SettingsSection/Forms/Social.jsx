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
  FieldWrapper,
  Label
} from '../../styled/FormBox'
import {
  updateSocialInitAction
} from '../../../../ducks/restaurant'

const Social = ({
  updateSocial,
  social
}) => {
  if (!social) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>Social Media</FormBoxHead>
      <FormBoxBody>
        <Form
          onSubmit={(output) => {
            updateSocial(output);
          }}
          defaultValues={social}
          validate={({ facebook, instagram }) => {
            return {
              facebook: !facebook ? 'Facebook URL is required' : undefined,
              instagram: !instagram ? 'Instagram URL is required' : undefined,
            }
          }}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <FieldWrapper>
                  <i className="ion-social-facebook" />
                  <Text field='facebook' placeholder='www.facebook.com/myRestaurant' />
                </FieldWrapper>
                <FieldWrapper>
                  <i className="ion-social-instagram-outline" />
                  <Text field='instagram' placeholder='www.instagram.com/myRestaurant' />
                </FieldWrapper>
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
    updateSocial: updateSocialInitAction,
  },
)(Social);
