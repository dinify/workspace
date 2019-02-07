import { createSelector } from 'reselect'

export const getLoggedUser = createSelector(
  (state) => state.user.all,
  (state) => state.user.loggedUserId,
  (users, id) => {
    if (id === null) return null;
    return users[id];
  }
)
