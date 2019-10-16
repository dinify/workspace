import React from 'react';
import remove from 'ramda/es/remove';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { withStyles } from '@material-ui/core/styles';
import { getClaims } from '@dinify/common/dist/ducks/auth/selectors';
import { withStateHandlers } from 'recompose';
import { languageCountries as languages } from '@dinify/common/dist/lib';
import { toggleThemeAction, setLocaleAction } from 'ducks/ui/actions';
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
import IconButton from '@material-ui/core/IconButton';
import LanguagePickerDialog from '@dinify/common/dist/components/dialogs/LanguagePickerDialog';
import CurrencyPickerDialog from '@dinify/common/dist/components/dialogs/CurrencyPickerDialog';
import LightbulbToggle from 'web/components/LightbulbToggle';
// import Flag from '@dinify/common/dist/components/Flag';
import Card from 'web/components/Card';
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
  owner: {
    backgroundColor: theme.palette.primary.main,
    color: 'rgba(255, 255, 255, 1)',
  },
  manager: {
    backgroundColor: theme.palette.primary.main,
    color: 'rgba(255, 255, 255, 1)',
  },
  waiter: {
    backgroundColor: theme.palette.secondary.main,
    color: 'rgba(255, 255, 255, 1)',
  },
  button2: {
    ...theme.typography.button2
  }
});

const getLang = (languageId) => {
  let result = null;
  languages.forEach(lang => {
    if (languageId === lang.code) {
      result = {
        ...lang,
        nameEnglish: lang.name,
      };
    }
  });
  return result;
}

const Account = ({
  classes,
  theme,
  toggleTheme,
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
  restaurantsMap,
  style,
  setLocale,
  ...other
}) => {
  const { t, cldr } = useTranslation();
  const locale = cldr.General.locale();
  let primaryLang;
  if (profile && profile.language) primaryLang = getLang(profile.language.primary);

  let displayCurrency;
  if (profile && profile.displayCurrency) displayCurrency = profile.displayCurrency;

  return (
    <>
      <Typography variant="overline" color="textSecondary" style={{marginBottom: 8}}>
        {t('nav.settings')}
      </Typography>
      <Card>
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          {t('theme.title')}
        </Typography>
        <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={toggleTheme}>
          <ListItemIcon>
            <LightbulbToggle onChange={toggleTheme} checked={theme === 'light'} theme={theme}/>
          </ListItemIcon>
          <ListItemText 
            primary={t(theme === 'light' ? 'theme.nightModeOn' : 'theme.nightModeOff')} 
            secondary={t(theme === 'light' ? 'toggle.off' : 'toggle.on')} />
        </ListItem>
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          {t('currency.title')}
        </Typography>
        {displayCurrency && <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={() => {openDialog('currency')}}>
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
          <Button className={classes.button2} onClick={() => {openDialog('currency')}} variant="text" color="primary">
            {t('currency.set')}
          </Button>
        </div>}
        <Divider />
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          {t('language.default')}
        </Typography>
        {primaryLang && <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={() => {openDialog('primary', primaryLang.code.split('-')[0])}}>
          <ListItemText primary={primaryLang.nameNative} />
          <ChevronRight color="action"/>
        </ListItem>}
        {!primaryLang && <div style={{padding: '16px 24px'}}>
          <Button className={classes.button2} onClick={() => {openDialog('primary')}} variant="text" color="primary">
            {t('language.setPrimary')}
          </Button>
        </div>}
        <Divider />
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          {t('language.other')}
        </Typography>
        {profile.language && profile.language.other.map((lang, i) => {
          const language = getLang(lang);
          return <ListItem key={language.code} style={{paddingLeft: 24, paddingRight: 24}}>
            <ListItemText primary={language.nameNative} />
            <IconButton onClick={() => {
              const other = remove(i, 1, profile.language.other);
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
          <Button className={classes.button2} onClick={() => {openDialog('other')}} variant="text" color="primary">
            {t('language.addOther')}
          </Button>
        </div>
      </Card>

      <CurrencyPickerDialog
        locale={locale}
        open={currencyDialogOpen}
        onClose={(currencyCode) => {
          if (currencyCode) {
            if (currencyCode.clear) firebase.updateProfile({
              displayCurrency: null
            });
            else firebase.updateProfile({
              displayCurrency: currencyCode
            });
          }
          closeDialog();
        }}/>

      <LanguagePickerDialog
        locale={locale}
        open={langDialogOpen}
        initialSelectedLanguage={initialSelectedLanguage}
        onClose={(langtag) => {
          if (langtag) {
            if (dialogType === 'primary') {
              setLocale(langtag);
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
    </>
  );
};

const enhance = compose(
  withFirebase,
  withStyles(styles),
  withStateHandlers(
    () => ({
      langDialogOpen: false,
      currencyDialogOpen: false,
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
      restaurantsMap: state.restaurant.all,
      theme: state.ui.theme,
    }),
    {
      toggleTheme: toggleThemeAction,
      setLocale: setLocaleAction
    }
  )
)

export default enhance(Account);
