// @flow
import React from 'react'
import { connect } from 'react-redux'
import SwitchButton from 'react-switch-button'
import 'react-switch-button/dist/react-switch-button.css'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from '../../styled/FormBox'
import {
  updateCategoryInitAction
} from 'ducks/restaurantLegacy'
import Progress from '../../Progress'

const Type = ({
  updateCategory,
  type
}) => {
  if (!type) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>
        <span>Type of Restaurant</span>
        <Progress type={'UPDATE_CATEGORY'}/>
      </FormBoxHead>
      <FormBoxBody center pt={20} pb={20}>
        <SwitchButton
          name="switch-type"
          label="Full-service"
          labelRight="Self-service"
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
