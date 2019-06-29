import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import headerLinksStyle from "./headerLinksStyle.jsx";

const HeaderLink = ({classes, anchor, name, ...other}) => (
  <ListItem
    className={classes.listItem}
    {...other}
  >
    <Button
      className={classes.button2}
      href={'#' + anchor}
      disableRipple
    >
      {name}
    </Button>
  </ListItem>
);

export default withStyles(headerLinksStyle)(HeaderLink);
