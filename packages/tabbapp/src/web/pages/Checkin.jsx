// @flow
import React from 'react';
import { connect } from 'react-redux';
import { checkinInit } from 'ducks/restaurant/actions';
import QrReader from 'react-qr-reader';
import AppBar from 'web/components/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as FN from 'lib/FN';
import QRscanner from './QRscanner';

type CheckinProps = {
  query: Object,
  checkedInRestaurant?: string,
  checkin: func,
};

class Checkin extends React.PureComponent {
  render() {
    const { checkedInRestaurant, checkin }: CheckinProps = this.props;

    const isLegacy = true//['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';

    const onData = (data) => {
      const query = data.match(/qr=([^&]*)/);
      if (!checkedInRestaurant && query && query[1]) {
        const qr = query[1];
        checkin({ qr });
      }
    }

    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}

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
