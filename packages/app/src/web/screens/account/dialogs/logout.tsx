import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Button from '@material-ui/core/Button';
import { useFirebase } from 'react-redux-firebase';

export default (props: any) => {
  const { onClose } = props;
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const firebase = useFirebase();
  const logoutHandler = () => {
    setDisabled(true);
    firebase.logout().then(() => {
      onClose();
      // setDisabled(true);
    });
  };
  return (
    <Dialog {...props}>
      <DialogTitle id="alert-dialog-title">{t('dialogs.logOut.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('dialogs.logOut.message')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} onClick={logoutHandler} color="primary">
          {t('user.logOut')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
