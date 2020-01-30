import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import QRCode from 'qrcode.react';
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
} from 'web/components/styled/FormBox';
import Progress from 'web/components/Progress';
import { selectedRestaurant } from 'features/restaurant/selectors';


const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);


const Wifi = ({ restaurant }) => {
  // const { t } = useTranslation();

  return (
    <FormBox>
      <FormBoxHead>
        <span>Menu QR Code</span>
        <Progress type='UPDATE_MENUQRCODE' />
      </FormBoxHead>
      <FormBoxBody material>
        <div style={{ padding: 16, textAlign: 'center' }}>
          <QRCode
            value={`https://web.dinify.app/restaurant/${restaurant.subdomain}`}
            size={120}
          />
          <div>
            <Link
              component={AdapterLink}
              target="_blank"
              to={`/qr/restaurant-link-${restaurant.subdomain}`}
            >
              Print QR
            </Link>
          </div>
        </div>
      </FormBoxBody>
    </FormBox>
  );
};


export default connect((state) => ({
  restaurant: selectedRestaurant(state)
}))(Wifi);
