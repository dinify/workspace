// @flow
import React from 'react';
import uniqueId from 'lodash.uniqueid';
import { connect } from 'react-redux';
import Snackbar from 'web/components/Snackbar';
import { hideSnackbar as hideSnackbarAction } from 'ducks/notifications/actions';

const SnackbarDispatcher = ({
  historyPush,
  snackbars,
  hideSnackbar
}) => {
  return (
    <div>
      {snackbars.map((s) =>
        <Snackbar
          key={s.id}
          snackbarObject={s}
          historyPush={historyPush}
          hideSnackbar={hideSnackbar}
        />
      )}
    </div>
  )
}

export default connect(
  (state) => ({
    snackbars: state.notifications.snackbars
  }), {
    hideSnackbar: hideSnackbarAction,
  }
)(SnackbarDispatcher);
