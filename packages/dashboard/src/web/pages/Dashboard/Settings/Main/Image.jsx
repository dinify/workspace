import React from 'react';
import values from 'ramda/es/values';
import sort from 'ramda/es/sort';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import { uploadMainImageAsync } from 'features/restaurant/actions';
import Progress from 'web/components/Progress';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import CircularProgress from '@material-ui/core/CircularProgress';

const Image = ({ uploadMainImage, restaurant, uploading }) => {
  if (!restaurant) return <div />;
  const { t } = useTranslation();
  let imageUrl = '/static/placeholder.png';
  const images = values(restaurant.images);
  if (images.length > 0) {
    const sortedImages = sort((a, b) => a.precedence - b.precedence)(images);
    imageUrl = sortedImages[0].url;
  }
  if (restaurant.uploadedImage) imageUrl = restaurant.uploadedImage;
  return (
    <FormBox>
      <FormBoxHead>
        <span>{t('restaurantImage')}</span>
        <Progress type={'UPDATE_IMAGE'} />
      </FormBoxHead>
      <FormBoxBody>
        <Dropzone
          accept="image/jpg, image/jpeg, image/png"
          onDrop={(accepted) => {
            if (accepted && accepted.length > 0)
              uploadMainImage({ file: accepted[0] });
          }}
          style={{
            width: '250px',
            padding: '10px',
            fontSize: '11px',
            border: '1px dashed #ccc',
            margin: '10px 0',
            position: 'relative'
          }}
        >
          <p>
            {t('uploadImageGuide')}
          </p>
          <p>{t('uploadImageFormats')}</p>
          {uploading && <CircularProgress style={{
            color: 'white',
            position: 'absolute',
            left: '100px',
            bottom: '80px'
          }}/>}
          <img src={imageUrl} style={{width: 230, borderRadius: '2px', marginTop: 10 }} alt="" />
        </Dropzone>
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(state => ({
  uploading: state.restaurant.uploading
}), {
  uploadMainImage: uploadMainImageAsync.request,
})(Image);
