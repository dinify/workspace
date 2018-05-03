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
      <Field name="bank_name" component={Text} componentProps={{floatingLabelText: "Bank Name"}} />
      <Field name="beneficiary_name" component={Text} componentProps={{floatingLabelText: "Beneficiary Name"}} />
      <Field name="iban" component={Text} componentProps={{floatingLabelText: "IBAN Number"}} />
      <Field name="bic" component={Text} componentProps={{floatingLabelText: "BIC Number"}} />
      <FlatButton type="submit" label="Save" fullWidth={true} />
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
