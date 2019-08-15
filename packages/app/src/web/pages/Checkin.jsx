
import React from 'react';
import { connect } from 'react-redux';
import { checkinInit } from 'ducks/restaurant/actions';
import QRscanner from './QRscanner';

class Checkin extends React.PureComponent {
  render() {
    const { checkedInRestaurant, checkin } = this.props;
    let initiated = false;

    const onData = (data) => {
      try {
        const url = new URL(data);
        const qr = url.searchParams.get('qr');
        if (!checkedInRestaurant && qr && !initiated) {
          initiated = true;
          checkin({ qr, pathname: url.pathname });
        }
      } catch (e) {
        console.error('Invalid URL in QR');
      }
    }

    return (
      <div style={{
        zIndex: -1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: '100vh'
      }}>
        <QRscanner
          onData={onData}
        />

        {/* checkedInRestaurant ? <div>{checkedInRestaurant}</div> : 'not checked in' */}
      </div>
    )
  }
}


export default connect(
  (state) => ({
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  }),
  {
    checkin: checkinInit,
  }
)(Checkin);
