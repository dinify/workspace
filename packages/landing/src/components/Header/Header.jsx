import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
// core components
import headerStyle from "./headerStyle.jsx";
import Typography from "@dinify/common/dist/components/Typography";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      scrolled: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }
  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }
  headerColorChange() {
    const { changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  }
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }
  render() {
    const { classes, color, links, brand, subBrand, fixed, absolute, changeColorOnScroll } = this.props;
    const { scrolled } = this.state;
    const colorName = scrolled ? changeColorOnScroll.color : color;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[colorName]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });
    const AppBarStyle = {
      boxShadow: "none",
      borderRadius: 0
    };
    const subBrandStyle = {
      fontFamily: "Lato",
      //fontSize: 20,
      marginLeft: 5
    };
    if (colorName === "primary") AppBarStyle.background = "linear-gradient(60deg, rgb(193, 57, 57), rgb(195, 0, 72))";
    return (
      <AppBar className={appBarClasses} style={AppBarStyle}>
        <Toolbar className={classes.container}>
          <Button className={classes.title}>
            <Link to="/">
              {brand}
              <span style={subBrandStyle}>{subBrand && ` | ${subBrand}`}</span>
            </Link>
          </Button>
          <Button
            href="https://m.dinify.app"
            color={window.innerWidth < 960 ? "info" : "white"}
            target="_blank"
            className={classes.navButton}
            round
          >
            <Typography
              variant="button2"
              style={{ color: "inherit" }}
              baseline="center"
            >
              Go to app
            </Typography>
          </Button>
        </Toolbar>

      </AppBar>
    );
  }
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  links: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};

export default withStyles(headerStyle)(Header);



// WEBPACK FOOTER //
// ./src/components/Header/Header.jsx
