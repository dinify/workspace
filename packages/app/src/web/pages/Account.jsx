import React from 'react';
import R from 'ramda';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { getClaims } from '@dinify/common/dist/ducks/auth/selectors';
import { withStateHandlers } from 'recompose';
import { languages } from '@dinify/common/dist/lib';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import OpenInNew from '@material-ui/icons/OpenInNewRounded';
import ArrowUpward from '@material-ui/icons/ArrowUpwardRounded';
import Delete from '@material-ui/icons/DeleteRounded';
import Person from '@material-ui/icons/PersonRounded';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import LanguagePickerDialog from '@dinify/common/dist/components/dialogs/LanguagePickerDialog';
import CurrencyPickerDialog from '@dinify/common/dist/components/dialogs/CurrencyPickerDialog';
import Image from 'web/components/Image';
import Flag from '@dinify/common/dist/components/Flag';
import Card from 'web/components/Card';
import countries from '@dinify/common/dist/lib/countries';
import CashMultiple from '@dinify/common/dist/icons/CashMultiple';

const styles = theme => ({
  typeChip: {
    height: 24,
    borderRadius: 12,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'center'
  },
  manager: {
    backgroundColor: theme.palette.primary.main,
    color: 'rgba(255, 255, 255, 1)',
  },
  waiter: {
    backgroundColor: theme.palette.secondary.main,
    color: 'rgba(255, 255, 255, 1)',
  }
});

const getLang = langtag => {
  let result = null;
  languages.forEach(lang => {
    lang.countries.forEach(country => {
      if (country.langtag === langtag) {
        result = {
          ...lang,
          country: {
            ...country,
            name: countries[country.regionCode]
          }
        };
      }
    });
  });
  return result;
}

const openInNewTab = (url) => {
  const win = window.open(url, '_blank');
  win.focus();
}

const Account = ({
  classes,
  user,
  profile,
  firebase,
  claims,
  dispatch,
  dialogType,
  langDialogOpen,
  currencyDialogOpen,
  openDialog,
  closeDialog,
  initialSelectedLanguage,
  ...other
}) => {

  if (user.isEmpty || !user.isLoaded) return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: 'calc(100vh - 113px)',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress />
    </div>
  );

  const { t } = useTranslation();
  let primaryLang;
  if (profile && profile.language) primaryLang = getLang(profile.language.primary);

  let displayCurrency;
  if (profile && profile.displayCurrency) displayCurrency = profile.displayCurrency;

  return (
    <div style={{
      maxWidth: 660,
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingLeft: 16,
      paddingRight: 16,
    }}>
      <div style={{
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Avatar style={{width: 96, height: 96}}>
          {user.photoURL ?
            <Image aspect={1} image={user.photoURL} title={user.displayName} /> :
            <Person style={{width: 56, height: 56}} />
          }
        </Avatar>
        <Typography style={{marginTop: 8}} variant="h5">
          {user.displayName}
        </Typography>
        <Typography variant="subtitle1">
          {user.email}
        </Typography>
      </div>

      <Typography variant="overline" color="textSecondary">
        {t('profile')}
      </Typography>
      <Card>
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          {t('currency.title')}
        </Typography>
        {displayCurrency && <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={() => {openDialog('currency')}}>
          <ListItemIcon>
            <CashMultiple />
          </ListItemIcon>
          <ListItemText primary={displayCurrency} secondary={displayCurrency} />
          <ChevronRight />
        </ListItem>}
        {!displayCurrency && <div style={{padding: '0 24px 16px 24px'}}>
          <Typography variant="body2">
            {t('currency.original')}
          </Typography>
          <Button onClick={() => {openDialog('currency')}} variant="text" color="primary">
            {t('currency.set')}
          </Button>
        </div>}
        <Divider />
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          {t('language.default')}
        </Typography>
        {primaryLang && <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={() => {openDialog('primary', primaryLang.code)}}>
          <ListItemIcon>
            <Flag country={primaryLang.country.regionCode}/>
          </ListItemIcon>
          <ListItemText primary={primaryLang.name} secondary={primaryLang.country.nameNative} />
          <ChevronRight />
        </ListItem>}
        {!primaryLang && <div style={{padding: '16px 24px'}}>
          <Button onClick={() => {openDialog('primary')}} variant="text" color="primary">
            {t('language.setPrimary')}
          </Button>
        </div>}
        <Divider />
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          {t('language.other')}
        </Typography>
        {profile.language && profile.language.other.map((lang, i) => {
          const language = getLang(lang);
          return <ListItem key={language.country.langtag} style={{paddingLeft: 24, paddingRight: 24}}>
            <ListItemIcon>
              <Flag country={language.country.regionCode}/>
            </ListItemIcon>
            <ListItemText primary={language.name} secondary={language.country.nameNative} />
            <IconButton onClick={() => {
              const other = R.remove(i, 1, profile.language.other);
              firebase.updateProfile({
                language: {
                  ...profile.language,
                  other
                }
              });
            }}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => {
              const other = profile.language.other;
              const tmp = other[i];
              other[i] = profile.language.primary;
              firebase.updateProfile({
                language: {
                  primary: tmp,
                  other
                }
              });
            }}>
              <ArrowUpward />
            </IconButton>
          </ListItem>;
        })}
        <div style={{padding: '16px 24px'}}>
          <Button onClick={() => {openDialog('other')}} variant="text" color="primary">
            {t('language.addOther')}
          </Button>
        </div>
      </Card>
      {claims && claims.roles && (
        <Card style={{marginTop: 16}}>
          <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
            {t('roles.title')}
          </Typography>

          {claims.roles.restaurant && (
            <div>
              <ListItem style={{paddingLeft: 24, paddingRight: 24}}>
                <Avatar className={classes[claims.roles.restaurant.type]}>
                  <Person />
                </Avatar>
                <ListItemText primary={t(`roles.${claims.roles.restaurant.type}`)} secondary="at Korea Grill" />
              </ListItem>
              <ListItem button onClick={() => {openInNewTab('https://dashboard.dinify.app/')}} style={{paddingLeft: 80, paddingRight: 24}}>
                <ListItemText primary={t('dashboard')}/>
                <OpenInNew style={{opacity: 0.54}}/>
              </ListItem>
              <ListItem button onClick={() => {openInNewTab('https://waiterboard.dinify.app/')}} style={{paddingLeft: 80, paddingRight: 24}}>
                <ListItemText primary={t('waiterboard')}/>
                <OpenInNew style={{opacity: 0.54}}/>
              </ListItem>
            </div>
          )}
        </Card>
      )}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 16}}>
        <Button variant="outlined" onClick={() => {
          firebase.logout();
        }} color="primary">
          {t('user.logOut')}
        </Button>
      </div>

      <CurrencyPickerDialog
        open={currencyDialogOpen}
        onClose={(currencyCode) => {
          console.log('Selected currency: ', currencyCode);
          closeDialog();
        }}/>

      <LanguagePickerDialog
        open={langDialogOpen}
        initialSelectedLanguage={initialSelectedLanguage}
        onClose={(langtag) => {
          if (langtag) {
            if (dialogType === 'primary') {
              firebase.updateProfile({
                language: {
                  ...profile.language,
                  primary: langtag,
                }
              });
            }
            else if (dialogType === 'other') {
              const other = profile.language.other;
              other.push(langtag);
              firebase.updateProfile({
                language: {
                  ...profile.language,
                  other
                }
              });
            }
          }
          closeDialog()
        }}/>
    </div>
  );
};

const enhance = compose(
  withFirebase,
  withStyles(styles),
  withStateHandlers(
    () => ({
      langDialogOpen: false,
      currencyDialogOpen: true,
      dialogType: null,
      initialSelectedLanguage: null
    }),
    {
      openDialog: () => (type, initialSelectedLanguage) => {
        if (type === 'currency') return {
          currencyDialogOpen: true
        };

        return {
          langDialogOpen: true,
          dialogType: type,
          initialSelectedLanguage
        };
      },
      closeDialog: () => () => ({
        langDialogOpen: false,
        currencyDialogOpen: false,
        dialogType: null,
        initialSelectedLanguage: null
      }),
    }
  ),
  connect(
    state => ({
      user: state.firebase.auth,
      profile: state.firebase.profile,
      claims: getClaims(state),
    })
  )
)

export default enhance(Account);
