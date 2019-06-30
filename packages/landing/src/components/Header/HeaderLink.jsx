import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import headerLinksStyle from "./headerLinksStyle.jsx";
import { NavContext } from "./HeaderLinks.jsx";

const HeaderLink = ({type, classes, anchor, name, ...other}) => {
  return (
    <NavContext.Consumer>
      {({ type }) => (
        <ListItem
          alignItems="center"
          style={{
            borderRadius: type === 'listItem' ? 8 : 0,
            height: 36,
            display: 'flex',
            alignItems: 'centers'
          }}
          button={type === 'listItem'}
          href={type === 'listItem' ? '#' + anchor : undefined}
          className={classes.listItem}
          {...other}
        >
          {type === 'listItem' && <Typography className={classes.button2}>
            {name}
          </Typography>}
          {type === 'link' && <Button
            style={{ height: type === 'listItem' ? 36 : undefined }}
            className={classes.button2}
            href={'#' + anchor}
            disableRipple
          >
            {name}
          </Button>}
        </ListItem>
      )}
    </NavContext.Consumer>
  );
};

export default withStyles(headerLinksStyle)(HeaderLink);
