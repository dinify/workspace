// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { updateFoodNutritionInit } from 'ducks/restaurantLegacy';
import Progress from 'web/components/Progress';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';

let NutritionForm = ({ handleSubmit }) => {
  const style = { height: '56px' };
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="total"
        component={Text}
        componentProps={{
          type: 'number',
          min: 1,
          label: 'Calories (Kcal)',
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          style,
        }}
      />
      <Field
        name="proteins"
        component={Text}
        componentProps={{
          type: 'number',
          min: 1,
          label: 'Proteins (g)',
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          style,
        }}
      />
      <Field
        name="fats"
        component={Text}
        componentProps={{
          type: 'number',
          min: 1,
          label: 'Fats (g)',
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          style,
        }}
      />
      <Field
        name="carbs"
        component={Text}
        componentProps={{
          type: 'number',
          min: 1,
          label: 'Carbohydrates (g)',
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          style,
        }}
      />
      <Button type="submit" fullWidth={true}>
        Save
        <Progress type={'UPDATE_NUTRITION'} />
      </Button>
    </form>
  );
};
NutritionForm = reduxForm({
  form: 'menu/nutritions',
  enableReinitialize: true,
})(NutritionForm);

const NutritionContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 270px;
  padding-left: 150px;
  padding-top: 5px;
  overflow: hidden;
  background: -moz-linear-gradient(
    left,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.79) 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.79) 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.79) 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  label,
  input,
  button {
    text-align: right;
  }
  label {
    white-space: nowrap;
  }
`;

const ItemNutrition = ({ selectedFoodId, menuItems, updateFoodNutrition }) => {
  const selectedFood = menuItems[selectedFoodId];
  return (
    <NutritionContainer>
      <NutritionForm
        onSubmit={nutritions =>
          updateFoodNutrition({ foodId: selectedFoodId, ...nutritions })
        }
        initialValues={selectedFood.calories}
      />
    </NutritionContainer>
  );
};

export default connect(
  state => ({
    menuItems: state.menuItem.all,
  }),
  {
    updateFoodNutrition: updateFoodNutritionInit,
  },
)(ItemNutrition);
