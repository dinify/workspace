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
  updateBankInitAction
} from '../../../../ducks/restaurant'
import Progress from '../../Progress'
import Text from '../../MaterialInputs/Text'
import FlatButton from 'material-ui/FlatButton';

let BankingForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="bank_name" component={Text} placeholder="Bank name" />
      <Field name="beneficiary_name" component={Text} placeholder="Beneficiary name" />
      <Field name="iban" component={Text} placeholder="IBAN number" />
      <Field name="bic" component={Text} placeholder="BIC" />
      <FlatButton type="submit" label="Update" fullWidth={true} />
    </form>
  )
}
BankingForm = reduxForm({
  form: 'settings/banking',
  enableReinitialize: true
})(BankingForm)

const Banking = ({
  updateBank,
  payout
}) => {
  if (!payout) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>
        <span>Banking Information</span>
        <Progress type={'UPDATE_BANK'}/>
      </FormBoxHead>
      <FormBoxBody material>
        <BankingForm onSubmit={updateBank} initialValues={payout}/>
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateBank: updateBankInitAction,
  },
)(Banking);
