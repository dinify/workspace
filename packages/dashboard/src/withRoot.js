import React from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getTheme } from "@dinify/common/src/theme";

function withRoot(Component) {
  // const lightTheme = getTheme(false);
  const darkTheme = getTheme({ type: 'dark' });
  function WithRoot(props) {
    const stylePath = `/autofill-${props.theme}.css`;
    return (
      <MuiThemeProvider theme={darkTheme}>
        <link rel="stylesheet" type="text/css" href={stylePath} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}

export default withRoot;
