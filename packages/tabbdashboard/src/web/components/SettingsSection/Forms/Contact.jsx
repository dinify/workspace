// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
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
import Text from '../../MaterialInputs/Text'
import FlatButton from 'material-ui/FlatButton';


let ContactForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="website" component={Text} placeholder="Website" />
      <Field name="email" component={Text} placeholder="Email" />
      <Field name="phone" component={Text} placeholder="Phone" />
      <FlatButton type="submit" label="Update" fullWidth={true} />
    </form>
  )
}
ContactForm = reduxForm({
  form: 'settings/contact',
  enableReinitialize: true
})(ContactForm)

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
      <FormBoxBody material>
        <ContactForm onSubmit={updateContact} initialValues={contact}/>
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateContact: updateContactInitAction,
  },
)(Contact);
