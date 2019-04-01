// @flow
import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

const QRpage = styled.div`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Qr = ({ match, loggedRestaurant }) => {
  return (
    <QRpage>
      <QRCode
        value={`https://m.dinify.app/restaurant/${loggedRestaurant.subdomain}?qr=${match.params.code}`}
        size={256}
      />
    </QRpage>
  );
};

export default connect(state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant,
}))(Qr);
