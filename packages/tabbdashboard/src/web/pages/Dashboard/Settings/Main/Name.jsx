// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormBox, FormBoxHead, FormBoxBody } from 'web/components/styled/FormBox'
import {
  updateNameInitAction
} from 'ducks/restaurantLegacy'
import Progress from 'web/components/Progress'
import Button from 'material-ui/Button';
import Text from 'web/components/MaterialInputs/Text'

let NameForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" component={Text} componentProps={{fullWidth: true, margin: 'normal'}}/>
      <Button type="submit" fullWidth={true}>SAVE</Button>
    </form>
  )
}
NameForm = reduxForm({
  form: 'settings/name',
  enableReinitialize: true
})(NameForm)

const Name = ({
  updateName,
  name
}) => {
  console.log(name)
  return (
    <FormBox>
      <FormBoxHead>
        <span>Restaurant Name</span>
        <Progress type={'UPDATE_NAME'}/>
      </FormBoxHead>
      <FormBoxBody material>
        <NameForm onSubmit={updateName} initialValues={{name}}/>
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateName: updateNameInitAction
  }
)(Name);
