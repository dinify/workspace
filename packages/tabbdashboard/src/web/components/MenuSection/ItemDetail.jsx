// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as FN from '../../../lib/FN'
import Dropzone from 'react-dropzone'
import {
  FormBox,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../styled/FormBox'
import {
  updateFoodInitAction,
  uploadItemImageInitAction
} from '../../../ducks/restaurant'
import { Form, Text, Textarea } from 'react-form'
import Progress from '../Progress'

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
  updateFood,
  uploadItemImage
}) => {
  return (
    <div>
      {selectedFood ? <FormBox style={{width: '230px'}}>
        {selectedFood.images ? FN.Identity(FN.MapToList(selectedFood.images).sort((a,b) => a.precedence - b.precedence), (images) =>
          images.length > 0 ? <FoodImage imageURL={images[0].url} /> : ''
        ): ''}
        <Dropzone
          accept="image/jpg, image/jpeg, image/png"
          onDrop={(accepted, rejected) => {
            if (accepted && accepted.length > 0) uploadItemImage({ file: accepted[0], id: selectedFoodId })
          }}
          style={{
            width: '250px',
            padding: '10px',
            fontSize: '11px',
            border: '1px dashed #ccc',
            margin: '10px 0'
          }}
        >
          <p>Try dropping your photo here, or click to select file to upload.</p>
          <p>Only *.jpg and *.png image will be accepted</p>
        </Dropzone>
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
                  <Label>
                    <span>Name</span>
                    <Progress type={'UPDATE_FOOD'}/>
                  </Label>
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
    updateFood: updateFoodInitAction,
    uploadItemImage: uploadItemImageInitAction,
  }
)(ItemDetail);
