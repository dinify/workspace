// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import R from 'ramda'
import * as FN from '../../../lib/FN'
import { Label} from '../styled/FormBox'
import {
  assignIngredientInit,
  unassignIngredientInit
} from '../../../ducks/restaurant'
import ListOfCustomizations from './ListOfCustomizations'
import AutoComplete from 'material-ui/AutoComplete'


const ItemIngredients = ({
  selectedFood,
  selectedFoodId,
  assignIngredient,
  unassignIngredient,
  ingredientsMap
}) => {
  const ingredientsList = FN.MapToList(ingredientsMap)
  const dataSource = ingredientsList.map((o) => ({value: o.id, text: o.name}))
  return (
    <div>
      <Label>Ingredients</Label>
      {selectedFood.ingredients ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.ingredients)}
          rmButtonFunction={(ingredient) => unassignIngredient({
            foodId: selectedFoodId,
            ingredientId: ingredient.id,
            originalObject: {ingredients: selectedFood.ingredients}
          })}
        />
      : 'No ingredients'}
      <AutoComplete
        hintText="e.g. Tomato"
        dataSource={dataSource}
        onUpdateInput={() => {}}
        floatingLabelText="Assign ingredient"
        fullWidth={true}
        filter={(searchText, key) => {
           return key.toLowerCase().startsWith(searchText.toLowerCase())
        }}
        onNewRequest={(selected) => assignIngredient({
          foodId: selectedFoodId,
          ingredientId: selected.value,
          ingredient: R.find(R.propEq('id', selected.value))(ingredientsList),
          originalObject: {ingredients: selectedFood.ingredients}
        })}
      />
    </div>
  );
}

export default connect(
  state => ({}), {
    assignIngredient: assignIngredientInit,
    unassignIngredient: unassignIngredientInit,
  }
)(ItemIngredients);
