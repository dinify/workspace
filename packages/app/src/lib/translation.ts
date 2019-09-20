import find from 'ramda/es/find';
import propEq from 'ramda/es/propEq';

export const getT = (translations: [], l: string, col = 'name') => {
  if (!translations) return '';
  let translation = find(propEq('locale', l))(translations);
  if (!translation) translation = find(propEq('locale', 'en'))(translations);
  if (!translation) return '';
  return translation[col];
}