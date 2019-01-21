import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import { getClaims } from 'ducks/auth/selectors';
import Language from '@material-ui/icons/LanguageRounded';
import Person from '@material-ui/icons/PersonRounded';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Image from 'web/components/Image';
import Flag from 'web/components/Flag';
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

const Account = ({
  classes,
  user,
  profile,
  firebase,
  claims,
  dispatch,
  ...other
}) => {

  let lang;
  if (profile && profile.languages) {
    const l = profile.languages.primary;
    languages.forEach(curr => {
      curr[3].forEach(reg => {
        if (reg[0] === l) {
          const arr = reg[0].split('-');
          const code = arr[arr.length - 1];
          lang = [curr[0], curr[1], curr[2], reg[0], reg[1], code, countries[code]]
        }
      });
    });
  }

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
    <ResponsiveContainer>
      <div style={{
        marginTop: 32,
        display: 'flex',
        flexDirection: 'column',
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
      {profile && (
        <div>
          <Divider style={{marginTop: 16}}/>
          <Typography variant="overline" color="textSecondary">
            Profile
          </Typography>
          {lang && (
            <ListItem style={{padding: 0}}>
              <ListItemIcon>
                <Flag country={lang[5]}/>
              </ListItemIcon>
              <ListItemText primary={lang[1]} secondary={lang[6]} />
            </ListItem>
          )}
        </div>
      )}
      {claims && claims.roles && (
        <div>
          <Divider style={{marginTop: 16}}/>
          <Typography variant="overline" color="textSecondary">
            Roles
          </Typography>

          {claims.roles.restaurant && (
            <ListItem style={{padding: 0}}>
              <Avatar className={classes[claims.roles.restaurant.type]}>
                <Person />
              </Avatar>
              <ListItemText primary={localizedType[claims.roles.restaurant.type]} secondary="at Korea Grill" />
            </ListItem>
          )}
        </div>
      )}
      <Divider style={{marginTop: 16, marginBottom: 16}}/>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Button variant="outlined" onClick={() => {
          firebase.logout();
        }} color="primary">
          Log out
        </Button>
      </div>
    </ResponsiveContainer>
  );
};

const enhance = compose(
  withFirebase,
  withStyles(styles),
  connect(
    state => ({
      user: state.firebase.auth,
      profile: state.firebase.profile,
      claims: getClaims(state),
    })
  )
)

export default enhance(Account);
