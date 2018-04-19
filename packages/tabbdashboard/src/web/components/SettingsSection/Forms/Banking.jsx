// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
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

const Banking = ({
  updateBank,
  payout
}) => {
  if (!payout) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>Banking Information</FormBoxHead>
      <FormBoxBody>
        <Form
          onSubmit={(bank) => {
            console.log('Success!', bank);
            updateBank(bank);
          }}
          defaultValues={payout}
          validate={({ bank_name, beneficiary_name, iban }) => {
            return {
              bank_name: !bank_name ? 'Bank name is required' : undefined,
              beneficiary_name: !beneficiary_name ? 'Beneficiary Name is required' : undefined,
              iban: !iban ? 'IBAN is required' : undefined,
            }
          }}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <Text field='bank_name' placeholder='Bank name' />
                <Text field='beneficiary_name' placeholder='Beneficiary name' />
                <Text field='iban' placeholder='IBAN number' />
                <FormBoxSubmit>SAVE</FormBoxSubmit>
              </form>
            )
          }}
        </Form>
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateBank: updateBankInitAction,
  },
)(Banking);
