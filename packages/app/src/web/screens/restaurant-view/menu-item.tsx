import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useMenuItemView } from '../../../features/menuItem/selectors';
import Price from '@dinify/common/src/components/price';
import { Image } from '../../components/image';
import { useHistory } from 'react-router';
import * as routes from '../../routes';

export default ({ menuItemId, style }: { menuItemId: string, style?: React.CSSProperties }) => {
  const menuItem = useMenuItemView(menuItemId);
  const history = useHistory();
  const handleClick = () => {
    history.push(routes.MENUITEM.replace(':id', menuItemId));
  };
  return <ButtonBase
    disableRipple
    onClick={handleClick}
    style={{
      textAlign: 'start',
      display: 'block',
      ...style
    }}>
    {menuItem.images && menuItem.images.length &&
      <div style={{
        position: 'relative',
        paddingTop: '66.6666667%',
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}>
          <Image style={{ width: '100%', height: '100%' }} alt={menuItem.name} url={menuItem.images[0].url} />
        </div>
      </div>
    }
    <Typography style={{
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }} variant="subtitle1">{menuItem.name}</Typography>
    <Typography
      style={{ marginTop: 4 }}
      color="textSecondary"
      variant="overline">
      <Price price={menuItem.price} />
    </Typography>
  </ButtonBase>
};