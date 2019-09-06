import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { OrderItem, Translation, Price as PriceType, MenuItemMap } from 'CartModels';
import Price from '../../components/Price';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

const cartItemComponent: React.FC<{
  theme?: any,
  editMode: boolean,
  orderItem: OrderItem,
  menuItems: MenuItemMap
}> = ({
  theme,
  editMode = false,
  orderItem = {},
  menuItems
}) => {
  const testLocale = 'en';
  const getName = (arr: [Translation]) => {
    // const tr = arr.find(t => t.locale === testLocale);
    const tr = arr[0];
    return tr ? tr.name : '';
  }
  const menuItem = menuItems[orderItem.menuItem];

  let customizations: {
    name: string,
    crossover: boolean,
    price?: PriceType,
    amount?: number
  }[] = [];
  // customizations.push(
  //   ...orderItem.orderChoices
  //     .map(choice => choice.choice)
  //     .map(choice => {
  //       return {
  //         name: getName(choice.translations),
  //         crossover: false,
  //         price: choice.price
  //       }
  //     })
  // );
  // customizations.push(
  //   ...orderItem.orderAddons
  //     .map(addon => {
  //       return {
  //         name: getName(addon.addon.translations),
  //         crossover: false,
  //         price: addon.addon.price,
  //         amount: addon.amount
  //       }
  //     })
  // );
  // customizations.push(
  //   ...orderItem.orderExcludes
  //     .filter(i => i.ingredient)
  //     .map(ingredient => {
  //       return {
  //         name: getName(ingredient.ingredient.translations),
  //         crossover: true
  //       }
  //     })
  // );
  return (
    <div
      style={{
        minWidth: '100%', display: 'flex', alignItems: 'top',
        padding: '0 16px'
      }} >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 4,
        backgroundColor: theme.palette.divider,
        overflow: 'hidden'
      }}>
        {/* TODO: menu item image goes here */}
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
              {parseFloat(customization.price.amount) > 0 && (
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
            <IconButton onClick={() => {
              // TODO: remove from cart action here
            }}>
              <DeleteIcon />
            </IconButton>
          </div>
        }
      </div>
    </div>
  );
};



export default connect(
  (state: RootState) => ({
      menuItems: state.menuItem.all,
  })
)(withTheme()(cartItemComponent));