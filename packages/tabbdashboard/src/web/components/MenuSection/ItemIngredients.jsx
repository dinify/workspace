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
import { Form, Text } from 'react-form'

const ItemIngredients = ({
  selectedFood,
  selectedFoodId,
  rmFoodIngredient,
  addFoodIngredient
}) => {
  return (
    <div>
      <Label>Ingredients</Label>
      {selectedFood.ingredients ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.ingredients)}
          rmButtonFunction={(ingredient) => rmFoodIngredient({foodId: selectedFoodId, ingredientName: ingredient.name})}
        />
      : 'No ingredients'}
      <Form
        onSubmit={({ ingredientName }) => {
          addFoodIngredient({ foodId: selectedFoodId, ingredientName })
        }}
        validate={({ ingredientName }) => {
          return {
            ingredientName: !ingredientName ? 'Name is required' : undefined
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='ingredientName' placeholder='Name of new ingredient' />
              <FormBoxSubmit primary>ADD INGREDIENT</FormBoxSubmit>
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
)(ItemIngredients);
