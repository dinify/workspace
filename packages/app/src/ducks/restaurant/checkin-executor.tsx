import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import * as routes from '../../web/routes';
import { planCheckinAction, execCheckinAsync } from './actions';
import queryString from 'query-string';

const CheckinExecutor = ({ 
  checkinPlan,
  history: { location, push },
  user,
  planCheckin,
  execCheckin
}: any) => {

  const { pathname, search } = location;

  const match = (path: string) => matchPath(pathname, { path });

  const { qr } = queryString.parse(search);

  if (!checkinPlan) {
    // If user is at restaurant page and qr param is present in URL
    // checkin plan will be created and qr param will be cleared
    if (match(routes.RESTAURANT) && qr) {
      planCheckin({ qr, pathname });
      push(pathname);
    }
  } else {
    // As soon as checkin plan is set and user is signed in, checkin will be executed
    // if there is checkin plan but user is not signed in, redirect to sign in page will take place
    if (user.isLoaded) {

      if (!user.isEmpty) {
        execCheckin();
      }
      else if (!match(routes.SIGNIN)) {
        push(routes.SIGNIN);
      }

    }
  }

  return <></>;
}

export default connect(
  (state: any) => ({
    user: state.firebase.auth,
    checkinPlan: state.restaurant.checkinPlan,
  }),
  {
    planCheckin: planCheckinAction,
    execCheckin: execCheckinAsync.request,
  }
)(withRouter(CheckinExecutor));

