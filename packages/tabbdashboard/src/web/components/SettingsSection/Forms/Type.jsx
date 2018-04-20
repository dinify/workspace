// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import SwitchButton from 'react-switch-button'
import 'react-switch-button/dist/react-switch-button.css'
import moment from 'moment'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../../styled/FormBox'
import {
  updateCategoryInitAction
} from '../../../../ducks/restaurant'

const Type = ({
  updateCategory,
  type
}) => {
  if (!type) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>Type of Restaurant</FormBoxHead>
      <FormBoxBody center pt={20} pb={20}>
        <SwitchButton
          name="switch-type"
          label="Classic"
          labelRight="QLess"
          type="switch"
          defaultChecked={type === 'QLESS'}
          onChange={() => {
            if(type === 'CLASSIC') {
              updateCategory({ category: 'QLESS'})
            } else {
              updateCategory({ category: 'CLASSIC'})
            }
          }}
        />
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateCategory: updateCategoryInitAction,
  },
)(Type);
