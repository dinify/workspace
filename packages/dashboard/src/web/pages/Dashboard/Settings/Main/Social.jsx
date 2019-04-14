// @flow
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

let SocialForm = ({ handleSubmit, t }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="facebook"
        component={Text}
        componentProps={{
          label: 'Facebook URL',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="instagram"
        component={Text}
        componentProps={{
          label: 'Instagram URL',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Button type="submit" fullWidth={true}>
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
  return (
    <FormBox>
      <FormBoxHead>
        <span>{t('socialMedia')}</span>
        <Progress type={'UPDATE_SOCIAL'} />
      </FormBoxHead>
      <FormBoxBody material>
        <SocialForm onSubmit={updateSocial} initialValues={social} t={t} />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(state => ({}), {
  updateSocial: updateSocialInitAction,
})(Social);
