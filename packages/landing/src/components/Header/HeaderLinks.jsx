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

let currentAnimFrame = null;

function HeaderLinks({ ...props }) {
  const { classes, width, dropdownHoverColor, scrollingElement, onScrollFrame, children } = props;

  var onClickSections = {};

  if (isWidthDown('sm', width)) {
    return (
      <List style={{ marginTop: 4 }}>
        {children}
      </List>
    );
  }
  return (
    <List className={classes.list}>
      {children}
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
