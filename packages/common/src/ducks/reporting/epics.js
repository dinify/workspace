// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as API from '../../api/restaurant';
import types from './types';

const reportCampaignActionEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.REPORT_CAMPAIGN_ACTION_INIT),
    mergeMap(({ 
      token,
      status,
      type = 'default',
      campaign = 'default'
    }) => {
      const apiPromise = API.ReportCampaignAction({
        token, status, type, campaign
      });
      return from(apiPromise).pipe(
        map(() => of(
          { type: types.REPORT_CAMPAIGN_ACTION_DONE }
        )),
        catchError(error => ({ type: types.REPORT_CAMPAIGN_ACTION_FAIL }))
      );
    })
  );

export default [
  reportCampaignActionEpic
];
