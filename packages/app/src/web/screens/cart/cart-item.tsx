import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import Price from '@dinify/common/src/components/price';
import { rmFromCartAsync } from '../../../features/cart/actions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useAction } from '@dinify/common/src/lib/util';
import { useCartItemView } from '../../../features/cart/selectors';

export interface CartItemProps {
  orderItemId: string
}

const CartItemComponent: React.FC<CartItemProps & {
  theme?: any,
  style?: React.CSSProperties,
  editMode: boolean,
}> = ({
  orderItemId,
  theme,
  style,
  editMode = false,
}) => {
    const { t } = useTranslation();
    const removeFromCart = useAction(rmFromCartAsync.request);
    const { orderItem, menuItem, customizations } = useCartItemView(orderItemId);

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
          <img src={menuItem.images[0] && `${menuItem.images[0].url}=s112-c`} style={{ width: 56, height: 56 }} />
        </div>
        <div style={{ flex: 1, marginLeft: 16, position: 'relative' }}>
          <div style={{ display: 'flex' }}>
            <Typography style={{ flex: 1, marginRight: 32 }} >
              {menuItem.name}
            </Typography>
            <Typography
              variant="overline"
              style={{ alignSelf: 'flex-end', opacity: editMode ? 0 : 1 }}>
              <Price original price={menuItem.price} />
            </Typography>
          </div>
          {customizations.length ? customizations.map((customization, i) =>
            <div key={i} style={{ display: 'flex' }}>
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
                  <Price original price={customization.price} />
                )}
              </Typography>}
            </div>
          ) :
            <Typography variant="caption" color="textSecondary" style={{
              opacity: editMode ? 0 : 1,
            }}>
              {t('cart.item.original')}
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

export default withTheme()(CartItemComponent);