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
import * as FN from 'lib/FN'
import Chip from '@material-ui/core/Chip';

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
  form: 'settings/servicecalls',
  enableReinitialize: true
})(NameForm)

const ServiceCalls = ({
  updateName,
  calls
}) => {
  return (
    <FormBox>
      <FormBoxHead>
        <span>Service calls</span>
        <Progress type={'UPDATE_CALLS'}/>
      </FormBoxHead>
      <FormBoxBody material>
        {FN.MapToList(calls).map((call) =>
          <Chip key={call.id} label={call.name} style={{margin: '5px'}} onDelete={() => {}}>

          </Chip>
        )}
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateName: updateNameInitAction
  }
)(ServiceCalls);
