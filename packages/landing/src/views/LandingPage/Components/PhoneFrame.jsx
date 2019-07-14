import React, { Component } from "react";
// @material-ui/core components
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NetworkWifi from "@material-ui/icons/NetworkWifiRounded";
import NetworkCell from "@material-ui/icons/NetworkCellRounded";
import BatteryFull from "@material-ui/icons/BatteryFullRounded";
import Lens from "@material-ui/icons/LensRounded";
import classNames from "classnames";

import getTheme from "@dinify/common/dist/theme";
import LogoText from "@dinify/common/dist/icons/LogoText";

const darkTheme = getTheme({ type: "dark" });
const lightTheme = getTheme({ type: "light" });

const styles = theme => ({
  demoContainer: {
    userSelect: "none",
    position: "relative",
    height: 722,
    width: 350,
    padding: "51px 45px 82px 17px",
    margin: "0 auto 0 0",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }
  },
  phoneImg: {
    position: "absolute",
    height: 722,
    width: 350,
    top: 0,
    left: 0,
    border: "none",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center"
  },
  statusBar: {
    backgroundColor: theme.palette.background.default,
    height: 24
  },
  statusIcon: {
    marginLeft: 4,
    fontSize: 12
  },
  statusTime: {
    marginLeft: 4,
    fontSize: 10,
    letterSpacing: "0.02rem",
    fontWeight: "600",
    color: theme.palette.text.secondary
  },
  phoneBg: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    overflow: "hidden"
  },
  appBar: {
    height: 32,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  section: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8
  },
  bottomNavigation: {
    position: "absolute",
    display: "flex",
    height: 40,
    width: "100%",
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    borderTop: `1px solid ${theme.palette.divider}`
  },
  bottomNavIcon: {
    fontSize: 12,
    marginBottom: 4,
    color: theme.palette.text.secondary
  },
  bottomNavIconSelected: {
    fontSize: 12,
    marginBottom: 2,
    color: theme.palette.primary.main
  },
  bottomNavItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

class PhoneFrame extends Component {
  state = {
    dark: false
  };

  toggleTheme = () => {
    this.setState({ dark: !this.state.dark });
  };

  render() {
    const { classes, children, alt } = this.props;
    const { dark } = this.state;
    return (
      <MuiThemeProvider theme={dark ? darkTheme : lightTheme}>
        <div className={classes.demoContainer}>
          <div className={classes.phoneBg}>
            <div className={classNames(classes.statusBar, classes.section)}>
              <div style={{ flex: 1 }}/>
              <NetworkWifi className={classes.statusIcon}/>
              <NetworkCell className={classes.statusIcon}/>
              <BatteryFull className={classes.statusIcon}/>
              <span className={classes.statusTime}>12:40 PM</span>
            </div>
            <div className={classNames(classes.appBar, classes.section)}>
              <LogoText style={{ width: 78 * (18 / 24) }}/>
            </div>
            {children}
            <div className={classes.bottomNavigation}>
              <div className={classes.bottomNavItem}>
                <Lens className={classes.bottomNavIconSelected}/>
                <Typography variant="caption" color="primary">
                  Explore
                </Typography>
              </div>
              <div className={classes.bottomNavItem}>
                <Lens className={classes.bottomNavIcon}/>
                <Typography variant="caption" color="textSecondary">
                  Eat
                </Typography>
              </div>
              <div className={classes.bottomNavItem}>
                <Lens className={classes.bottomNavIcon}/>
                <Typography variant="caption" color="textSecondary">
                  Check in
                </Typography>
              </div>
            </div>
          </div>
          <div
            className={classes.phoneImg}
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/4uTcj5tdJCSd6Go7WZFw72wAT0MLcdBh9vFh7MYjCDL9A4mqJZs-pdrZ4QwSLsmlicjYQzMhK-whqe-Ghw=s0-rp")`
            }}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(PhoneFrame);
