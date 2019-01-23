import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import { getClaims } from 'ducks/auth/selectors';
import { withState } from 'recompose';
import Language from '@material-ui/icons/LanguageRounded';
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
import LanguagePickerDialog from 'web/components/dialogs/LanguagePickerDialog';
import Image from 'web/components/Image';
import Flag from 'web/components/Flag';
import Card from 'web/components/Card';
import languages from 'lib/languages';
import countries from 'lib/countries';

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

const getLang = l => {
  let lang;
  languages.forEach(curr => {
    curr[3].forEach(reg => {
      if (reg[0] === l) {
        const arr = reg[0].split('-');
        const code = arr[arr.length - 1];
        lang = [curr[0], curr[1], curr[2], reg[0], reg[1], code, countries[code]]
      }
    });
  });
  return lang;
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

      {profile && <Typography variant="overline" color="textSecondary">
        Profile
      </Typography>}
      {profile.languages && (() => {
        const primaryLang = getLang(profile.languages.primary);
        return (
          <Card>
            <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
              Default language
            </Typography>
            <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={() => {setLangDialogOpen(true)}}>
              <ListItemIcon>
                <Flag country={primaryLang[5]}/>
              </ListItemIcon>
              <ListItemText primary={primaryLang[1]} secondary={primaryLang[6]} />
              <ChevronRight />
            </ListItem>
            <Divider />
            <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
              Other languages
            </Typography>
            {profile.languages.other.map(lang => {
              const language = getLang(lang);
              return <ListItem style={{paddingLeft: 24, paddingRight: 24}}>
                <ListItemIcon>
                  <Flag country={language[5]}/>
                </ListItemIcon>
                <ListItemText primary={language[1]} secondary={language[6]} />
                <IconButton>
                  <Delete />
                </IconButton>
                <IconButton>
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
        );
      })()}
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
              <ListItem button onClick={() => {openInNewTab('https://dashboard.gotabb.com/')}} style={{paddingLeft: 80, paddingRight: 24}}>
                <ListItemText primary="Dashboard"/>
                <OpenInNew style={{opacity: 0.54}}/>
              </ListItem>
              <ListItem button onClick={() => {openInNewTab('https://waiterboard.gotabb.com/')}} style={{paddingLeft: 80, paddingRight: 24}}>
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

      <LanguagePickerDialog open={langDialogOpen} onClose={() => {setLangDialogOpen(false)}}/>
    </div>
  );
};

const enhance = compose(
  withFirebase,
  withStyles(styles),
  withState('langDialogOpen', 'setLangDialogOpen'),
  connect(
    state => ({
      user: state.firebase.auth,
      profile: state.firebase.profile,
      claims: getClaims(state),
    })
  )
)

export default enhance(Account);
