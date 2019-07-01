import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { updateFoodNutritionInit } from 'ducks/restaurant/actions';
import Progress from 'web/components/Progress';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';

let NutritionForm = ({ handleSubmit, t }) => {
  const style = { height: '56px' };
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="total"
        component={Text}
        componentProps={{
          type: 'number',
          min: 1,
          label: t('nutrition.calories'),
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
          label: t('nutrition.proteins'),
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
          label: t('nutrition.fats'),
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
          label: t('nutrition.carbs'),
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          style,
        }}
      />
      <Button type="submit" fullWidth={true}>
        {t('save')}
        <Progress type={'UPDATE_NUTRITION'} />
      </Button>
    </form>
  );
};
NutritionForm = reduxForm({
  form: 'menu/nutritions',
  enableReinitialize: true,
  destroyOnUnmount: true
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
  );
  background: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.79) 100%
  ); 
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.79) 100%
  );
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
  const { t } = useTranslation();
  return (
    <NutritionContainer>
      <NutritionForm
        onSubmit={nutritions =>
          updateFoodNutrition({ foodId: selectedFoodId, ...nutritions })
        }
        initialValues={selectedFood.calories}
        t={t}
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
