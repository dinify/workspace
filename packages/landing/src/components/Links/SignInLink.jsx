import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import OpenInNew from "@material-ui/icons/OpenInNewRounded";

import { withStyles } from '@material-ui/core/styles';
import linksStyle from './linksStyle';

const SignInLink = ({classes, ...other}) => {
  return (
    <ListItem
      className={classes.listItem}
      {...other}
    >
      <Button
        className={classes.button2}
        variant="outlined"
        onClick={() => {window.open("https://web.dinify.app/account/signin", "_blank")}}
        disableRipple
      >
        <OpenInNew style={{ fontSize: 16, marginRight: 4 }}/>
        Sign in
      </Button>
    </ListItem>
  );
}

export default withStyles(linksStyle)(SignInLink);
