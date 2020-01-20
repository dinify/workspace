import React from 'react';
import { animated, useSpring } from 'react-spring';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';
import Price from '@dinify/common/src/components/price';
import { rmFromCartAsync } from '../../../features/cart/actions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useAction } from '@dinify/common/src/lib/util';
import { useCartItemView, CustomizationView } from '../../../features/cart/selectors';
import toPairs from 'ramda/es/toPairs';

export interface OrderItemProps {
  id: string,
  editMode?: boolean,
  expanded?: boolean,
  selected?: boolean,
  onClick?: () => any,
}

const OrderItem: React.FC<OrderItemProps & {
  theme?: any,
  style?: React.CSSProperties,
}> = ({
  id,
  theme,
  style,
  editMode = false,
  expanded = false,
  selected = false,
  onClick = () => {}
}) => {
    const { t } = useTranslation();
    const animatedBackgroundStyle = useSpring({ opacity: selected ? 0.12 : 0, config: { tension: 400, clamp: true } });
    const animatedOpacityStyle = useSpring({ 
      opacity: selected ? 1 : 0,
      config: { tension: 600, clamp: true } 
    });
    const rippleRadius = Math.sqrt(56**2 + 56**2);
    const animatedScaleStyle = useSpring({ 
      transform: !selected ? `scale(0, 0)` : `scale(1, 1)`,
      config: { tension: 400 } 
    });

    const removeFromCart = useAction(rmFromCartAsync.request);
    const { orderItem, menuItem, customizations } = useCartItemView(id);
    const byType = customizations.reduce<{ [key: string]: CustomizationView[] }>((acc, curr) => {
      acc[curr.type] = [...(acc[curr.type] || []), curr];
      return acc;
    }, {});

    return (
      <div
        onClick={onClick}
        style={{
          position: 'relative',
          minWidth: '100%', display: 'flex', alignItems: 'top',
          ...style
        }} >
        <animated.div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.primary.main,
          ...animatedBackgroundStyle
        }}/>
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 56,
          height: 56,
          borderRadius: 4,
          backgroundColor: theme.palette.divider,
          overflow: 'hidden'
        }}>
          <img src={menuItem.images[0] && `${menuItem.images[0].url}=s112-c`} style={{ width: 56, height: 56 }} />
          <animated.div style={{
            position: 'absolute',
            backgroundColor: '#c13939',
            borderRadius: rippleRadius / 2,
            minHeight: rippleRadius,
            minWidth: rippleRadius,
            ...animatedOpacityStyle,
            ...animatedScaleStyle
          }}/>
          <animated.div style={{
            position: 'absolute',
            color: '#fff',
            ...animatedOpacityStyle,
            ...animatedScaleStyle
          }}>
            <CheckCircle />
          </animated.div>
        </div>
        <div style={{ flex: 1, marginLeft: 16, position: 'relative' }}>
          <div style={{ display: 'flex' }}>
            <Typography variant={expanded ? "body1" : "body2"} style={{ fontWeight: expanded ? 500: 400, flex: 1, marginRight: 32 }} >
              {menuItem.name}
            </Typography>
            <Typography
              variant="overline"
              style={{ alignSelf: 'flex-end', opacity: editMode ? 0 : 1 }}>
              <Price original price={menuItem.price} />
            </Typography>
          </div>
          {toPairs(byType).map(([type, arr]) => 
            <div key={type}>
              {expanded && <div style={{ marginTop: 8, display: 'flex' }}>
                <Typography style={{
                  flex: 1,
                  marginRight: 32
                }} color="textSecondary" variant="overline">
                  {type}
                </Typography>
              </div>}
              {arr.map((customization, i) => 
                <div key={i} style={{ display: 'flex' }}>
                  <Typography style={{
                    flex: 1,
                    marginRight: 32,
                    textDecoration: customization.crossover ? 'line-through' : 'none',
                  }} color={expanded ? "textPrimary" : "textSecondary"} variant="caption">
                    {customization.name}
                  </Typography>
                  {customization.price && <Typography
                    color={expanded ? "textPrimary" : "textSecondary"}
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
              )}
            </div>
          )}
          {toPairs(byType).length === 0 && <Typography variant="caption" color="textSecondary" style={{
              opacity: editMode ? 0 : 1,
            }}>
              {t('cart.item.original')}
            </Typography>}
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

export default withTheme()(OrderItem);