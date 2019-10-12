import { schema } from 'normalizr';
// import prop from 'ramda/es/prop';
// 
// const createPivotId = (key: string) => (v: any, p: any): string => {
//   if (p && v[key]) return `${p.id}.${v[key].id}`;
//   return 'pivotUndefined';
// };

const menuItem = new schema.Entity('menuItems');

const menuCategory = new schema.Entity('menuCategories', {
  items: [menuItem]
});

export const menuCategories = [menuCategory];
