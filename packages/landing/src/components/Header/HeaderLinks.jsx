/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewDay from "@material-ui/icons/ViewDay";
import Dns from "@material-ui/icons/Dns";
import Build from "@material-ui/icons/Build";
import ListIcon from "@material-ui/icons/List";
import People from "@material-ui/icons/People";
import Assignment from "@material-ui/icons/Assignment";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Chat from "@material-ui/icons/Chat";
import Call from "@material-ui/icons/Call";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccountBalance from "@material-ui/icons/AccountBalance";
import ArtTrack from "@material-ui/icons/ArtTrack";
import ViewQuilt from "@material-ui/icons/ViewQuilt";
import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Store from "@material-ui/icons/Store";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Layers from "@material-ui/icons/Layers";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";

import OpenInNew from "@material-ui/icons/OpenInNewRounded";
import LogoIcon from "@dinify/common/dist/icons/Logo";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import headerLinksStyle from "./headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    var targetScroll = document.getElementById(target);
    var to = targetScroll.offsetTop + window.innerHeight - 56;
    if (window.scrollTo !== undefined) {
      e.preventDefault();
      window.scrollTo({
        top: to,
        behavior: 'smooth'
      });
    }
    else {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        scrollSpeed(to);
      }
    }
  };

  const scrollSpeed = (to) => {
    const speed = 4; // px / ms
    const pixels = Math.abs(document.documentElement.scrollTop - to);
    scrollGo(document.documentElement, to, pixels / speed);
  }

  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      startTime = new Date().getTime(),
      delta = 0,
      currentTime = new Date().getTime();

    var animateScroll = function() {
      currentTime = new Date().getTime();
      delta = currentTime - startTime;
      var val = easeInOutQuad(delta, start, change, duration);
      element.scrollTop = val;
      if (delta < duration) {
        requestAnimationFrame(animateScroll);
      }
      else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { classes, width, dropdownHoverColor } = props;

  if (isWidthDown('sm', width)) {
    return (
      <List style={{ marginTop: 4 }}>
        <ListItem
          button
          style={{ borderRadius: 8 }}
          href="#features"
          onClick={(e) => {smoothScroll(e, 'features')}}
          disableRipple
        >
          <Typography className={classes.button2}>
            Features
          </Typography>
        </ListItem>
        <ListItem
          button
          style={{ borderRadius: 8 }}
          href="#steps"
          onClick={(e) => {smoothScroll(e, 'steps')}}
          disableRipple
        >
          <Typography className={classes.button2}>
            How it works
          </Typography>
        </ListItem>
        <ListItem
          button
          style={{ borderRadius: 8 }}
          href="#mailing-list"
          onClick={(e) => {smoothScroll(e, 'mailing-list')}}
          disableRipple
        >
          <Typography className={classes.button2}>
            Contact us
          </Typography>
        </ListItem>
        <Divider color="textSecondary" style={{ marginTop: 16, marginBottom: 16 }} />
        <ListItem
          button
          style={{ borderRadius: 8 }}
          onClick={() => {window.open("https://blog.dinify.app", "_blank")}}
          disableRipple
        >
          <OpenInNew className={classes.textSecondary} style={{ marginRight: 8, fontSize: 16 }}/>
          <Typography className={classes.button2}>
            Blog
          </Typography>
        </ListItem>
        <ListItem
          button
          style={{ borderRadius: 8 }}
          variant="outlined"
          onClick={() => {window.open("https://dashboard.dinify.app/signin", "_blank")}}
        >
          <LogoIcon style={{ marginRight: 8, fontSize: 16 }} className={classes.textSecondary}/>
          <Typography className={classes.button2}>
            Dashboard
          </Typography>
        </ListItem>
      </List>
    );
  }
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.button2}
          href="#features"
          onClick={(e) => {smoothScroll(e, 'features')}}
          disableRipple
        >
          Features
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.button2}
          href="#steps"
          onClick={(e) => {smoothScroll(e, 'steps')}}
          disableRipple
        >
          How it works
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.button2}
          href="#mailing-list"
          onClick={(e) => {smoothScroll(e, 'mailing-list')}}
          disableRipple
        >
          Contact us
        </Button>
      </ListItem>
      <ListItem className={classes.listItem} style={{ paddingLeft: 8, paddingRight: 8, marginRight: -16 }}>
        <Typography color="textSecondary">•</Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.button2}
          href="https://blog.dinify.app"
          target="_blank"
          rel="noopener noreferrer"
          disableRipple
        >
          Blog
          <OpenInNew style={{ marginLeft: 4, fontSize: 16 }}/>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          variant="outlined"
          className={classes.button2}
          href="https://dashboard.dinify.app/signin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoIcon style={{ marginRight: 8, fontSize: 16 }} />
          Dashboard
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

export default withWidth()(withStyles(headerLinksStyle)(HeaderLinks));



// WEBPACK FOOTER //
// ./src/components/Header/HeaderLinks.jsx
