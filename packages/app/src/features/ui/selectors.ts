import { getTheme } from '@dinify/common/src/theme';
import { useSelector } from "react-redux";
import { RootState } from 'typesafe-actions';

export const useTheme = (props: { invert: boolean } = { invert: false }) => {
  return useSelector<RootState, any>(state => {
    let type = state.ui.theme;
    if (props && props.invert) type = type === 'light' ? 'dark' : 'light';
    return getTheme({ type });
  });
};