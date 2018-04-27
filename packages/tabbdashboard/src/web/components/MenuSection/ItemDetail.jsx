// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as FN from '../../../lib/FN'
import {
  FormBox,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../styled/FormBox'
import {
  updateFoodInitAction
} from '../../../ducks/restaurant'
import { Form, Text, Textarea } from 'react-form'

const FoodImage = styled.div `
  width: 100%;
  height: 200px;
  background-image: url(${(p) => p.imageURL});
  background-size: cover;
  background-position: center;
`

const ItemDetail = ({
  selectedFood,
  selectedFoodId,
  updateFood
}) => {
  return (
    <div>
      {selectedFood ? <FormBox style={{width: '230px'}}>
        {selectedFood.images ? FN.Identity(FN.MapToList(selectedFood.images), (images) =>
          images.length > 0 ? <FoodImage imageURL={images[0].url} /> : ''
        ): ''}
        <FormBoxBody>
          <Form
            onSubmit={(fields) => {
              fields.foodId = selectedFoodId
              console.log(fields);
              updateFood(fields)
            }}
            defaultValues={{
              name: selectedFood.name,
              description: selectedFood.description || '',
              price: selectedFood.price.amount,
            }}
            validate={({ name, description, price }) => {
              return {
                name: !name ? 'Name is required' : undefined,
                description: !description ? 'Description is required' : undefined,
                price: !price ? 'Price is required' : undefined,
              }
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <Label>Name</Label>
                  <Text field='name' placeholder='Name of food' />
                  <Label>Description</Label>
                  <Textarea style={{height: '100px'}} field='description' placeholder='Description' />
                  <Label>Price</Label>
                  <Text type="number" field='price' placeholder='Price' />
                  <FormBoxSubmit primary>SAVE</FormBoxSubmit>
                </form>
              )
            }}
          </Form>
        </FormBoxBody>
      </FormBox> : ''}
    </div>
  );
}

export default connect(
  state => ({}), {
    updateFood: updateFoodInitAction
  }
)(ItemDetail);
