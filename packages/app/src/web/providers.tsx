import React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getTheme } from "@dinify/common/src/theme";

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
export const lightTheme = getTheme({ type: 'light' });
export const darkTheme = getTheme({ type: 'dark' });

export function withRoot(Component: any) {
  
  function WithRoot(props: any) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    // eslint-disable-next-line react/destructuring-assignment
    const theme = props.theme === 'light' ? lightTheme : darkTheme;
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return connect((state: any) => ({
    theme: state.ui.theme,
  }), {}
  )(WithRoot);
}
