// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Grid from 'material-ui/Grid'
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
import Button from 'material-ui/Button';
import Text from '../../MaterialInputs/Text'

const WrappedIcon = ({name}) => (
  <div style={{height: '40px', textAlign: 'center'}}>
    <i className={name} style={{ fontSize: 24 }} />
  </div>
)

let SocialForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item xs={1}>
          <WrappedIcon name="ion-social-facebook" />
        </Grid>
        <Grid item xs={11}>
          <Field name="facebook" component={Text} componentProps={{label: "Facebook URL", fullWidth: true, margin: 'normal'}} />
        </Grid>
        <Grid item xs={1}>
          <WrappedIcon name="ion-social-instagram" />
        </Grid>
        <Grid item xs={11}>
          <Field name="instagram" component={Text} componentProps={{label: "Instagram URL", fullWidth: true, margin: 'normal'}} />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth={true}>SAVE</Button>
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
