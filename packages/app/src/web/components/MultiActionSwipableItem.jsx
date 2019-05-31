
import React from 'react';
import times from 'lodash.times';
import { withStyles } from '@material-ui/core/styles';
import { Motion, StaggeredMotion, spring } from 'react-motion';

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

let touching;

class SwipableItem extends React.Component {
  state = {
    actionsActive: false
  }

  onTouchStart = () => {
    touching = true
  }

  onTouchEnd = () => {
    touching = false
  }

  onScroll = (e) => {
    if (e.target.scrollLeft > 75 && !this.state.actionsActive) {
      if (!touching) this.setState({actionsActive: true});
    }

    if (e.target.scrollLeft < -75 && this.state.actionsActive) {
      if (!touching) this.setState({actionsActive: false});
    }
  }

  render() {
    const {
      classes,
      children,
      actions = []
    } = this.props;
    const {
      actionsActive,
    } = this.state;

    return (
      <div style={{position: 'relative'}}>
        <Motion defaultStyle={{x: 0}} style={{x: spring(actionsActive ? 50 : 0, {stiffness: 410, damping: 60})}}>
          {value =>
            <div
              className={classes.scrollContainer}
              onScroll={this.onScroll}
              onTouchStart={this.onTouchStart}
              onTouchEnd={this.onTouchEnd}
              style={{
                display: 'flex',
                transform: `translateX(-${value.x}%)`
              }}>
              {children}
              <div style={{minWidth: 1}}/>
            </div>
          }
        </Motion>
        {actions.length &&
          <StaggeredMotion
            defaultStyles={times(actions.length, () => {
              return { x: 0 };
            })}
            styles={prevStyles => prevStyles.map((_, i) => {
              return i === (actionsActive ? prevStyles.length - 1 : 0)
                ? {x: spring(actionsActive ? 1 : 0, { stiffness: 480, damping: actionsActive ? 15 : 24 })}
                : {x: spring(prevStyles[i + (actionsActive ? 1 : - 1)].x, { stiffness: 480, damping: actionsActive ? 30 : 48 })}
            })}>
            {interpolatingStyles =>
              <div style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '100%',
                width: '50%',
                top: 0,
                right: 0,
              }}>
                {interpolatingStyles.map((style, i) =>
                    <div key={i} style={{
                      width: 48,
                      height: 48,
                      transform: `scale(${style.x}, ${style.x})`}}>
                      {actions[i]}
                    </div>
                  )
                }
              </div>
            }
          </StaggeredMotion>
        }
      </div>
    )
  }
}

export default withStyles(styles)(SwipableItem);
