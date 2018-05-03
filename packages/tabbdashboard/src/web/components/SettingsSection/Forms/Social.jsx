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
  FormBoxSubmit
} from '../../styled/FormBox'
import {
  updateSocialInitAction
} from '../../../../ducks/restaurant'
import Progress from '../../Progress'
import FlatButton from 'material-ui/FlatButton';
import Text from '../../MaterialInputs/Text'

let SocialForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="facebook" component={Text} componentProps={{floatingLabelText: "Facebook"}} />
      <Field name="instagram" component={Text} componentProps={{floatingLabelText: "Instagram"}} />
      <FlatButton type="submit" label="Save" fullWidth={true} />
    </form>
  )
}
SocialForm = reduxForm({
  form: 'settings/social',
  enableReinitialize: true
})(SocialForm)

const Social = ({
  updateSocial,
  social
}) => {
  if (!social) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>
        <span>Social Media</span>
        <Progress type={'UPDATE_SOCIAL'}/>
      </FormBoxHead>
      <FormBoxBody material>
        <SocialForm onSubmit={updateSocial} initialValues={social}/>
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateSocial: updateSocialInitAction,
  },
)(Social);
