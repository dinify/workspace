// @flow
import React from 'react';
import { connect } from 'react-redux';
import { checkinInit } from 'ducks/restaurant/actions';
import QrReader from 'react-qr-reader';

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
    const isLegacy = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
    return (
      <div>
        <QrReader
          ref="qrReader1"
          delay={500}
          onError={(e) => console.log(e)}
          onScan={this.onScan}
          style={{ width: '100%' }}
          legacyMode={isLegacy}
          />
          {isLegacy && <input type="button" value="Submit QR Code" onClick={this.openImageDialog} />}
          {checkedInRestaurant ? <div>{checkedInRestaurant}</div> : 'not checked in'}
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
