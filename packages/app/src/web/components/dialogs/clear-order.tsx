import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@material-ui/core';
import { useTranslation } from '@dinify/common/src/lib/i18n';

/**
 * Confirms the user whether to clear cart / order or add more items.
 */
export const ClearOrderDialog = ({
  onConfirm = () => { }, error = false, ...props }:
  { onConfirm?: (confirmed: boolean) => any, error?: boolean } & DialogProps
) => {
  // const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  let message = t('dialogs.clearOrder.message');
  if (error) message = `${t('dialogs.clearOrder.error')} ${t('dialogs.clearOrder.message')}`;
  return (
    <Dialog {...props}
      aria-labelledby="clear-order-dialog-title"
      aria-describedby="clear-order-dialog-description"
    >
      <DialogTitle id="clear-order-dialog-title">
        {t('dialogs.clearOrder.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="clear-order-dialog-description">
          <Typography component="span" variant="body2">
            {message}
          </Typography>
        </DialogContentText>
        {/* <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(evt) => setChecked(evt.target.checked)}
                color="primary"
              />
            }

            label={<Typography variant="body2">
              {t('dialogs.check')}
            </Typography>}
          />
        </FormGroup> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm(false)} color="primary">
          {t('dismiss')}
        </Button>
        <Button onClick={() => onConfirm(true)} color="primary" autoFocus>
          {t('dialogs.clearOrder.action')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};