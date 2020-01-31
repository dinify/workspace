import { getTheme } from '@dinify/common/src/theme';
import { useSelector } from "react-redux";
import { RootState } from 'typesafe-actions';
import { PaletteType } from '@material-ui/core';

export const useTheme = (props: { invert: boolean } = { invert: false }) => {
  const type = usePaletteType(props);
  return getTheme({ type });
};

export const usePaletteType = (props: { invert: boolean } = { invert: false }) => {
  return useSelector<RootState, PaletteType>(state => {
    let type: PaletteType = state.ui.theme;
    if (props && props.invert) type = type === 'light' ? 'dark' : 'light';
    return type;
  });
};