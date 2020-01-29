import React from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import { TResolver } from '../features/ui/actions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import { UiState } from '../features/ui/reducers';
import { RootState } from 'typesafe-actions';
import { hideSnackbarAction } from '../features/ui/actions';
import { Button } from '@material-ui/core';
import toPairs from 'ramda/es/toPairs';
import { useAction } from '@dinify/common/src/lib/util';

const defaultProps: Partial<SnackbarProps> = {
  autoHideDuration: 4000,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  TransitionComponent: Grow as any,
};

export default (props: any) => {
  const hideSnackbar = useAction(hideSnackbarAction);
  const { t } = useTranslation();
  const snackbars = useSelector<any, UiState['snackbars']>(
    state => state._ui.snackbars,
  );
  const fullScreenDialogOpen = useSelector<RootState, boolean>(state => {
    return (
      !!state.ui.dialogs['cart'] ||
      !!state.ui.dialogs['bill'] ||
      !!state.ui.dialogs['services']
    );
  });
  const getHandler = (id: string) => () => hideSnackbar(id);
  const interpolate = (s: string | TResolver) => {
    if (typeof s === 'string') return s;
    else return s(t);
  };

  return (
    <>
      {toPairs(snackbars).map(([id, snackbar]) => {
        let rest: any = {};
        const closeHandler = getHandler(id);
        if (snackbar.action) {
          const closeHandler = getHandler(id);
          const actionHandler = () => {
            if (snackbar.handler) snackbar.handler();
            closeHandler();
          };
          rest.action = [
            <Button
              key="undo"
              color="primary"
              size="small"
              onClick={actionHandler}
            >
              {interpolate(snackbar.action)}
            </Button>,
          ];
        }
        if (fullScreenDialogOpen) {
          rest.style = { bottom: 16 };
        }

        const messageComponent = (
          <span id={`${id}-message-id`}>{interpolate(snackbar.message)}</span>
        );

        return (
          <Snackbar
            {...props}
            {...defaultProps}
            key={id}
            open={!!snackbars[id].visible}
            onClose={closeHandler}
            ContentProps={{ 'aria-describedby': `${id}-message-id` }}
            message={messageComponent}
            {...rest}
          />
        );
      })}
    </>
  );
};

{
  /* <Snackbar
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
    /> */
}
