import { of, from } from 'rxjs';
import { map as rxMap, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { fetchSeatsInit } from '../seat/actions.js';
import { getType } from 'typesafe-actions';
import { normalize, schema } from 'normalizr';
import {
  fetchMenuCategoriesAsync
} from './actions';

import {
  MenuCategoriesResponseNormalized
} from 'MenuCategoriesModels';

import * as API from '@dinify/common/src/api/v2/restaurant';

const { handleEpicAPIError } = require('@dinify/common/dist/lib/FN');

const menuItem = new schema.Entity('menuItems');

const menuCategory = new schema.Entity('menuCategories', {
  items: [menuItem]
});

const menuCategories = [menuCategory];

const getMenuCategoriesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchMenuCategoriesAsync.request)),
    switchMap((action) => {

      const { subdomain } = action.payload;

      const promise = API.GetMenuCategoriesOfSubdomain({ subdomain });

      return from(promise).pipe(
        rxMap((res: any) => {

          const mcs = res.map((mc: any) => {
            const newMc = mc;
            newMc.subdomain = subdomain;
            return newMc;
          })

          const normalized: MenuCategoriesResponseNormalized = normalize(mcs, menuCategories);
  
          return fetchMenuCategoriesAsync.success(normalized);
        }),
        catchError(error => {
          console.log(error);
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchMenuCategoriesAsync.failure),
            initAction: action
          })
        })
      );

    })
  );

export default [
  getMenuCategoriesEpic
];
