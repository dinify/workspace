// @flow
import React from 'react';
import { connect } from 'react-redux';
import { checkinInit } from 'ducks/restaurant/actions';
import * as FN from '@dinify/common/dist/lib/FN';
import QRscanner from './QRscanner';

type CheckinProps = {
  query: Object,
  checkedInRestaurant?: string,
  checkin: func,
};

class Checkin extends React.PureComponent {
  render() {
    const { checkedInRestaurant, checkin }: CheckinProps = this.props;

    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';

    let initiated = false;

    const onData = (data) => {
      const query = data.match(/qr=([^&]*)/);
      if (!checkedInRestaurant && query && query[1]) {
        const qr = query[1];
        if (!initiated) {
          initiated = true;
          checkin({ qr });
        }
      }
    }

    return (
      <div>
        <QRscanner
          onData={onData}
        />

        {/*checkedInRestaurant ? <div>{checkedInRestaurant}</div> : 'not checked in'*/}
      </div>
    )
  }
}


export default connect(
  (state, ownProps) => ({
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  }),
  {
    checkin: checkinInit,
  }
)(Checkin);