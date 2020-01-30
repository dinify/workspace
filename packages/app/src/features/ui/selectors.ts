import { getTheme, AppTheme } from '@dinify/common/src/theme';
import { useSelector } from "react-redux";
import { RootState } from 'typesafe-actions';

export type ThemeType = 'light' | 'dark';

export const useTheme = (props: { type?: ThemeType, invert: boolean } = { invert: false }) => {
  return useSelector<RootState, AppTheme>(state => {
    let themeState = state.ui.theme;
    if (props && props.type) themeState = props.type;
    else if (props && props.invert) themeState = themeState === 'light' ? 'dark' : 'light';
    return getTheme({ type: themeState });
  });
};