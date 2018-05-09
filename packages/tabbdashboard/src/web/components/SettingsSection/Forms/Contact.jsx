// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody
} from '../../styled/FormBox'
import {
  updateContactInitAction
} from 'ducks/restaurantLegacy'
import Progress from '../../Progress'
import Text from '../../MaterialInputs/Text'
import Button from 'material-ui/Button';


let ContactForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="website" component={Text} componentProps={{label: "Website", fullWidth: true, margin: 'normal'}} />
      <Field name="email" component={Text} componentProps={{label: "Email", fullWidth: true, margin: 'normal'}} />
      <Field name="phone" component={Text} componentProps={{label: "Phone", fullWidth: true, margin: 'normal'}} />
      <Button type="submit" fullWidth={true}>SAVE</Button>
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
