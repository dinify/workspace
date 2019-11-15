import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { matchPath } from 'react-router';
import * as routes from '../../web/routes';
import { planCheckinAction, execCheckinAsync } from './actions';
import queryString from 'query-string';
import { RootState } from 'typesafe-actions';

let redirectedOnce = false;

const CheckinExecutor: React.FC = () => {

  const dispatch = useDispatch();

  const checkinPlan = useSelector((state: RootState) => state.restaurant.checkinPlan);
  const user = useSelector((state: RootState) => state.firebase.auth);

  const { location, push } = useHistory();
  
  const { search, pathname } = location;

  const match = (path: string) => matchPath(pathname, { path });

  const { qr } = queryString.parse(search);

  if (!checkinPlan) {
    // If user is at restaurant page and qr param is present in URL
    // checkin plan will be created and qr param will be cleared
    if (match(routes.RESTAURANT) && qr) {
      dispatch(planCheckinAction({ qr, pathname }));
      push(pathname);
    }
  } else {
    // As soon as checkin plan is set and user is signed in, checkin will be executed
    // if there is checkin plan but user is not signed in, redirect to sign in page will take place
    if (user.isLoaded) {

      if (!user.isEmpty) {
        dispatch(execCheckinAsync.request());
      }
      else if (!match(routes.SIGNIN) && !redirectedOnce) {
        push(routes.SIGNIN);
        redirectedOnce = true;
      }

    }
  }

  return <></>;
}

export default CheckinExecutor;
