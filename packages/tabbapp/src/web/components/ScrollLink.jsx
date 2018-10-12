import React from 'react';
import R from 'ramda';

class ScrollLink extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.scrollTop !== this.props.scrollTop) {
      if (nextProps.scrollTop !== null && nextProps.scrollTop !== undefined)
        this.pagerContainer.scrollTop = nextProps.scrollTop;

      return false;
    }
    if (nextProps.scrollLeft !== this.props.scrollLeft) {
      if (nextProps.scrollLeft !== null && nextProps.scrollLeft !== undefined)
        this.pagerContainer.scrollLeft = nextProps.scrollLeft;

      return false;
    }
    return true;
  }

  render () {
    return (
      <div
        {...R.omit(['scrollTop', 'scrollLeft'], this.props)}
        ref={(node) => {this.pagerContainer = node}}
        >
        {this.props.children}
      </div>
    )
  };
}

export default ScrollLink;
