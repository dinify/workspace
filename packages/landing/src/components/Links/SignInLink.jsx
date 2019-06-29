import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import linksStyle from './linksStyle';

const SignInLink = ({classes, ...other}) => {
  return (
    <ListItem
      button
      style={{ borderRadius: 8 }}
      variant="outlined"
      onClick={() => {window.open("https://m.dinify.app/signin", "_blank")}}
      {...other}
    >
      <Typography className={classes.button2}>
        Sign in
      </Typography>
    </ListItem>
  );
}

export default withStyles(linksStyle)(SignInLink);
