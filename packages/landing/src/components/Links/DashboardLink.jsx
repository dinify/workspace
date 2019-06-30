import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import LogoIcon from "@dinify/common/dist/icons/Logo";

import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/styles';

const DashboardLink = ({...other}) => {
  const theme = useTheme();
  return (
    <ListItem
      button
      style={{ borderRadius: 8 }}
      variant="outlined"
      onClick={() => {window.open("https://dashboard.dinify.app/signin", "_blank")}}
      {...other}
    >
      <LogoIcon style={{ marginRight: 8, fontSize: 16, ...theme.palette.text.secondary}}/>
      <Typography style={{ ...theme.typography.button2 }}>
        Dashboard
      </Typography>
    </ListItem>
  );
}

export default DashboardLink;
