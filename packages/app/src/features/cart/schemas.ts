import { schema } from 'normalizr';
import prop from 'ramda/es/prop';

const createPivotId = (key: string) => (v: any, p: any): string => {
  if (p && v[key]) return `${p.id}.${v[key].id}`;
  return 'pivotUndefined';
};

const owner = new schema.Entity('owner');

const menuItem = new schema.Entity('menuItems');

const addon = new schema.Entity('addons');

const orderAddon = new schema.Entity('orderAddons', {
  addon
}, {
  idAttribute: createPivotId('addon'),
})

const orderChoice = new schema.Entity('choices', {}, {
  idAttribute: 'choiceId',
  processStrategy: prop('choice')
});
const orderExclude = new schema.Entity('excludes', {}, {
  idAttribute: 'ingredientId',
  processStrategy: prop('ingredient')
});
const orderItem = new schema.Entity('orderItems', {
  owners: [owner],
  menuItem: menuItem,
  orderAddons: [orderAddon],
  orderChoices: [orderChoice],
  orderExcludes: [orderExclude]
});

const order = new schema.Entity('orders', {
  items: [orderItem]
})

export const cart = {
  items: [orderItem]
};

export const bill = {
  orders: [order]
}