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
  updateNameInitAction
} from '../../../../ducks/restaurant'
import Progress from '../../Progress'
import FlatButton from 'material-ui/FlatButton';
import Text from '../../MaterialInputs/Text'

let NameForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" component={Text} placeholder="Restaurant Name" />
      <FlatButton type="submit" label="Update" fullWidth={true} />
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
  if (!name) return (<div />)
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
