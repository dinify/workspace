import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import { getClaims } from 'ducks/auth/selectors';
import { withStateHandlers } from 'recompose';
import { parseLanguages } from '@dinify/common/dist/lib/FN';
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
import Image from 'web/components/Image';
import Flag from '@dinify/common/dist/components/Flag';
import Card from 'web/components/Card';
import languagesRaw from '@dinify/common/dist/lib/languages';
import countries from '@dinify/common/dist/lib/countries';

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

const localizedType = {
  manager: 'Manager',
  waiter: 'Waiter'
}

const languages = parseLanguages(languagesRaw);

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
  langDialogOpen,
  setLangDialogOpen,
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

  let primaryLang;
  if (profile && profile.language) primaryLang = getLang(profile.language.primary);

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
        Profile
      </Typography>
      <Card>
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          Default language
        </Typography>
        {primaryLang && <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={() => {setLangDialogOpen(true)}}>
          <ListItemIcon>
            <Flag country={primaryLang.country.regionCode}/>
          </ListItemIcon>
          <ListItemText primary={primaryLang.name} secondary={primaryLang.country.nameNative} />
          <ChevronRight />
        </ListItem>}
        {!primaryLang && <div style={{padding: '16px 24px'}}>
          <Button onClick={() => {setLangDialogOpen(true, primaryLang.code)}} variant="text" color="primary">
            Set primary language
          </Button>
        </div>}
        <Divider />
        <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
          Other languages
        </Typography>
        {profile.language && profile.language.other.map(lang => {
          const language = getLang(lang);
          return <ListItem style={{paddingLeft: 24, paddingRight: 24}}>
            <ListItemIcon>
              <Flag country={language.country.regionCode}/>
            </ListItemIcon>
            <ListItemText primary={primaryLang.name} secondary={primaryLang.country.nameNative} />
            <IconButton onClick={() => {/* TODO: Remove this language from user's profile */}}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => {/* TODO: Swap this language with the primary one */}}>
              <ArrowUpward />
            </IconButton>
          </ListItem>;
        })}
        <div style={{padding: '16px 24px'}}>
          <Button onClick={() => {setLangDialogOpen(true)}} variant="text" color="primary">
            Add another language
          </Button>
        </div>
      </Card>
      {claims && claims.roles && (
        <Card style={{marginTop: 16}}>
          <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
            Roles
          </Typography>

          {claims.roles.restaurant && (
            <div>
              <ListItem style={{paddingLeft: 24, paddingRight: 24}}>
                <Avatar className={classes[claims.roles.restaurant.type]}>
                  <Person />
                </Avatar>
                <ListItemText primary={localizedType[claims.roles.restaurant.type]} secondary="at Korea Grill" />
              </ListItem>
              <ListItem button onClick={() => {openInNewTab('https://dashboard.dinify.app/')}} style={{paddingLeft: 80, paddingRight: 24}}>
                <ListItemText primary="Dashboard"/>
                <OpenInNew style={{opacity: 0.54}}/>
              </ListItem>
              <ListItem button onClick={() => {openInNewTab('https://waiterboard.dinify.app/')}} style={{paddingLeft: 80, paddingRight: 24}}>
                <ListItemText primary="Waiterboard"/>
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
          Log out
        </Button>
      </div>

      <LanguagePickerDialog
        open={langDialogOpen}
        initialSelectedLanguage={initialSelectedLanguage}
        onClose={(langtag) => {
          // TODO: persist langtag in firebase for appropriate key (primary or add to other)
          setLangDialogOpen(false)
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
      initialSelectedLanguage: null
    }),
    {
      setLangDialogOpen: () => (value, initialSelectedLanguage) => ({
        langDialogOpen: value,
        initialSelectedLanguage
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
