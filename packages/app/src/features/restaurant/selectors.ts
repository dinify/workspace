import { createSelector } from 'reselect';
import find from 'ramda/es/find';
import propEq from 'ramda/es/propEq';
import { MapToList } from '@dinify/common/src/lib/FN';
import getDistance from 'geolib/es/getDistance';
import { Restaurant } from 'RestaurantModels';
import { GeolibInputCoordinates } from 'geolib/es/types';
import { RootState } from 'typesafe-actions';

export const getRestaurantBySubdomain = createSelector(
  [
    (state: RootState, subdomain: string) => subdomain,
    (state) => state.restaurant.all
  ],
  (subdomain, restaurantsMap) => find(propEq('subdomain', subdomain))(MapToList(restaurantsMap))
)

const getDistOfRest = (restaurant: Restaurant, userGeolocation: GeolibInputCoordinates) => {
  if (!userGeolocation) return false;
  if (!restaurant.latitude || !restaurant.longitude) return false;
  const latitude = Number(restaurant.latitude);
  const longitude = Number(restaurant.longitude);
  const distance = getDistance(userGeolocation, { latitude, longitude });
  return distance;
}

export const getRestaurantsList = createSelector(
  [
    (state: RootState) => state.restaurant.all,
    (state) => state.user.geolocation
  ],
  (restaurantsMap, userGeolocation: GeolibInputCoordinates) => {
    return MapToList(restaurantsMap)
      .map(r => {
        const distance = getDistOfRest(r, userGeolocation);
        return { ...r, distance };
      })
      .sort((a, b) => a.distance - b.distance);
  }
)
