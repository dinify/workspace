import React from 'react';
import Divider from "@material-ui/core/Divider";

const HeaderDivider = ({...other}) => (
  <Divider color="textSecondary" style={{ marginTop: 16, marginBottom: 16 }} {...other}/>
);

export default HeaderDivider;
