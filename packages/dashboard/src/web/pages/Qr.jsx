import React from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

const Qr = ({ match, loggedRestaurant }) => {
  return (
    <div style={{
      position: 'absolute',
      background: 'white',
      width: '100%',
      height: '100%',
      textAlign: 'center'
    }}>
      <QRCode
        value={`https://web.dinify.app/restaurant/${loggedRestaurant.subdomain}?qr=${match.params.code}`}
        size={256}
      />
    </div>
  );
};

export default connect(state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant,
}))(Qr);
