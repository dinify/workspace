import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/MenuRounded";
import Close from "@material-ui/icons/CloseRounded";
// core components
import LogoText from "@dinify/common/dist/icons/LogoText";
import headerStyle from "./headerStyle.jsx";
import HeaderLinks from "./HeaderLinks.jsx";
import getTheme from "@dinify/common/dist/theme";

const lightTheme = getTheme({ type: "light" });
const darkTheme = getTheme({ type: "dark" });

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
      // window.addEventListener("scroll", this.headerColorChange);
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
      // window.removeEventListener("scroll", this.headerColorChange);
    }
  }
  render() {
    const {
      classes,
      color,
      links,
      brand = props => <LogoText className={classes.whiteSvg} {...props} />,
      subBrand,
      fixed,
      absolute,
      changeColorOnScroll,
      scrollingElement,
      onScrollFrame,
      children,
      scrolled: scrolledProp,
      menuItems = []
    } = this.props;
    const completeAppBar = (scrolled, opacity) => {
      const colorName = scrolled && changeColorOnScroll !== undefined ? changeColorOnScroll.color : color;
      const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[colorName]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed
      });
      const AppBarStyle = {
        opacity,
        boxShadow: "none",
        height: 56,
        borderRadius: 0
      };
      const subBrandStyle = {
        fontFamily: "Lato",
        //fontSize: 20,
        marginLeft: 5
      };
      const currentTheme = colorName === "primary" ? lightTheme : darkTheme;
      if (colorName === "primary") {
        AppBarStyle.background = currentTheme.palette.background.paper;
        AppBarStyle.borderBottom = `1px solid ${currentTheme.palette.divider}`;
      }
      const logo = brand({style: {fill: colorName === "primary" ? "rgba(0, 0, 0, 0.72)" : "#ffffff"}});
      return (
        <AppBar className={appBarClasses} style={AppBarStyle}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: (colorName === "primary") ? "linear-gradient(60deg, rgb(193, 57, 57), rgb(195, 0, 72))" : "none"
            }}
          />
          <Toolbar className={classes.container}>
            <Button disableRipple style={{ justifyContent: "center" }}>
              <Link to="/" style={{ height: 24 }}>
                {logo}
                <span style={subBrandStyle}>{subBrand && ` | ${subBrand}`}</span>
              </Link>
            </Button>

            <Hidden smDown implementation="css" className={classes.hidden}>
              <div className={classes.collapse}>
                {children}
                <HeaderLinks menuItems={menuItems} scrollingElement={scrollingElement} onScrollFrame={onScrollFrame} />
              </div>
            </Hidden>
            <Hidden mdUp>
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="right"
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={this.handleDrawerToggle}
            >
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.closeButtonDrawer}
              >
                <Close />
              </IconButton>
              <div
                onClick={this.handleDrawerToggle}
                className={classes.appResponsive}
              >
                {children}
                <HeaderLinks
                  menuItems={menuItems}
                  scrollingElement={scrollingElement}
                  onScrollFrame={onScrollFrame}
                />
              </div>
            </Drawer>
          </Hidden>
        </AppBar>
      );
    }

    return (
      <div style={{
        position: "relative"
      }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}>
          <MuiThemeProvider theme={darkTheme}>
            {completeAppBar(false, 1)}
          </MuiThemeProvider>
        </div>
        <div style={{
          transition: lightTheme.transitions.create(["opacity"], {
            duration: lightTheme.transitions.duration.shortest
          }),
          WebkitTransition: lightTheme.transitions.create(["opacity"], {
            duration: lightTheme.transitions.duration.shortest
          }),
          pointerEvents: scrolledProp ? "auto" : "none"
        }}>
          <MuiThemeProvider theme={lightTheme}>
            {completeAppBar(true, scrolledProp ? 1 : 0)}
          </MuiThemeProvider>
        </div>
      </div>
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
