import last from 'ramda/src/last';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import { updateSocialInitAction } from 'ducks/restaurant/actions';
import Progress from 'web/components/Progress';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';

const renderSocialField = (props) => {
  const { input } = props;
  let subdomain = <span style={{color: '#888'}}> </span>;
  const value = input.value;
  if (value !== '') subdomain = value;
  return (
    <div>
      <Text {...props} />
      <div>{input.name}.com/{subdomain}</div>
    </div>
  )
}

let SocialForm = ({ handleSubmit, t }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="facebook"
        component={renderSocialField}
        componentProps={{
          label: 'Facebook URL',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="instagram"
        component={renderSocialField}
        componentProps={{
          label: 'Instagram URL',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Button type="submit" variant="outlined" fullWidth style={{marginTop: 20}}>
        {t('save')}
      </Button>
    </form>
  );
};
SocialForm = reduxForm({
  form: 'settings/social',
  enableReinitialize: true,
  destroyOnUnmount: false
})(SocialForm);


const Social = ({ updateSocial, social }) => {
  const { t } = useTranslation();
  const initialValues = {facebook: '', instagram: ''};
  if (social) {
    if (social.facebook) initialValues.facebook = last(social.facebook.split('/'));
    if (social.instagram) initialValues.instagram = last(social.instagram.split('/'));
  }
  const onSubmit = ({facebook, instagram}) => {
    if (facebook) facebook = `https://www.facebook.com/${facebook}`;
    if (instagram) instagram = `https://www.instagram.com/${instagram}`;
    const obj = {};
    if (facebook.length > 0) obj.facebook = facebook;
    if (instagram.length > 0) obj.instagram = instagram;
    updateSocial(obj);
  }
  return (
    <FormBox>
      <FormBoxHead>
        <span>{t('socialMedia')}</span>
        <Progress type={'UPDATE_SOCIAL'} />
      </FormBoxHead>
      <FormBoxBody material>
        <SocialForm onSubmit={onSubmit} initialValues={initialValues} t={t} />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(state => ({}), {
  updateSocial: updateSocialInitAction,
})(Social);
