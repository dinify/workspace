import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/FavoriteRounded';
import FavoriteBorder from '@material-ui/icons/FavoriteBorderRounded';
import { withTheme } from '@material-ui/styles';
import { Motion, spring } from 'react-motion';

const FavoriteToggle = ({
  onChange,
  theme,
  checked
}) => {
  return (
    <IconButton style={{ width: 48, height: 48 }} onClick={onChange}>
      <Motion
        defaultStyle={{ x: 0 }}
        style={{ x: spring(checked ? 1 : 0, { stiffness: 480, damping: checked ? 12 : 48 }) }}>
        {style =>
          <div style={{
            position: 'relative'
          }}>
            <FavoriteBorder style={{
              color: 'inherit',
              position: 'absolute',
              top: -12,
              left: -12,
              opacity: Math.max(0, 1 - style.x)
            }} />
            <div style={{
              position: 'absolute',
              top: -12,
              left: -12,
            }}>
              <Favorite color="inherit" style={{
                opacity: Math.min(1, style.x * 1.2),
                transform: `scale(${Math.max(0.1, style.x)}, ${Math.max(0.1, style.x)})`,
                WebkitTransform: `scale(${Math.max(0.1, style.x)}, ${Math.max(0.1, style.x)})`,
              }} />
            </div>
          </div>
        }
      </Motion>
    </IconButton>
  );

}

export default withTheme(FavoriteToggle);
