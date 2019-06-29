import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import { updateAddressInitAction } from 'ducks/restaurant/actions';
import Progress from 'web/components/Progress';
import Text from 'web/components/MaterialInputs/Text';
import Button from '@material-ui/core/Button';

let AddressForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="street"
        component={Text}
        componentProps={{ label: t('address.street'), fullWidth: true, margin: 'normal' }}
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
      <Button type="submit" fullWidth>
        {t('save')}
      </Button>
    </form>
  );
};
AddressForm = reduxForm({
  form: 'settings/address',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AddressForm);

const Address = ({ updateAddress, address }) => {
  if (!address) return <div />;
  const { t } = useTranslation();
  return (
    <FormBox>
      <FormBoxHead>
        <span>{t('address.businessAddress')}</span>
        <Progress type="UPDATE_ADDRESS" />
      </FormBoxHead>
      <FormBoxBody material>
        <AddressForm onSubmit={(fields) => updateAddress({
          street: fields.street,
          locality: fields.locality, // city
          postal_code: fields.postal_code,
          country: 'Czechia',
          region: 'Prague'
        })} initialValues={address} />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(state => ({}), {
  updateAddress: updateAddressInitAction,
})(Address);
