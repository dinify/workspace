// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as FN from '../../../lib/FN'
import {
  FormBoxSubmit,
  Label
} from '../styled/FormBox'
import {
  rmFoodIngredientInit,
  addFoodIngredientInit
} from '../../../ducks/restaurant'
import ListOfCustomizations from './ListOfCustomizations'
import { Form, Select } from 'react-form'

const ItemAddons = ({
  addons,
  selectedFood,
  selectedFoodId,
  rmFoodAddon,
  addFoodAddon
}) => {
  const addonsForSelect = addons.map((addon) => {
    return {
      label: addon.name,
      value: addon.id
    }
  })
  return (
    <div>
      <Label>Addons</Label>
      {selectedFood.addons ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.addons)}
          rmButtonFunction={(addon) => rmFoodAddon({foodId: selectedFoodId, addonId: addon.id})}
        />
      : 'No addon'}
      <Form
        onSubmit={({ addonId }) => {
          addFoodAddon({ foodId: selectedFoodId, addonId })
        }}
        validate={({ addonId }) => {
          return {
            addonId: !addonId ? 'Please select addon' : undefined
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Select
                field='addonId'
                options={addonsForSelect}
              />
              <FormBoxSubmit primary>ADD</FormBoxSubmit>
            </form>
          )
        }}
      </Form>
    </div>
  );
}

export default connect(
  state => ({}), {
    rmFoodIngredient: rmFoodIngredientInit,
    addFoodIngredient: addFoodIngredientInit
  }
)(ItemAddons);
