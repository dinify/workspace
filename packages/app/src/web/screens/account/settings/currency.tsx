import React from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import CashMultiple from '@dinify/common/src/icons/CashMultiple';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { RootState } from 'typesafe-actions';
import { openDialogAction } from '../../../../features/ui/actions';
import { useAction } from '@dinify/common/src/lib/util';

export default () => {
  const { t, cldr } = useTranslation();
  const openDialog = useAction(openDialogAction);
  const firebase = useFirebase();
  const displayCurrency = useSelector(
    (state: RootState) => state.firebase.profile.displayCurrency,
  );

  const handleCurrency = (result: any) => {
    if (result) {
      if (result.clear)
        firebase.updateProfile({
          displayCurrency: null,
        });
      else
        firebase.updateProfile({
          displayCurrency: result,
        });
    }
  };

  const openCurrencyDialog = () => {
    openDialog({
      type: 'currency',
      handler: handleCurrency,
    });
  };
  // TODO className={classes.button2}
  return (
    <>
      <Typography
        style={{ padding: '16px 24px' }}
        variant="subtitle2"
        color="textSecondary"
      >
        {t('currency.title')}
      </Typography>
      {displayCurrency && (
        <ListItem
          style={{ paddingLeft: 24, paddingRight: 24 }}
          button
          onClick={openCurrencyDialog}
        >
          <ListItemIcon>
            <CashMultiple />
          </ListItemIcon>
          <ListItemText
            primary={cldr.Numbers.getCurrencyDisplayName(displayCurrency, {
              context: 'standalone',
            })}
            secondary={displayCurrency}
          />
          <ChevronRight color="action" />
        </ListItem>
      )}
      {!displayCurrency && (
        <div style={{ padding: '0 24px 16px 24px' }}>
          <Typography variant="body2">{t('currency.original')}</Typography>
          <Button onClick={openCurrencyDialog} variant="text" color="primary">
            {t('currency.set')}
          </Button>
        </div>
      )}
    </>
  );
};
