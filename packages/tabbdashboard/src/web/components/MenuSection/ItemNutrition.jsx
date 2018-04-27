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
import { Form, Text } from 'react-form'

const TableTag = styled.table `
  width: 100%;
  border-spacing: 0;
`;
const Td = styled.td `
  color: ${props => props.color};
  font-weight: 300;
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #666;
  &:first-child {
    text-align: left;
  }
`;

const ItemNutrition = ({
  selectedFood,
  selectedFoodId,
  updateFoodNutrition
}) => {
  return (
    <div>
      <Label>Nutrition</Label>
      <Progress type={'UPDATE_NUTRITION'}/>
      <Form
        onSubmit={(nutrition) => {
          updateFoodNutrition({ foodId: selectedFoodId, ...nutrition })
        }}
        defaultValues={selectedFood.calories}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <TableTag>
                <tbody>
                  <tr>
                    <Td>Total Calories</Td>
                    <Td><Text field='total' placeholder='' /></Td>
                  </tr>
                  <tr>
                    <Td>Protein</Td>
                    <Td><Text field='proteins' placeholder='' /></Td>
                  </tr>
                  <tr>
                    <Td>Total Fat</Td>
                    <Td><Text field='fats' placeholder='' /></Td>
                  </tr>
                  <tr>
                    <Td>Total Carb</Td>
                    <Td><Text field='carbs' placeholder='' /></Td>
                  </tr>
                </tbody>
              </TableTag>
              <FormBoxSubmit primary>UPDATE NUTRITION</FormBoxSubmit>
            </form>
          )
        }}
      </Form>
    </div>
  );
}

export default connect(
  state => ({}), {
    updateFoodNutrition: updateFoodNutritionInit
  }
)(ItemNutrition);
