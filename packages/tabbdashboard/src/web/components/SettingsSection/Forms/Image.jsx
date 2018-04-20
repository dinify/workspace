// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import Dropzone from 'react-dropzone'
import moment from 'moment'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../../styled/FormBox'
import {
  uploadMainImageInitAction
} from '../../../../ducks/restaurant'

const Image = ({
  uploadMainImage,
  loggedRestaurant
}) => {
  if (!loggedRestaurant) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>Main Image</FormBoxHead>
      <FormBoxBody>
        <Dropzone
          accept="image/jpg, image/jpeg, image/png"
          onDrop={(accepted, rejected) => {
            if (accepted && accepted.length > 0) uploadMainImage({ file: accepted[0] })
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

        <img
          src={`https://s3.eu-central-1.amazonaws.com/tabb/tabb-restaurant-image/RESTAURANT_${loggedRestaurant.id}?datetime=${Date.now()}`}
          width="250"
        />
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    uploadMainImage: uploadMainImageInitAction,
  },
)(Image);