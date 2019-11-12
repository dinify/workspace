import { createSelector } from 'reselect';
import find from 'ramda/es/find';
import propEq from 'ramda/es/propEq';
import { MapToList } from '@dinify/common/src/lib/FN';
import getDistance from 'geolib/es/getDistance';

export const getRestaurantBySubdomain = createSelector(
  [
    (state, subdomain) => subdomain,
    (state) => state.restaurant.all
  ],
  (subdomain, restaurantsMap) => find(propEq('subdomain', subdomain))(MapToList(restaurantsMap))
)

const getDistOfRest = (restaurant, userGeolocation) => {
  if (!userGeolocation) return false;
  if (!restaurant.latitude || !restaurant.longitude) return false;
  const latitude = Number(restaurant.latitude);
  const longitude = Number(restaurant.longitude);
  const distance = getDistance(userGeolocation, { latitude, longitude });
  return distance;
}

export const getRestaurantsList = createSelector(
  [
    (state) => state.restaurant.all,
    (state) => state.user.geolocation
  ],
  (restaurantsMap, userGeolocation) => {
    return MapToList(restaurantsMap)
      .map(r => {
        const distance = getDistOfRest(r, userGeolocation);
        return { ...r, distance };
      })
      .sort((a, b) => a.distance - b.distance);
  }
)