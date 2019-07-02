import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import * as types from './types';

const onCreateFailSnackbarsEpic = (action$) =>
  action$.pipe(
    ofType(types.CREATE_OPTION_FAIL),
    map(() => snackbar.show({
      message: window.i18nInstance.t('createOptionFail')
    }))
  );

export default [
  onCreateFailSnackbarsEpic
]
