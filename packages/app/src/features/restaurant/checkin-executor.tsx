import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { matchPath } from 'react-router';
import * as routes from '../../web/routes';
import { planCheckinAction, execCheckinAsync } from './actions';
import queryString from 'query-string';
import { RootState } from 'typesafe-actions';
import { useAction } from '@dinify/common/src/lib/util';

let redirectedOnce = false;

const CheckinExecutor: React.FC = () => {

  const planCheckin = useAction(planCheckinAction);
  const execCheckin = useAction(execCheckinAsync.request);

  const checkinPlan = useSelector((state: RootState) => state.restaurant.checkinPlan);
  const user = useSelector((state: RootState) => state.firebase.auth);

  const { location, push } = useHistory();

  const { search, pathname } = location;

  const match = (path: string) => matchPath(pathname, { path });

  const qr = queryString.parse(search).qr as string | undefined;

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
        execCheckin({});
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
