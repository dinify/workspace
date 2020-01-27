import { createSelector } from 'reselect';

export const getUserLang = createSelector(
  (state: any) => state.firebase.profile,
  (profile) => {
    let tag = 'en';
    if (profile.language && profile.language.primary) {
      tag = profile.language.primary;
    }
    
    let userLang = tag.split('-')[0];

    if (userLang === "zh") {
      userLang = `${userLang}-${tag.split('-')[1]}`;
    }
    return userLang;
  }
)
