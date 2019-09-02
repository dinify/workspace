import { createSelector } from 'reselect';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import { MapToList } from '@dinify/common/dist/lib/FN';

export const getRestaurantBySubdomain = createSelector(
  [
    (state, subdomain) => subdomain,
    (state) => state.restaurant.all
  ],
  (subdomain, restaurantsMap) => find(propEq('subdomain', subdomain))(MapToList(restaurantsMap))
)
