import React from 'react';
import { connect } from 'react-redux';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
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

const getThemeOld = dark => createMuiTheme(
  {
    palette: {
      type: dark ? 'dark' : 'light',
      primary: {
        light: '#E14846', // primary_600
        main: '#C13939', // primary_800
        dark: '#B1312F', // primary_900
      },
      secondary: {
        light: blueGrey[300],
        main: blueGrey[500],
        dark: blueGrey[700],
      },
      text: {
        primary: dark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.72)',
        secondary: dark ? 'rgba(255, 255, 255, 0.54)' : 'rgba(0, 0, 0, 0.38)',
      },
    },
    typography: {
      useNextVariants: true,
      // System font stack
      /* fontFamily: [
        'Lato',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','), */
    },
    overrides: {
      MuiInputBase: {
        root: {
          [`& > input:-webkit-autofill,
            & > input:-webkit-autofill:hover,
            & > input:-webkit-autofill:focus`]: {
            WebkitTextFillColor: dark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.72)',
            WebkitBoxShadow: `0 0 0px 1000px rgba(0,0,0,0) inset !important`,
            WebkitTransitionDelay: '99999s',
            caretColor: dark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.72)',
          }
        }
      },
      MuiFilledInput: {
        root: {
          borderRadius: 4,
          overflow: 'hidden'
        },
        underline: {
          '&:before': {
            borderBottom: 'none',
          },
          '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: 'none',
          },
        }
      }
    }
  },
);

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
