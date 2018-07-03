// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';

const styles = theme => ({
  scrollContainer: {
    WebkitOverflowScrolling: 'touch',
    overflowX: 'visible',
    overflowY: 'hidden',
    '& div': {
      WebkitOverflowScrolling: 'touch',
    },
  },
  scrollSnapContainer: {
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'x mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    overflowX: 'visible',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    '& div': {
      WebkitOverflowScrolling: 'touch',
      scrollSnapAlign: 'start',
    },
  },
});

class SwipableItem extends React.Component {
  state = {
    actionActive: false,
    rippleRadius: 0
  }

  componentDidMount() {
    const width = this.divElement.clientWidth;
    const height = this.divElement.clientHeight;
    this.setState({ rippleRadius: Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) });
  }

  onScroll = (e) => {
    if (e.target.scrollLeft > 80 && !this.state.actionActive) {
      this.setState({actionActive: true});
    }
    else if (e.target.scrollLeft < 80 && this.state.actionActive) {
      this.setState({actionActive: false});
    }
  }

  render() {
    const {
      classes,
      children,
      actionIcon,
      actionColor
    } = this.props;
    const {
      rippleRadius,
      actionActive,
    } = this.state;

    return (
      <div style={{position: 'relative'}} ref={(divElement) => {this.divElement = divElement}}>
        <div style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
          <Motion
            defaultStyle={{x: 0}}
            style={{x: spring(actionActive ? 1 : 0, { stiffness: 480, damping: 24 })}}>
            {style =>
              <div style={{
                position: 'absolute',
                backgroundColor: actionColor,
                borderRadius: rippleRadius / 2,
                minHeight: rippleRadius,
                minWidth: rippleRadius,
                transform: `scale(${style.x}, ${style.x})`,
                left: `calc(100% - 40)`
              }}/>
            }
          </Motion>
        </div>
        <div
          className={classes.scrollContainer}
          onScroll={this.onScroll}
          style={{
            display: 'flex',
          }}>
          {children}
          <div style={{minWidth: 1}}/>
        </div>
        <Motion
          defaultStyle={{x: 0}}
          style={{x: spring(actionActive ? 1 : 0, { stiffness: 480, damping: actionActive ? 15 : 24 })}}>
          {style =>
            <div style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '100%',
              width: 80,
              top: 0,
              right: 0,
            }}>
              <div style={{
                width: 24,
                height: 24,
                transform: `scale(${style.x}, ${style.x})`}}>

                {actionIcon}
              </div>
            </div>
          }
        </Motion>
      </div>
    )
  }
}

export default withStyles(styles)(SwipableItem);
