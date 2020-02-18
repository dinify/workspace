import { useSelector } from "react-redux";
import { RootState } from 'typesafe-actions';
import { PaletteType } from '@material-ui/core';
import { getOrderItemCount } from '../cart/selectors';

export const usePaletteType = (props: { invert: boolean } = { invert: false }): PaletteType => {
  return useSelector<RootState, PaletteType>(state => {
    let type: PaletteType = state.ui.theme;
    if (props && props.invert) type = type === 'light' ? 'dark' : 'light';
    return type;
  });
};

export const useBottomBarVisible = () => {
  return useSelector<RootState, boolean>(state => {
    return getOrderItemCount(state.cart) + state.transaction.orderItemsCount > 0
  });
}