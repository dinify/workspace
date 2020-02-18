import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useMenuItemView } from 'features/menuItem/selectors';
import Price from '@dinify/common/src/components/price';
import { Image, Aspect } from 'web/components/image';
import { useHistory } from 'react-router';
import * as routes from 'web/routes';

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
      <Aspect ratio={3 / 2} style={{
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <Image
          url={menuItem.images[0].url}
          alt={menuItem.name}
          options={{ original: true }}
          style={{ width: '100%', height: '100%' }} />
      </Aspect>
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