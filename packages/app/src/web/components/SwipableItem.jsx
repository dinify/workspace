
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
  }
});

let touching;

class SwipableItem extends React.Component {
  state = {
    actionActive: false,
    removed: false,
    rippleRadius: 0
  }

  componentDidMount() {
    const width = this.divElement.clientWidth;
    const height = this.divElement.clientHeight;
    this.setState({ rippleRadius: Math.sqrt(width**2 + height**2) * 2 });
  }

  onTouchStart = () => {
    touching = true
  }

  onTouchEnd = () => {
    touching = false;
    if (this.state.actionActive) {
      this.setState({removed: true});
      this.props.action();
    }
  }

  onScroll = (e) => {
    if (e.target.scrollLeft > 80 && !this.state.actionActive) {
      this.setState({actionActive: true});
      if (!touching) {
        this.setState({removed: true});
        this.props.action();
      }
    }
    else if (e.target.scrollLeft < 80 && this.state.actionActive) {
      if (!this.props.remove || touching) this.setState({actionActive: false});
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
      removed,
    } = this.state;

    const actionActive = this.state.actionActive || removed;

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
            style={{x: spring(actionActive ? 1 : 0)}}>
            {style =>
              <div style={{
                position: 'absolute',
                backgroundColor: actionColor,
                borderRadius: rippleRadius / 2,
                minHeight: rippleRadius,
                minWidth: rippleRadius,
                left: -48,
                opacity: actionActive ? 1 : style.x,
                transform: `scale(${actionActive ? style.x : 1}, ${actionActive ? style.x : 1})`,
              }}/>
            }
          </Motion>
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
                position: 'absolute',
                color: 'rgba(0, 0, 0, 0.38)',
                width: 24,
                height: 24}}>
                {actionIcon}
              </div>
              <div style={{
                width: 24,
                height: 24,
                color: '#fff',
                opacity: Math.min(1, style.x),
                transform: `scale(${style.x}, ${style.x})`}}>

                {actionIcon}
              </div>
            </div>
          }
        </Motion>
        <Motion defaultStyle={{x: 0}} style={{x: spring(removed ? 1.5 : (actionActive ? 0.3 : 0), {stiffness: 410, damping: 60})}}>
          {value =>
            <div
              className={classes.scrollContainer}
              onScroll={this.onScroll}
              onTouchStart={this.onTouchStart}
              onTouchEnd={this.onTouchEnd}
              style={{
                display: 'flex',
                transform: `translateX(-${value.x * 100}%)`
              }}>
                {children}
              <div style={{minWidth: 1}}/>
            </div>
          }
        </Motion>

      </div>
    )
  }
}

export default withStyles(styles)(SwipableItem);
