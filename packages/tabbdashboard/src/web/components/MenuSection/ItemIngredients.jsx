// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as FN from '../../../lib/FN'
import { Label} from '../styled/FormBox'
import {
  assignIngredientInit,
  unassignIngredientInit
} from '../../../ducks/restaurant'
import ListOfCustomizations from './ListOfCustomizations'
import AutoComplete from '../MaterialInputs/AutoComplete'


const ItemIngredients = ({
  selectedFoodId,
  assignIngredient,
  unassignIngredient,
  ingredientsMap,
  menuItems
}) => {
  const ingredientsList = FN.MapToList(ingredientsMap)
  const dataSource = ingredientsList.map((o) => ({value: o.id, label: o.name}))
  const selectedFood = menuItems[selectedFoodId]
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
        dataSource={dataSource}
      />
    </div>
  );
}

export default connect(
  state => ({
    ingredientsMap: state.restaurant.loggedRestaurant.ingredients,
    menuItems: state.menuItem.all
  }), {
    assignIngredient: assignIngredientInit,
    unassignIngredient: unassignIngredientInit,
  }
)(ItemIngredients);
