import React from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import CashMultiple from '@dinify/common/src/icons/CashMultiple';
import { useStore } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { RootState } from 'typesafe-actions';
import { openDialogAction } from '../../../../ducks/ui/actions';

export default () => {
  const { t, cldr } = useTranslation();
  const store = useStore();
  const firebase = useFirebase();
  const state: RootState = store.getState();
  const { displayCurrency } = state.firebase.profile;

  const handleCurrency = (result: any) => {
    if (result) {
      if (result.clear) firebase.updateProfile({
        displayCurrency: null
      });
      else firebase.updateProfile({
        displayCurrency: result
      });
    }
  };

  const openDialog = () => {
    store.dispatch(openDialogAction({
      type: 'currency',
      handler: handleCurrency
    }));
  };
  // TODO className={classes.button2}
  return <>
    <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
      {t('currency.title')}
    </Typography>
    {displayCurrency && <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={openDialog}>
      <ListItemIcon>
        <CashMultiple />
      </ListItemIcon>
      <ListItemText primary={cldr.Numbers.getCurrencyDisplayName(displayCurrency, { context: 'standalone' })} secondary={displayCurrency} />
      <ChevronRight color="action"/>
    </ListItem>}
    {!displayCurrency && <div style={{padding: '0 24px 16px 24px'}}>
      <Typography variant="body2">
        {t('currency.original')}
      </Typography>
      <Button onClick={openDialog} variant="text" color="primary">
        {t('currency.set')}
      </Button>
    </div>}
  </>;
};
