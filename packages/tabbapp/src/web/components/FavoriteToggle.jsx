import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Favorite from 'icons/Favorite';
import FavoriteBorder from 'icons/FavoriteBorder';
import { withTheme } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';

const FavoriteToggle = ({
  onChange,
  theme,
  checked
}) => {

  // console.log(checked);

  return (
    <IconButton style={{width: 48, height: 48}} onClick={onChange}>
      <Motion
        defaultStyle={{x: 0}}
        style={{x: spring(checked ? 1 : 0, { stiffness: 480, damping: checked ? 12 : 48 })}}>
        {style =>
          <div style={{
            position: 'relative'
          }}>
            <FavoriteBorder style={{
              color: theme.palette.text.secondary,
              position: 'absolute',
              top: -12,
              left: -12,
              opacity: Math.max(0, 1 - style.x)
            }}/>
            <div style={{
              position: 'absolute',
              top: -12,
              left: -12,
            }}>
              <Favorite color="primary" style={{
                opacity: Math.min(1, style.x * 1.2),
                transform: `scale(${Math.max(0.1, style.x)}, ${Math.max(0.1, style.x)})`,
                WebkitTransform: `scale(${Math.max(0.1, style.x)}, ${Math.max(0.1, style.x)})`,
              }}/>
            </div>
          </div>
        }
      </Motion>
    </IconButton>
  );

}

export default withTheme()(FavoriteToggle);
