import { schema } from 'normalizr';
// import prop from 'ramda/es/prop';
// 
// const createPivotId = (key: string) => (v: any, p: any): string => {
//   if (p && v[key]) return `${p.id}.${v[key].id}`;
//   return 'pivotUndefined';
// };
const addon = new schema.Entity('addons');
const ingredient = new schema.Entity('ingredients');
const choice = new schema.Entity('choices');
const option = new schema.Entity('options', {
  choices: [choice]
});

const createPivotId = (key: string) => (v: any, p: any) => `${p.id}.${v[key].id}`

const menuAddon = new schema.Entity('menuAddons', {
  addon
}, { idAttribute: createPivotId('addon') });

const menuIngredient = new schema.Entity('menuIngredients', {
  ingredient
}, { idAttribute: createPivotId('ingredient') });

const menuOption = new schema.Entity('menuOptions', {
  option
}, { idAttribute: createPivotId('option') });


export const menuItem = new schema.Entity('menuItems', {
  menuAddons: [menuAddon],
  menuOptions: [menuOption],
  menuIngredients: [menuIngredient],
});