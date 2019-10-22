import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Text from 'web/components/MaterialInputs/Text';
import Button from '@material-ui/core/Button';

const AddressForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="street"
        component={Text}
        componentProps={{
          label: t('address.street'),
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="locality"
        component={Text}
        componentProps={{
          label: t('address.city'),
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="postal_code"
        component={Text}
        componentProps={{
          label: t('address.postalCode'),
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Button type="submit" fullWidth variant="outlined">
        {t('save')}
      </Button>
    </form>
  );
};

export default reduxForm({
  form: 'settings/address',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(AddressForm);
