
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
      },
      typography: {
        useNextVariants: true,
        ...nextVariants
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
    }
  );
};

export default getTheme;
