import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { OrderItemN, Translation, Price as PriceType, OrderAddonMap } from 'CartModels';
import Price from '../../components/Price';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { rmFromCartAsync } from '../../../features/cart/actions';
import { AddonMap, MenuItemMap } from 'MenuItemsModels';
import { IngredientMap } from 'IngredientModels';
import { ChoiceMap } from 'OptionModels';

export interface CartItemProps {
  orderItemId: string
}

const CartItemComponent: React.FC<CartItemProps & {
  theme?: any,
  style?: React.CSSProperties,
  editMode: boolean,
  orderItem: OrderItemN,
  menuItems: MenuItemMap,
  removeFromCart: typeof rmFromCartAsync.request,
  addons: AddonMap,
  ingredients: IngredientMap,
  choices: ChoiceMap,
  orderAddons: OrderAddonMap
}> = ({
  theme,
  style,
  editMode = false,
  orderItem,
  menuItems,
  removeFromCart,
  addons,
  ingredients,
  choices,
  orderAddons
}) => {
  // const testLocale = 'en';
  const getName = (arr: [Translation]) => {
    // const tr = arr.find(t => t.locale === testLocale);
    const tr = arr[0];
    return tr ? tr.name : '';
  }
  const menuItem = menuItems[orderItem.menuItemId];

  let customizations: {
    name: string,
    crossover: boolean,
    price?: PriceType,
    amount?: number
  }[] = [];
  customizations.push(
    ...orderItem.orderChoices
      .map((choiceId: string) => {
        const choice = choices[choiceId];
        return {
          name: getName(choice.translations),
          crossover: false,
          price: choice.price
        }
      })
  );
  customizations.push(
    ...orderItem.orderAddons
      .map((orderAddonId: string) => {
        const addonId = orderAddonId.split('.')[1];
        const addon = addons[addonId];
        const orderAddon = orderAddons[`${orderItem.id}.${addonId}`];
        return {
          name: getName(addon.translations),
          crossover: false,
          price: addon.price,
          amount: orderAddon ? orderAddon.amount : 0
        }
      })
  );
  customizations.push(
    ...orderItem.orderExcludes
      .filter(i => !!i)
      .map((ingredientId: string) => {
        const ingredient = ingredients[ingredientId];
        return {
          name: getName(ingredient.translations),
          crossover: true
        }
      })
  );
  return (
    <div
      style={{
        minWidth: '100%', display: 'flex', alignItems: 'top',
        ...style
      }} >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 4,
        backgroundColor: theme.palette.divider,
        overflow: 'hidden'
      }}>
        <img src={menuItem.images[0] && menuItem.images[0].url} style={{ width: 56, height: 56 }}/>
      </div>
      <div style={{flex: 1, marginLeft: 16, position: 'relative'}}>
        <div style={{display: 'flex'}}>
          <Typography style={{flex: 1, marginRight: 32}} >
            {getName(menuItem.translations)}
          </Typography>
          <Typography
            variant="overline"
            style={{alignSelf: 'flex-end', opacity: editMode ? 0 : 1}}>
            <Price price={menuItem.price}/>
          </Typography>
        </div>
        {customizations.length ? customizations.map((customization, i) =>
          <div key={i} style={{display: 'flex'}}>
            <Typography style={{
              flex: 1,
              marginRight: 32,
              textDecoration: customization.crossover ? 'line-through' : 'none',
            }} color="textSecondary" variant="caption">
              {customization.name}
            </Typography>
            {customization.price && <Typography
              color="textSecondary"
              style={{
                alignSelf: 'flex-end',
                opacity: editMode ? 0 : 1,
              }}
              variant="overline">
              {customization.amount && customization.amount > 1 ? `${customization.amount} × ` : ''}
              {parseFloat(String(customization.price.amount)) > 0 && (
                <Price price={customization.price} />
              )}
            </Typography>}
          </div>
        ) :
          <Typography variant="caption" color="textSecondary" style={{
            opacity: editMode ? 0 : 1,
          }}>
            original
          </Typography>
        }
        {editMode &&
          <div style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            top: 0,
            right: 0
          }}>
            <IconButton onClick={() => removeFromCart({ orderItemId: orderItem.id })}>
              <DeleteIcon />
            </IconButton>
          </div>
        }
      </div>
    </div>
  );
};

export default connect(
  (state: RootState, { orderItemId }: CartItemProps) => ({
    orderItem: state.cart.items[orderItemId],
    menuItems: state.menuItem.all,
    addons: state.addon.all,
    choices: state.option.choices,
    ingredients: state.ingredient.all,
    orderAddons: state.cart.orderAddons
  }), {
    removeFromCart: rmFromCartAsync.request
  }
)(withTheme()(CartItemComponent));