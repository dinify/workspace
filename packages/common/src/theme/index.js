
import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { getTypographyVariants } from "./util";

const nextVariants = getTypographyVariants({
  map: {
    headline1: "h1",
    headline2: "h2",
    headline3: "h3",
    headline4: "h4",
    headline5: "h5",
    headline6: "h6"
  }
});

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

// from: https://material.io/design/color/dark-theme.html
// TODO: desaturate primary color to meet WCAG 4.5:1

const getTheme = ({type = 'light'}) => {
  const dark = type === 'dark';

  // Rounded corners
  const shapeBorderRadius = 8;
  return createMuiTheme(
    {
      palette: {
        type,
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
        background: {
          paper: dark ? "#1d1d1d" : "#ffffff",
          default: dark ? "#212121" : "#ffffff"
        }
      },
      coupertino: {
        backdropFilter: 'saturate(180%) blur(20px)',
        backgroundColor: dark ? 'rgba(29,29,31,0.7)' : 'rgba(255,255,255,0.7)',
        borderColor: dark ? 'rgba(66,66,69,0.7)' : 'rgba(29, 29, 31, 0.1)',
        borderThickColor: dark ? 'rgba(66,66,69,0.95)' : 'rgba(29, 29, 31, 0.2)',
      },
      shape: {
        borderRadius: shapeBorderRadius
      },
      typography: {
        useNextVariants: true,
        fontFamily: [
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
        ].join(','),
        ...nextVariants
      },
      overrides: {
        MuiInputBase: {
          root: {
            ...nextVariants['body2'],
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
        MuiInputLabel: {
          root: nextVariants['caption'],
          filled: {
            transform: 'translate(12px, 18px) scale(1.333)',
            '&$shrink': {
              transform: 'translate(12px, 10px) scale(1)',
              '&$marginDense': {
                transform: 'translate(12px, 7px) scale(1)'
              }
            }
          }
        },
        MuiFilledInput: {
          root: {
            borderRadius: shapeBorderRadius,
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
    }
  );
};

export default getTheme;
