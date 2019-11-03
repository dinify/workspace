import React from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import * as routes from '../../web/routes';
import { planCheckinAction, execCheckinAsync } from './actions';
import queryString from 'query-string';
import { RootState } from 'typesafe-actions';
import { FirebaseReducer } from 'react-redux-firebase';
import last from 'ramda/es/last';

type CheckinExecutorProps = {
  checkinPlan: object;
  user: FirebaseReducer.AuthState;
  planCheckin: (o: any) => void;
  execCheckin: () => void;
  pathnames: string[]
}

let redirectedOnce = false;

const CheckinExecutor: React.FC<CheckinExecutorProps> = ({ 
  checkinPlan,
  user,
  planCheckin,
  execCheckin,
  pathnames
}) => {

  const { location, push } = useHistory();
  
  const { search } = location;
  const pathname = last(pathnames);

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
      else if (!match(routes.SIGNIN) && !redirectedOnce) {
        push(routes.SIGNIN);
        redirectedOnce = true;
      }

    }
  }

  return <></>;
}

export default connect(
  (state: RootState) => ({
    user: state.firebase.auth,
    checkinPlan: state.restaurant.checkinPlan,
    pathnames: state.routing.pathnames
  }),
  {
    planCheckin: planCheckinAction,
    execCheckin: execCheckinAsync.request,
  }
)(CheckinExecutor);
