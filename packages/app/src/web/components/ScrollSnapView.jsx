import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import omit from 'ramda/src/omit';

const styles = theme => ({
  container: {
    width: '100%'
  },
  horizontal: {
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    WebkitOverflowScrolling: 'touch',
  },
  vertical: {
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  scrollSnapHorizontal: {
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'x mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
  scrollSnapVertical: {
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'y mandatory',
    WebkitScrollSnapPointsY: 'repeat(100%)',
    scrollSnapPointsY: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  alignStart: {
    '& > div': {
      WebkitOverflowScrolling: 'touch',
      scrollSnapAlign: 'start'
    }
  },
  alignCenter: {
    '& > div': {
      WebkitOverflowScrolling: 'touch',
      scrollSnapAlign: 'center'
    }
  },
  alignEnd: {
    '& > div': {
      WebkitOverflowScrolling: 'touch',
      scrollSnapAlign: 'end'
    }
  }
});

class ScrollSnapView extends React.Component {
  state = {
    animating: false
  }

  constructor() {
    super();
    this.selectedScollPosition = 0;
    this.stablePoints = [];
    this.tippingPoints = [];
    this.children = [];
    this.instanceID = ScrollSnapView.instanceCounter;
    ScrollSnapView.instanceCounter += 1;
  }

  componentDidMount = () => {
    this.updateChildren();
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.selected !== this.props.selected) {
      if (this.selected !== nextProps.selected) {
        this.selected = nextProps.selected;
        const child = this.children[nextProps.selected];
        if (child) {
          // If child is out of window bounds
          if (child.offsetLeft < this.root.scrollLeft ||
              child.offsetLeft + child.clientWidth > this.root.scrollLeft + this.root.clientWidth) {
            const start = child.offsetLeft;
            const end = child.offsetLeft - this.root.clientWidth + child.clientWidth;
            let target;
            if (Math.abs(start - this.root.scrollLeft) < Math.abs(end - this.root.scrollLeft)) target = start;
            else target = end;
            this.scrollTo(nextProps.snap ? this.stablePoints[Math.min(this.stablePoints.length - 1, nextProps.selected)] : target);
          }
        }
      } else return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.instanceID, this.props, this.state);
    if (prevProps.children !== this.props.children) {
      this.updateChildren();
    }
  }

  alignSwitch = (arr, align = this.props.align) => {
    let alignType;
    switch(align) {
      case 'start':
        alignType = 0;
        break;
      case 'center':
        alignType = 1;
        break;
      case 'end':
        alignType = 2;
        break;
      default:
        alignType = null;
        throw Error(`Invalid props value for 'align': ${align}`);
    }
    return arr[alignType];
  }

  updateChildren = () => {
    const { children, align = 'start' } = this.props;

    const maxScroll = this.root.scrollWidth - this.root.clientWidth;
    const stablePoints = [];
    const tippingPoints = [];
    let maxReached = false;
    for (let i = 0; i < children.length; i += 1) {
      const childElement = document.getElementById(children[i].key);
      this.children[i] = childElement;
      if (align === 'start' && !maxReached) {
        // the first stable point to be out of scrolling bounds bill be brought back to maxScroll
        if (childElement.offsetLeft < maxScroll)
          stablePoints.push(childElement.offsetLeft);
        else {
          stablePoints.push(maxScroll);
          maxReached = true;
        }
      }
    }

    for (let i = 0; i < stablePoints.length - 1; i += 1) {
      tippingPoints[i] = (stablePoints[i] + stablePoints[i + 1]) / 2;
    }
    this.stablePoints = stablePoints;
    this.tippingPoints = tippingPoints;
  }

  scrollTo = offset => {
    if (this.root.scrollLeft === offset) return;
    // console.log(this.instanceID + ' scrolling', this.root.scrollLeft, offset);
    this.setState({animating: true}, () => {
      this.animate(this.root, 'scrollLeft', offset, () => {
        this.setState({animating: false}, () => {
          this.root.scrollLeft = offset;
        });
      });
    });
  }

  animate = (obj, prop, to, cb = () => {}) => {
    let currentValue = obj[prop] || 0;
    const startValue = currentValue;
    const duration = Math.min(500, Math.max(100, Math.abs(to - currentValue)));
    const startTime = new Date().getTime();
    const ease = t => { return 1+(--t)*t*t*t*t };
    const step = () => {
      const elapsed = new Date().getTime() - startTime;
      const frac = elapsed / duration;
      if (frac < 1) {
        currentValue = startValue + ((to - startValue) * ease(frac));
        obj[prop] = currentValue;
        requestAnimationFrame(step);
      }
      else {
        obj[prop] = to;
        cb();
      }
    };
    requestAnimationFrame(step);
  }

  handleScroll = e => {
    // ßßreturn;
    if (this.stateIsChanging || this.state.animating) return;
    const { children, onChange, align = 'start' } = this.props;

    const count = children.length;
    if (count > 1) {
      // TODO: this is assuming that children are equal dimensions
      let index = 0;
      let currentScroll;
      if (align === 'start') currentScroll = this.root.scrollLeft;
      else if (align === 'center') currentScroll = this.root.scrollLeft + (this.root.clientWidth / 2);
      else if (align === 'end') currentScroll = this.root.scrollLeft + this.root.clientWidth;

      for (let i = 0; i < this.tippingPoints.length; i += 1) {
        if (currentScroll < this.tippingPoints[i]) {
          index = i;
          break;
        }
        else if (i === this.tippingPoints.length - 1) {
          index = i + 1;
          break;
        }
      }

      if (this.selected !== index) {
        this.selected = index;
        if (typeof onChange === 'function')
          onChange(index);
      }
    }
  };

  render () {
    const {
      snap = true,
      direction = 'horizontal',
      align = 'start',

      classes,
      style
    } = this.props;
    const {
      animating
    } = this.state;

    let type;
    switch(direction) {
      case 'horizontal':
        type = 0;
        break;
      case 'vertical':
        type = 1;
        break;
      default:
        type = null;
        throw Error(`Invalid props value for 'direction': ${direction}`);
    }

    let alignType;
    switch(align) {
      case 'start':
        alignType = 0;
        break;
      case 'center':
        alignType = 1;
        break;
      case 'end':
        alignType = 2;
        break;
      default:
        alignType = null;
        throw Error(`Invalid props value for 'align': ${direction}`);
    }

    let rootClassName = type === 0 ? classes.horizontal : classes.vertical;
    if (snap && !animating) {
      rootClassName += ` ${type === 0 ? classes.scrollSnapHorizontal : classes.scrollSnapVertical}`;
      rootClassName += alignType === 0 ? ` ${classes.alignStart}` : (alignType === 1 ? ` ${classes.alignCenter}` : ` ${classes.alignEnd}`);
    }
    return (
      <div
        {...omit(['scrollTop', 'scrollLeft', 'classes', 'style', 'align', 'snap'], this.props)}
        style={Object.assign({

        }, style)}
        onScroll={this.handleScroll}
        className={rootClassName}
        ref={(node) => {this.root = node}}
        >
          {/* <div style={{position: 'relative', whiteSpace: 'nowrap'}}>
            {this.tippingPoints.map(point =>
              <div key={`${Math.random()}`} style={{
                position: 'absolute',
                left: point,
                height: 84,
                width: 1,
                backgroundColor: 'rgba(0, 0, 255, 0.54)'
              }}/>
            )}
            {this.stablePoints.map(point =>
              <div key={`${Math.random()}`} style={{
                position: 'absolute',
                left: point,
                height: 84,
                width: 1,
                backgroundColor: 'rgba(0, 255, 0, 0.54)'
              }}/>
            )}
          </div> */}
          {this.props.children}
      </div>
    )
  };
}
ScrollSnapView.instanceCounter = 0;

export default withStyles(styles)(ScrollSnapView);
