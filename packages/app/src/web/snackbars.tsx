import React from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import { TResolver } from './ducks/ui/actions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { UiState } from '../ducks/ui/reducers';
import { RootState } from 'typesafe-actions';
import { Snackbar as SnackbarPayload, hideSnackbarAction, SnackbarType } from '../ducks/ui/actions';
import { Button } from '@material-ui/core';
import toPairs from 'ramda/es/toPairs';

const defaultProps: Partial<SnackbarProps> = {
  autoHideDuration: 4000,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  TransitionComponent: Grow
};

export default (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const snackbars = useSelector<RootState, UiState['snackbars']>(state => state.ui.snackbars);
  const fullScreenDialogOpen = useSelector<RootState, UiState['snackbars']>(state => {
    return !!state.ui.dialogs['cart'] || !!state.ui.dialogs['bill'];
  });
  const getHandler = (id: SnackbarType) => () => dispatch(hideSnackbarAction(id));
  const interpolate = (s: string|TResolver) => {
    if (typeof s === 'string') return s;
    else return s(t);
  };
  
  return (<>
    {toPairs(snackbars)
    .filter(([,v]) => v !== true)
    .map(([type, v]) => {
      let rest: any = {};
      const snackbar = v as SnackbarPayload;
      const closeHandler = getHandler(type as SnackbarType);
      if (snackbar.action) {
        const closeHandler = getHandler(type as SnackbarType);
        const actionHandler = () => {
          if (snackbar.handler) snackbar.handler();
          closeHandler();
        };
        rest.action = [
          <Button key="undo" color="primary" size="small" onClick={actionHandler}>
            {interpolate(snackbar.action)}
          </Button>
        ];
      }
      if (fullScreenDialogOpen) {
        rest.style = {bottom: 16};
      }

      const messageComponent = (
        <span id={`${type}-message-id`}>
          {interpolate(snackbar.message)}
        </span>
      );
      
      return (
        <Snackbar
          {...props}
          {...defaultProps}
          key={type}
          open={!!snackbars[type].visible}
          onClose={closeHandler}
          ContentProps={{ 'aria-describedby': `${type}-message-id` }}
          message={messageComponent}
          {...rest}
        />
      );
    })}
    
  </>);
}

{/* <Snackbar
      {...defaultProps}
      {...props}
      open={!!snackbars['test'] || true}
      onClose={getHandler('test')}
      ContentProps={{ 'aria-describedby': 'message-id' }}
      message={<span id="message-id">Note archived</span>}
      action={[
        <Button key="undo" color="primary" size="small" onClick={getHandler('test')}>
          UNDO
        </Button>
      ]}
    /> */}