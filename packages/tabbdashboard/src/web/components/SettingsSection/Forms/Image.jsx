// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from '../../styled/FormBox'
import {
  uploadMainImageInitAction
} from 'ducks/restaurantLegacy'
import Progress from '../../Progress'

const Image = ({
  uploadMainImage,
  loggedRestaurant
}) => {
  if (!loggedRestaurant) return (<div />)
  let imageUrl = ''
  const images = R.values(loggedRestaurant.images)
  if (images.length > 0) {
    const sortedImages = R.sort((a,b) => a.precedence - b.precedence)(images)
    imageUrl = sortedImages[0].url
  }
  if (loggedRestaurant.uploadedImage) imageUrl = loggedRestaurant.uploadedImage
  return (
    <FormBox>
      <FormBoxHead>
        <span>Main Image</span>
        <Progress type={'UPDATE_IMAGE'}/>
      </FormBoxHead>
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
          src={imageUrl}
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
