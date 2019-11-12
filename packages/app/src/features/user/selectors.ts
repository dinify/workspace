import { createSelector } from 'reselect'

export const getUserLang = createSelector(
  (state: any) => state.firebase.profile,
  (profile) => {
    let userLang = 'en';
    if (profile.language && profile.language.primary) {
      userLang = profile.language.primary;
    }
    return userLang;
  }
)

