import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Favorite from 'icons/Favorite';
import FavoriteBorder from 'icons/FavoriteBorder';
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';

const styles = theme => ({

})

class FavoriteToggle extends React.Component {
  state = {
    checked: false
  };

  handleClick = () => {
    this.setState({checked: !this.state.checked})
  }

  render () {
    const { checked } = this.state;
    console.log(checked);

    return (
      <IconButton onClick={this.handleClick}>
        <Motion
          defaultStyle={{x: 0}}
          style={{x: spring(checked ? 1 : 0, { stiffness: 480, damping: checked ? 12 : 48 })}}>
          {style =>
            <div style={{
              position: 'relative'
            }}>
              <FavoriteBorder style={{
                position: 'absolute',
                top: -10,
                left: -12,
                opacity: Math.max(0, 1 - style.x)
              }}/>
              <div style={{
                position: 'absolute',
                top: -10,
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
}

export default withStyles(styles)(FavoriteToggle);
