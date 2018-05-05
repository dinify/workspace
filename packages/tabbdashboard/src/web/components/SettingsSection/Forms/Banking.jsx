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
  updateBankInitAction
} from '../../../../ducks/restaurant'
import Progress from '../../Progress'
import Text from '../../MaterialInputs/Text'
import Button from 'material-ui/Button';

let BankingForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="bank_name" component={Text} componentProps={{label: "Bank Name", fullWidth: true, margin: 'normal'}} />
      <Field name="beneficiary_name" component={Text} componentProps={{label: "Beneficiary Name", fullWidth: true, margin: 'normal'}} />
      <Field name="iban" component={Text} componentProps={{label: "IBAN Number", fullWidth: true, margin: 'normal'}} />
      <Field name="bic" component={Text} componentProps={{label: "BIC Number", fullWidth: true, margin: 'normal'}} />
      <Button type="submit" fullWidth={true}>SAVE</Button>
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
