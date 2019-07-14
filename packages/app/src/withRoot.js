import React from 'react';
import { connect } from 'react-redux';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getTheme from "@dinify/common/dist/theme";

// A theme with custom primary and secondary color.
// It's optional.
/*
primary_50     #FDECEF
primary_100    #FBD0D6
primary_200    #EA9FA2
primary_300    #DF7B7E
primary_400    #EA5E5F
primary_500    #EF5048
primary_600    #E14846
primary_700    #CE3F40
primary_800    #C13939
primary_900    #B1312F
*/

function withRoot(Component) {
  const lightTheme = getTheme({ type: 'light' });
  const darkTheme = getTheme({ type: 'dark' });
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    // eslint-disable-next-line react/destructuring-assignment
    const theme = props.theme === 'light' ? lightTheme : darkTheme;
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
  return connect(state => ({
      theme: state.ui.theme,
    }), { }
  )(WithRoot);
}

export default withRoot;
