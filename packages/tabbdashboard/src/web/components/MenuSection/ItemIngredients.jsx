// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as FN from '../../../lib/FN'
import {
  FormBoxSubmit,
  Label
} from '../styled/FormBox'
import {
  assignIngredientInit,
  rmFoodIngredientInit
} from '../../../ducks/restaurant'
import ListOfCustomizations from './ListOfCustomizations'
import FlatButton from 'material-ui/FlatButton'
import AutoComplete from 'material-ui/AutoComplete'

let IngredientsForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FlatButton type="submit" label="Save" fullWidth={true} />
    </form>
  )
}
IngredientsForm = reduxForm({
  form: 'menuitem/ingredients'
})(IngredientsForm)

const ItemIngredients = ({
  selectedFood,
  selectedFoodId,
  assignIngredient,
  unassignIngredient,
  ingredients
}) => {
  const dataSource = FN.MapToList(ingredients).map((o) => ({value: o.id, text: o.name}))
  return (
    <div>
      <Label>Ingredients</Label>
      {selectedFood.ingredients ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.ingredients)}
          rmButtonFunction={(ingredient) => unassignIngredient({foodId: selectedFoodId, ingredientName: ingredient.name})}
        />
      : 'No ingredients'}
      <AutoComplete
        hintText="e.g. Tomato"
        dataSource={dataSource}
        onUpdateInput={() => {}}
        floatingLabelText="Assign ingredient"
        fullWidth={true}
        onNewRequest={(selected) => console.log(selected)}
      />
    </div>
  );
}

export default connect(
  state => ({}), {
    assignIngredient: assignIngredientInit,
    unassignIngredient: rmFoodIngredientInit,
  }
)(ItemIngredients);
