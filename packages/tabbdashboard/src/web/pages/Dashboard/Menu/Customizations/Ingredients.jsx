// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as FN from 'lib/FN'
import { Field, reduxForm } from 'redux-form'
import List, { ListItem, ListItemText } from 'material-ui/List'

import AddCircle from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import Switch from 'material-ui/Switch';

import InputAndButton from 'web/components/MaterialInputs/InputAndButton'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

import {
  createIngredientInit,
  removeIngredientInit,
  updateIngredientInit
} from 'ducks/ingredient/actions'

let AddIngredientForm = ({
  handleSubmit,
  progress,
  errorMessage
}) => {
  console.log(errorMessage);
  return (
    <form onSubmit={handleSubmit} style={{width: '100%'}}>
      <FormControl error={progress === 'ERROR'} aria-describedby="name-error-text">
        <Field name="name" component={InputAndButton} buttonIcon={<AddCircle />} componentProps={{
          placeholder: "Enter ingredient",
          fullWidth: true
        }} />
        {progress === 'ERROR' ?
          <FormHelperText>{errorMessage}</FormHelperText>
        : ''}
      </FormControl>
    </form>
  )
}
AddIngredientForm = reduxForm({
  form: 'customizations/ingredient'
})(AddIngredientForm)


const Ingredients = ({
  createIngredient,
  ingredients,
  removeIngredient,
  updateIngredient,
  styles,
  progressMap,
  errorsMap
}) => {
  const ingredientsList = FN.MapToList(ingredients).sort((a,b) => a.name.localeCompare(b.name))
  return (
    <div>
      <List
        component="nav"
      >
        {ingredientsList.map((ingredient, i) =>
          <div key={ingredient.id}>
            <ListItem dense style={styles.ListItem}>
              <ListItemText primary={ingredient.name} />
              <Tooltip placement="left" title={ingredient.excludable ? 'Excludable' : 'Mandatory'}>
                <Switch
                  checked={ingredient.excludable}
                  onChange={(ev) => updateIngredient({id: ingredient.id, excludable: ev.target.checked})}
                  color="primary"
                />
              </Tooltip>
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
          <AddIngredientForm
            onSubmit={createIngredient}
            progress={progressMap['CREATE_INGREDIENT']}
            errorMessage={errorsMap['CREATE_INGREDIENT']}
          />
        </ListItem>
      </List>


    </div>
  );
}

export default connect(
  state => ({
    ingredients: state.ingredient.all,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap
  }), {
    createIngredient: createIngredientInit,
    removeIngredient: removeIngredientInit,
    updateIngredient: updateIngredientInit
  },
)(Ingredients);
