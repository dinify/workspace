import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';

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
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#E14846',  // primary_600
      main: '#C13939',   // primary_800
      dark: '#B1312F', // primary_900
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.72)'
    }
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
