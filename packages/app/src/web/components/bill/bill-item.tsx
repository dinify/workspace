import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { RootState } from 'typesafe-actions';
import { OrderItemN, Translation } from 'CartModels';
import { MenuItem } from 'MenuItemsModels';
import Typography from '@material-ui/core/Typography';
import Price from '../../components/Price';

export interface BillItemProps {
  orderItemId: string
}

const BillItem: React.FC<BillItemProps & {
  orderItem: OrderItemN,
  menuItem: MenuItem,
  style?: any,
  theme?: any,
}> = ({
  theme, 
  style,
  orderItemId, 
  orderItem, 
  menuItem,
  ...otherProps
}) => {
  const getName = (arr: [Translation]) => {
    const tr = arr[0];
    return tr ? tr.name : '';
  }
  // const menuItem = menuItems[orderItem.menuItemId];
  return (
    <div
      style={{
        minWidth: '100%', display: 'flex', alignItems: 'top',
        ...style
      }}>
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
            style={{alignSelf: 'flex-end'}}>
            <Price price={menuItem.price}/>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: RootState, { orderItemId }: BillItemProps) => ({
    orderItem: state.transaction.items[orderItemId],
    menuItem: (state.menuItem.all as any)[state.transaction.items[orderItemId].menuItemId],
  }),
  {}
)(withTheme()(BillItem));