import React from 'react';
import { connect } from 'react-redux';
import { planCheckinAction } from 'features/restaurant/actions';
import QRscanner from './QRscanner';
import { RootState } from 'typesafe-actions';

const Checkin = ({ checkinPlan, planCheckin }: any) => {
  let initiated = false;

  const onData = (list: any) => {
    list.forEach((data: any) => {
      try {
        const url = new URL(data.data);
        const qr = url.searchParams.get('qr');

        if (!checkinPlan && qr && !initiated) {
          initiated = true;
          console.log(qr, url.pathname);
          planCheckin({ qr, pathname: url.pathname });
        }
      } catch (e) {
        console.error('Invalid URL in QR');
      }
    })
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


export default connect(
  (state: RootState) => ({
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    checkinPlan: state.restaurant.checkinPlan
  }),
  {
    planCheckin: planCheckinAction,
  }
)(Checkin) as React.FC<any>;
