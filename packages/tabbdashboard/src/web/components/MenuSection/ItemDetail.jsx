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
import Progress from '../Progress'
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button'
import Text from '../MaterialInputs/Text'

const FoodImage = styled.div `
  width: 100%;
  height: 200px;
  background-image: url(${(p) => p.imageURL});
  background-size: cover;
  background-position: center;
`

let DetailForm = ({
  handleSubmit
}) => {
  const style = {height: '64px'}
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" component={Text} componentProps={{
        label: "Name",
        fullWidth: true,
      }} />
      <Field name="description" component={Text} componentProps={{
        label: "Description",
        multiLine: true,
        fullWidth: true,
        rows: 2
      }} />
      <Field name="price" component={Text} componentProps={{
        type: 'number',
        min: 0.000,
        label: 'Price (KD)',
        fullWidth: true,
        step: 0.1,
        style
      }} />
      <Button type="submit" label="Save" fullWidth={true} />
    </form>
  )
}
DetailForm = reduxForm({
  form: 'menu/detail',
  enableReinitialize: true
})(DetailForm)

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
        <FormBoxBody>
          <Dropzone
            accept="image/jpg, image/jpeg, image/png"
            onDrop={(accepted, rejected) => {
              if (accepted && accepted.length > 0) uploadItemImage({ file: accepted[0], id: selectedFoodId })
            }}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '11px',
              border: '1px dashed #ccc',
              margin: '10px 0'
            }}
          >
            <p>Try dropping your photo here, or click to select file to upload.</p>
            <p>Only *.jpg and *.png image will be accepted</p>
          </Dropzone>



          <Progress type={'UPDATE_FOOD'}/>
          <DetailForm
            onSubmit={(fields) => {
              fields.foodId = selectedFoodId
              console.log(fields);
              updateFood({...fields, price: {
                  amount: Number.parseFloat(fields.price).toFixed(3),
                  currency: "KWD"
              }})
            }}
            initialValues={{
              name: selectedFood.name,
              description: selectedFood.description || '',
              price: Number.parseFloat(selectedFood.price.amount).toFixed(3)
            }}
          />
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
