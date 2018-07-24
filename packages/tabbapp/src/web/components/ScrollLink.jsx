import React from 'react';

class ScrollLink extends React.Component {
  componentDidUpdate (prevProps) {
    if (prevProps.scrollTop !== this.props.scrollTop) {
      this.pagerContainer.scrollTop = this.props.scrollTop
    }
    if (prevProps.scrollLeft !== this.props.scrollLeft) {
      this.pagerContainer.scrollLeft = this.props.scrollLeft
    }
  }

  render() {
    return (
      <div {...this.props} ref={(node) => {this.pagerContainer = node}}>
        {this.props.children}
      </div>
    )
  };
}

export default ScrollLink;
