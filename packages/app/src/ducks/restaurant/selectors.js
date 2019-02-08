import { createSelector } from 'reselect'
import R from 'ramda'
import * as FN from '@dinify/common/dist/lib/FN';

export const getRestaurantBySubdomain = createSelector(
  [
    (state, subdomain) => subdomain,
    (state) => state.restaurant.all
  ],
  (subdomain, restaurantsMap) => R.find(R.propEq('subdomain', subdomain))(FN.MapToList(restaurantsMap))
)
