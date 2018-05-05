// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  FormBoxSubmit,
  Label
} from '../styled/FormBox'
import {
  updateFoodNutritionInit
} from '../../../ducks/restaurant'
import Progress from '../Progress'
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button'
import Text from '../MaterialInputs/Text'

let NutritionForm = ({
  handleSubmit
}) => {
  const style = {height: '64px'}
  return (
    <form onSubmit={handleSubmit}>
      <Field name="total" component={Text} componentProps={{
        type: 'number',
        min: 1,
        label: 'Total Calories (kJ)',
        fullWidth: true,
        style
      }} />
      <Field name="proteins" component={Text} componentProps={{
        type: 'number',
        min: 1,
        label: 'Proteins (g)',
        fullWidth: true,
        style
      }} />
      <Field name="fats" component={Text} componentProps={{
        type: 'number',
        min: 1,
        label: 'Fats (g)',
        fullWidth: true,
        style
      }} />
      <Field name="carbs" component={Text} componentProps={{
        type: 'number',
        min: 1,
        label: 'Carbohydrates (g)',
        fullWidth: true,
        style
      }} />
      <Button type="submit" label="Save" fullWidth={true} />
    </form>
  )
}
NutritionForm = reduxForm({
  form: 'menu/nutritions',
  enableReinitialize: true
})(NutritionForm)

const ItemNutrition = ({
  selectedFood,
  selectedFoodId,
  updateFoodNutrition
}) => {
  return (
    <div>
      <Progress type={'UPDATE_NUTRITION'}/>
      <NutritionForm
        onSubmit={(nutritions) => updateFoodNutrition({ foodId: selectedFoodId, ...nutritions })}
        initialValues={selectedFood.calories}
      />
    </div>
  );
}

export default connect(
  state => ({}), {
    updateFoodNutrition: updateFoodNutritionInit
  }
)(ItemNutrition);
