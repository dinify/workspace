import React, { useState } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core';

/**
 * Confirms the user whether to clear cart / order or add more items.
 */
export const ClearOrderDialog = ({ 
  onConfirm = () => {}, ...props}: 
  { onConfirm?: (confirmed: boolean) => any} & DialogProps
) => {
  const [checked, setChecked] = useState(false);
  return (
    <Dialog {...props}
      aria-labelledby="clear-order-dialog-title"
      aria-describedby="clear-order-dialog-description"
    >
        <DialogTitle id="clear-order-dialog-title">
          Clear order?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="clear-order-dialog-description">
            <Typography component="span" variant="subtitle1">
              Would you like to clear your current order?
            </Typography>
          </DialogContentText>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(evt) => setChecked(evt.target.checked)}
                  color="primary"
                />
              }
              
              label={<Typography variant="body2">
                Don't show again
              </Typography>}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onConfirm(false)} color="primary">
            Dismiss
          </Button>
          <Button onClick={() => onConfirm(true)} color="primary" autoFocus>
            Clear order
          </Button>
        </DialogActions>
      </Dialog>
  );
};