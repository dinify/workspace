import React from 'react';
import { useSelector } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { RootState } from 'typesafe-actions';
import { Translation } from 'CartModels';
import Typography from '@material-ui/core/Typography';
import Price from '../../components/Price';

export interface BillItemProps {
  orderItemId: string
}

const BillItem: React.FC<BillItemProps & {
  style?: any,
  theme?: any,
}> = ({
  theme, 
  style,
  orderItemId,
  ...otherProps
}) => {
  const orderItem = useSelector((state: RootState) => state.transaction.items[orderItemId]);
  const menuItem = useSelector((state: RootState) => (state.menuItem.all as any)[orderItem.menuItemId]);
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

export default withTheme()(BillItem);