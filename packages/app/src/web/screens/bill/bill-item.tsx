import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { RootState } from 'typesafe-actions';
import { Translation, OrderItemN } from 'CartModels';
import Typography from '@material-ui/core/Typography';
import Price from '@dinify/common/src/components/price';
import { MenuItem, MenuItemMap } from 'MenuItemsModels';

export interface BillItemProps {
  style?: any,
  theme?: any,
  orderItem: OrderItemN,
  menuItems: MenuItemMap
}

const BillItem: React.FC<BillItemProps> = ({
  theme,
  style,
  orderItem,
  menuItems,
}) => {
  const menuItem: MenuItem = menuItems[orderItem.menuItemId];
  const getName = (arr: [Translation]) => {
    const tr = arr[0];
    return tr ? tr.name : '';
  };
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
        <img src={menuItem.images[0] && `${menuItem.images[0].url}=s112-c`} style={{ width: 56, height: 56 }} />
      </div>
      <div style={{ flex: 1, marginLeft: 16, position: 'relative' }}>
        <div style={{ display: 'flex' }}>
          <Typography style={{ flex: 1, marginRight: 32 }} >
            {getName(menuItem.translations)}
          </Typography>
          <Typography
            variant="overline"
            style={{ alignSelf: 'flex-end' }}>
            <Price original price={menuItem.price} />
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: RootState, { orderItemId }: { orderItemId: string }) => ({
    orderItem: state.transaction.items[orderItemId],
    menuItems: state.menuItem.all
  })
)(withTheme()(BillItem));
