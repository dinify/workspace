// @flow
import React from 'react';
import { connect } from 'react-redux';
import { checkinInit } from 'ducks/restaurant/actions';
import QrReader from 'react-qr-reader';
import AppBar from 'web/components/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as FN from 'lib/FN';

type CheckinProps = {
  query: Object,
  checkedInRestaurant?: string,
  checkin: func,
};

class Checkin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.openImageDialog = this.openImageDialog.bind(this)
  }
  onScan = (data) => {
    const { checkedInRestaurant, checkin }: CheckinProps = this.props;
    if (!data) return;
    const uuid = data.substr(data.length - 36);
    if (!checkedInRestaurant) checkin({ qr: uuid });
  }
  openImageDialog() {
    this.refs.qrReader1.openImageDialog();
  }
  render() {
    const { query, checkedInRestaurant, checkin }: CheckinProps = this.props;
    if (query && query.qr) {
      // perform checkin action
      checkin({ qr: query.qr });
    }
    const isLegacy = true//['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';

    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}

        {isLegacy ?
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Button
                style={{marginTop: 16}}
                variant="extendedFab" color="primary" fullWidth
                onClick={() => this.openImageDialog()}
              >
                Submit QR Code
              </Button>
            </Grid>
          </Grid>
          :
          <QrReader
            ref="qrReader1"
            delay={500}
            onError={(e) => console.log(e)}
            onScan={this.onScan}
            style={{ width: '100%' }}
            legacyMode={isLegacy}
          />
        }
        {/*checkedInRestaurant ? <div>{checkedInRestaurant}</div> : 'not checked in'*/}
      </div>
    )
  }
}


export default connect(
  (state, ownProps) => ({
    query: ownProps.location.query,
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  }),
  {
    checkin: checkinInit,
  }
)(Checkin);
