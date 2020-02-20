
import { Theme, createMuiTheme } from '@material-ui/core/styles';
import { getTypographyVariants } from "./util";
import { PaletteType } from '@material-ui/core';
import * as themeLocales from '@material-ui/core/locale';
import { Locale, LocaleMatcher } from '@phensley/cldr';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

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
const DinifyRed = {
  50: "#FDECEF",
  100: "#FBD0D6",
  200: "#EA9FA2",
  300: "#DF7B7E",
  400: "#EA5E5F",
  500: "#EF5048",
  600: "#E14846",
  700: "#CE3F40",
  800: "#C13939",
  900: "#B1312F"
};

export interface AppTheme extends Theme {
  coupertino: {
    backdropFilter: string,
    backgroundColor: string,
    borderColor: string,
    borderThickColor: string,
  },
}

const spec = [
  'en-US',
  'az-AZ',
  'bg-BG',
  'ca-ES',
  'zh-CN',
  'cs-CZ',
  'nl-NL',
  'et-EE',
  'fi-FI',
  'fr-FR',
  'de-DE',
  'hu-HU',
  'is-IS',
  'id-ID',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'fa-IR',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru-RU',
  'sk-SK',
  'es-ES',
  'sv-SE',
  'tr-TR',
  'uk-UA',
  'vi-VN'
];

const localeMatcher = new LocaleMatcher(spec);

export const getThemeOptions = (type: PaletteType = 'light'): ThemeOptions => {
  const dark = type === 'dark';
  return {
    palette: {
      type,
      primary: {
        light: DinifyRed[600],
        main: DinifyRed[800],
        dark: DinifyRed[900],
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
    shape: {
      borderRadius: 8
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
    props: {
      MuiTypography: {
        variant: 'body2'
      },
      MuiButtonBase: {
        // TODO: disable ripple on iOS
        // disableRipple: true,
      },
      MuiFilledInput: {
        disableUnderline: true
      }
    },
    overrides: {
      MuiButton: {
        root: {
          minHeight: 36,
        },
        label: {
          ...nextVariants['button2']
        }
      },
      MuiButtonBase: {
        root: {
          boxShadow: 'none !important'
        }
      },
      MuiSnackbarContent: {
        root: {
          margin: 8,
          borderRadius: 8
        }
      },
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
        root: nextVariants['caption'] as any,
        filled: {
          transform: 'translate(12px, 18px) scale(1.333)',
          '&$shrink': {
            transform: 'translate(12px, 10px) scale(1)',
            '&$marginDense': {
              transform: 'translate(12px, 7px) scale(1)'
            }
          }
        }
      }
    }
  };
};

// from: https://material.io/design/color/dark-theme.html
// TODO: desaturate primary color to meet WCAG 4.5:1
export const getTheme = ({ locale, type = 'light' }: { locale: Locale, type: PaletteType }): AppTheme => {
  const dark = type === 'dark';
  const format = (str: string) => str.replace('-', '');
  const match = format(localeMatcher.match(locale.id).locale.id);

  const themeOptions = getThemeOptions(type);

  let theme = createMuiTheme(
    themeOptions,
    (themeLocales as any)[match]
  );

  return {
    ...theme,
    coupertino: {
      backdropFilter: 'saturate(180%) blur(20px)',
      backgroundColor: dark ? 'rgba(29,29,31,0.7)' : 'rgba(255,255,255,0.7)',
      borderColor: dark ? 'rgba(66,66,69,0.7)' : 'rgba(29, 29, 31, 0.1)',
      borderThickColor: dark ? 'rgba(66,66,69,0.95)' : 'rgba(29, 29, 31, 0.2)',
    }
  };
};
