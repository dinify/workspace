import React from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Subtotal } from 'CartModels';
import { BackgroundColorProperty } from 'csstype';
import Price from '@dinify/common/src/components/price';

const BottomBarAction: React.FC<{
  style?: React.CSSProperties;
  icon?: any;
  onClick?: () => void;
  scrim?: 'none' | 'dark' | 'light' | null;
  scrimAlpha?: number;
  theme?: any;
  flipped?: boolean;
  subtotal: Subtotal | null;
  count: number;
  title: string;
}> = ({
  style,
  icon,
  scrim,
  theme,
  scrimAlpha = 0.12,
  subtotal,
  flipped = false,
  count,
  title,
  onClick,
  ...otherProps
}) => {
  const { t } = useTranslation();
  // const useScrimType  = inverse ? (scrim === 'dark' ? 'light' : (scrim === 'light' ? 'dark' : scrim)) : scrim;
  const a = scrimAlpha;
  const backgroundColor: BackgroundColorProperty =
    scrim === 'dark'
      ? `rgba(0,0,0,${a})`
      : scrim === 'light'
      ? `rgba(255, 255, 255, ${a})`
      : '';
  return (
    <ButtonBase
      onClick={onClick}
      style={{
        bottom: 0,
        height: 56,
        padding: `8px 16px 8px 16px`,
        justifyContent: 'flex-start',
        backgroundColor,
        ...style,
      }}
    >
      {!flipped && icon}
      {flipped && subtotal && (
        <div style={{ textAlign: 'start' }}>
          <Typography variant="overline">
            <Price price={subtotal} />
          </Typography>
        </div>
      )}
      <div
        style={{
          textAlign: flipped ? 'end' : 'start',
          padding: '0 16px',
          flex: 1,
        }}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption" color="textSecondary">
          {t('itemCount', [count])}
        </Typography>
      </div>
      {!flipped && subtotal && (
        <div style={{ textAlign: 'end' }}>
          <Typography variant="overline">
            <Price price={subtotal} />
          </Typography>
        </div>
      )}
      {flipped && icon}
    </ButtonBase>
  );
};

export default BottomBarAction;
