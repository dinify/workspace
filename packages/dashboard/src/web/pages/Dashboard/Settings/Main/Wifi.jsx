import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import { updateWifiInitAction } from 'ducks/restaurant/actions';
import Progress from 'web/components/Progress';
import Button from '@material-ui/core/Button';
import Text from 'web/components/MaterialInputs/Text';
import { selectedRestaurantWifi } from 'ducks/restaurant/selectors';

const formName = 'settings/wifi';

let WifiForm = ({ handleSubmit, t }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="ssid"
        component={Text}
        componentProps={{
          label: 'Wifi name',
          fullWidth: true,
          margin: 'normal',
        }}
      />
      <Field
        name="password"
        component={Text}
        componentProps={{
          label: 'Password',
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
WifiForm = reduxForm({
  form: formName,
  enableReinitialize: true,
  destroyOnUnmount: false
})(WifiForm);

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);


const Wifi = ({ updateWifi, wifi, ssid, password }) => {
  const { t } = useTranslation();
  const initialValues = { ssid: '', password: '' };
  if (wifi) {
    if (wifi.ssid) initialValues.ssid = wifi.ssid;
    if (wifi.password) initialValues.password = wifi.password;
  }

  const onSubmit = (obj) => {
    updateWifi(obj);
  }

  return (
    <FormBox>
      <FormBoxHead>
        <span>{t('wifiCredentials')}</span>
        <Progress type='UPDATE_WIFI' />
      </FormBoxHead>
      <FormBoxBody material>
        <WifiForm onSubmit={onSubmit} initialValues={initialValues} t={t} />
        <div style={{ padding: 16, textAlign: 'center' }}>
          <Link
            component={AdapterLink}
            target="_blank"
            to={`/qr/WIFI:S:${ssid};T:WPA2;P:${password};;`}
          >
            Print QR
          </Link>
        </div>
      </FormBoxBody>
    </FormBox>
  );
};

const selector = formValueSelector(formName);

export default connect((state) => ({
  wifi: selectedRestaurantWifi(state),
  ssid: selector(state, 'ssid'),
  password: selector(state, 'password')
}), {
  updateWifi: updateWifiInitAction,
})(Wifi);
