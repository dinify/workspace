import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import parallaxStyle from "assets/jss/material-kit-pro-react/components/parallaxStyle.jsx";
import initParallax from "./parallax.js";

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    let windowScrollTop;
    if (window.innerWidth >= 768) {
      windowScrollTop = window.pageYOffset / 3;
    } else {
      windowScrollTop = 0;
    }
    this.state = {
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    };
    this.resetTransform = this.resetTransform.bind(this);
  }
  componentDidMount() {
    initParallax(this.root);
  }
  componentWillUnmount() {
    if (window.innerWidth >= 768) {
      window.removeEventListener("scroll", this.resetTransform);
    }
  }
  resetTransform() {
    var windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    });
  }
  render() {
    const {
      classes,
      filter,
      className,
      children,
      style,
      image,
      small
    } = this.props;
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes[filter + "Color"]]: filter !== undefined,
      [classes.small]: small,
      [className]: className !== undefined
    });
    return (
      <div
        style={{
          height: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          position: "relative",
          webkitOverflowScrolling: "touch"
        }}
        ref={node => {
          this.root = node;
        }}
      >
        {children}
      </div>
    );
  }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.oneOf([
    "primary",
    "rose",
    "dark",
    "info",
    "success",
    "warning",
    "danger"
  ]),
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool
};

export default withStyles(parallaxStyle)(Parallax);



// WEBPACK FOOTER //
// ./src/components/Parallax/Parallax.jsx
