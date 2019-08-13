
import React from 'react';
import { connect } from 'react-redux';
import { checkinInit } from 'ducks/restaurant/actions';
import QRscanner from './QRscanner';

class Checkin extends React.PureComponent {
  render() {
    const { checkedInRestaurant, checkin } = this.props;
    let initiated = false;

    const onData = (codes) => {
      if (codes.length !== 1) return;
      codes.forEach(code => {
        const result = code.data.match(/web\.dinify\.app/g);
        if (result && result.length === 1) {
          // code.polygon
          const query = code.data.match(/qr=([^&]*)/);
          if (!checkedInRestaurant && query && query[1]) {
            const qr = query[1];
            if (!initiated) {
              initiated = true;
              checkin({ qr });
            }
          }
        }
      });
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
