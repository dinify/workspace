// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import * as FN from 'lib/FN'
import Grid from 'material-ui/Grid'
import { Field, reduxForm } from 'redux-form'

import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'

import AddCircle from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'

import InputAndButton from 'web/components/MaterialInputs/InputAndButton'


import {
  createIngredientInit,
  removeIngredientInit
} from 'ducks/ingredient/actions'

let AddIngredientForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} style={{width: '100%'}}>
      <Field name="name" component={InputAndButton} buttonIcon={<AddCircle />} componentProps={{
        placeholder: "Enter ingredient",
        fullWidth: true
      }} />
    </form>
  )
}
AddIngredientForm = reduxForm({
  form: 'customizations/ingredient'
})(AddIngredientForm)


const Ingredients = ({
  createIngredient,
  ingredients,
  removeIngredient
}) => {
  const ingredientsList = FN.MapToList(ingredients).sort((a,b) => a.name.localeCompare(b.name))
  return (
    <div>
      <List
        component="nav"
      >
        {ingredientsList.map((ingredient, i) =>
          <div key={ingredient.id}>
            <ListItem dense>
              <ListItemText primary={ingredient.name} />
              <Tooltip placement="left" title="Delete">
                <IconButton
                  aria-label="Delete ingredient"
                  onClick={() => removeIngredient({ id: ingredient.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          </div>
        )}
        <ListItem>
          <AddIngredientForm onSubmit={createIngredient} />
        </ListItem>
      </List>


    </div>
  );
}

export default connect(
  state => ({
    ingredients: state.ingredient.all,
  }), {
    createIngredient: createIngredientInit,
    removeIngredient: removeIngredientInit
  },
)(Ingredients);
