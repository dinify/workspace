import React from "react";
import { withStyles, AppBar, Toolbar, Hidden } from "@material-ui/core";
import { List, BugReport } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import Button from "components/CustomButtons/Button.jsx";

const style = theme => ({
  appBar: {
    color: "#fff",
    backgroundColor: "#00acc1 !important",
    boxShadow:
      "0 2px 2px 0 rgba(0,188,212,.14), 0 3px 1px -2px rgba(0,188,212,.2), 0 1px 5px 0 rgba(0,188,212,.12)"
  },
  title: {
    position: "relative",
    height: "50px",
    fontSize: "1.125rem",
    lineHeight: "46px",
    display: "inline-block",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "300",
    textDecoration: "none",
    "&,&:hover,&:focus": {
      color: "inherit"
    }
  },
  iconLink: {
    fontSize: "18px",
    textDecoration: "none",
    lineHeight: "20px",
    marginTop: "-4px",
    marginLeft: "12px",
    "&,&:hover,&:focus": {
      color: "inherit"
    }
  },
  rightLinks: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "12px",
    marginLeft: "12px",
    textDecoration: "none",
    display: "inline-block",
    position: "relative",
    "&,&:hover,&:focus": {
      color: "inherit"
    }
  },
  rightLinksText: {
    position: "relative",
    top: "-8px"
  },
  flex: {
    [theme.breakpoints.up("md")]: {
      flex: "1"
    }
  },
  block: {
    [theme.breakpoints.down("md")]: {
      display: "block"
    }
  }
});

class DocHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.block}>
          <div className={classes.flex}>
            <NavLink to="/" activeClassName="active" className={classes.title}>
              Material Kit Pro React
            </NavLink>
            <Hidden mdDown>
              <Button
                color="transparent"
                style={{ paddingRight: "12px", paddingLeft: "12px" }}
              >
                v1.3.0
              </Button>
              <a
                href="https://github.com/creativetimofficial/ct-material-kit-pro-react"
                className={classes.iconLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" />
              </a>
              <a
                href="https://twitter.com/CreativeTim"
                className={classes.iconLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter" />
              </a>
            </Hidden>
          </div>
          <div>
            <NavLink
              to="/"
              activeClassName="active"
              className={classes.rightLinks}
            >
              <List />{" "}
              <span className={classes.rightLinksText}>Live Preview</span>
            </NavLink>
            <a
              href="https://github.com/creativetimofficial/ct-material-kit-pro-react/issues"
              className={classes.rightLinks}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BugReport />{" "}
              <span className={classes.rightLinksText}>Report an issue</span>
            </a>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(style)(DocHeader);
