// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as FN from '../../../lib/FN'
import {
  FormBoxSubmit,
  Label
} from '../styled/FormBox'
import {
  rmFoodOptionInit,
  addFoodOptionInit
} from '../../../ducks/restaurant'
import ListOfCustomizations from './ListOfCustomizations'
import { Form, Text } from 'react-form'

const ItemOptions = ({
  selectedFood,
  selectedFoodId,
  rmFoodOption,
  addFoodOption
}) => {
  return (
    <div>
      <Label>Options</Label>
      {selectedFood.options ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.options)}
          rmButtonFunction={(option) => rmFoodOption({foodId: selectedFoodId, optionName: option.name})}
        />
      : 'No options'}
      <Form
        onSubmit={({ optionName }) => {
          addFoodOption({ foodId: selectedFoodId, optionName })
        }}
        validate={({ optionName }) => {
          return {
            optionName: !optionName ? 'Name is required' : undefined
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='optionName' placeholder='Name of new option' />
              <FormBoxSubmit primary>ADD OPTION</FormBoxSubmit>
            </form>
          )
        }}
      </Form>
    </div>
  );
}

export default connect(
  state => ({}), {
    rmFoodOption: rmFoodOptionInit,
    addFoodOption: addFoodOptionInit
  }
)(ItemOptions);
