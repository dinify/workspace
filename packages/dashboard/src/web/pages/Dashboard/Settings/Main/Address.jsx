// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
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
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="country"
        component={Text}
        componentProps={{ label: 'Country', fullWidth: true, margin: 'normal' }}
      />
      <Field
        name="locality"
        component={Text}
        componentProps={{
          label: 'Locality',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="postal_code"
        component={Text}
        componentProps={{
          label: 'Postal Code',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="region"
        component={Text}
        componentProps={{ label: 'Region', fullWidth: true, margin: 'normal' }}
      />
      <Field
        name="street"
        component={Text}
        componentProps={{ label: 'Street', fullWidth: true, margin: 'normal' }}
      />
      <Button type="submit" fullWidth={true}>
        SAVE
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
  return (
    <FormBox>
      <FormBoxHead>
        <span>Business Address</span>
        <Progress type={'UPDATE_ADDRESS'} />
      </FormBoxHead>
      <FormBoxBody material>
        <AddressForm onSubmit={updateAddress} initialValues={address} />
      </FormBoxBody>
    </FormBox>
  );
};

export default connect(state => ({}), {
  updateAddress: updateAddressInitAction,
})(Address);
