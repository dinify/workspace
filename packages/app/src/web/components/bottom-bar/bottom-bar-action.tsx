import React from 'react';
import { useTranslation } from 'react-i18next';

import Price from '../../../web/components/Price';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Subtotal } from 'CartModels';

const BottomBarAction: React.FC<{
  style?: React.CSSProperties,
  icon?: any,
  onClick?: () => void,
  flipped?: boolean,
  subtotal: Subtotal|null,
  count: number,
  title: string,
}> = ({
  style,
  icon,
  subtotal,
  flipped = false,
  count,
  title,
  onClick,
  ...otherProps
}) => {
  const { t } = useTranslation();
  return (
    <ButtonBase onClick={onClick} style={{
      bottom: 0,
      height: 56,
      padding: `8px 16px 8px 16px`,
      justifyContent: 'flex-start',
      ...style
    }}>
      {!flipped && icon}
      {flipped && subtotal && <div style={{textAlign: 'start'}}>
        <Typography variant="overline">
          <Price price={subtotal} />
        </Typography>
      </div>}
      <div style={{textAlign: flipped ? 'end' : 'start', padding: '0 16px', flex: 1}}>
        <Typography variant="subtitle1">
          {title}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {t('cart.itemCount', { count, context: count === 0 ? 'none' : undefined })}
        </Typography>
      </div>
      {!flipped && subtotal && <div style={{textAlign: 'end'}}>
        <Typography variant="overline">
          <Price price={subtotal} />
        </Typography>
      </div>}
      {flipped && icon}
    </ButtonBase>
  );
};

export default BottomBarAction;
