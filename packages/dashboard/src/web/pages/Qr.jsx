import React from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { selectedRestaurant } from 'features/restaurant/selectors';

const Qr = ({ match, restaurant }) => {
  let value = `https://web.dinify.app/restaurant/${restaurant.subdomain}?qr=${match.params.code}`;
  if (match.params.code.includes('WIFI')) {
    value = match.params.code;
  }
  return (
    <div style={{
      position: 'absolute',
      background: 'white',
      width: '100%',
      height: '100%',
      textAlign: 'center'
    }}>
      <QRCode
        value={value}
        size={256}
      />
    </div>
  );
};

export default connect(state => ({
  restaurant: selectedRestaurant(state)
}))(Qr);
