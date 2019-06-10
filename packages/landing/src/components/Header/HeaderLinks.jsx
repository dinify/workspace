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
  const { classes, width, dropdownHoverColor, scrollingElement, onScrollFrame, menuItems } = props;

  var onClickSections = {};

  if (isWidthDown('sm', width)) {
    return (
      <List style={{ marginTop: 4 }}>

        {menuItems.map((item, i) => 
          <ListItem
            button
            style={{ borderRadius: 8 }}
            href={'#' + item.anchor}
            disableRipple
          >
            <Typography className={classes.button2}>
              {item.name}
            </Typography>
          </ListItem>          
        )}

        <Divider color="textSecondary" style={{ marginTop: 16, marginBottom: 16 }} />

        {/*<ListItem
          button
          style={{ borderRadius: 8 }}
          onClick={() => {window.open("https://blog.dinify.app", "_blank")}}
          disableRipple
        >
          <OpenInNew className={classes.textSecondary} style={{ marginRight: 8, fontSize: 16 }}/>
          <Typography className={classes.button2}>
            Blog
          </Typography>
        </ListItem>*/}

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

      {menuItems.map((item, i) => 
        <ListItem
          className={classes.listItem}
        >
          <Button
            className={classes.button2}
            href={'#' + item.anchor}
            disableRipple
          >
            {item.name}
          </Button>
        </ListItem>          
      )}

      {/*

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
      */}


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
