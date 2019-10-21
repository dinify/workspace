import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import OpenInNew from "@material-ui/icons/OpenInNewRounded";

import { withStyles } from '@material-ui/core/styles';
import linksStyle from './linksStyle';
import { useTranslation } from '@dinify/common/src/lib/i18n';

const SignInLink = ({classes, ...other}) => {
  const { t } = useTranslation();
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
        {t('user.signIn')}
      </Button>
    </ListItem>
  );
}

export default withStyles(linksStyle)(SignInLink);
