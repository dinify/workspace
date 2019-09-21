import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFirebase } from 'react-redux-firebase';
import { useTransition } from 'react-spring';

import Typography from '@material-ui/core/Typography';
import { AppBar, AppBarTitle } from '../components/app-bar';
import AccountPage from '../pages/Account';
import CircularProgress from '@material-ui/core/CircularProgress';

export const AccountScreen: React.FC = () => {
  const { t } = useTranslation();
  const firebase = useFirebase();
  const user = firebase.auth();
  const isLoading = user.currentUser === null;
  const transitions = useTransition(isLoading, null, {
    from:  { transform: 'translate(0, -8px)', opacity: 0 },
    enter: { transform: 'translate(0,   0px)', opacity: 1 },
    leave: { transform: 'translate(0, -8px)', opacity: 0 },
    config: {
      tension: 300,
      friction: 26
    }
  });
  transitions.length;
  // TODO: remove this temporary fix
  const Account = AccountPage as any;
  
  const loading = (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: 'calc(100vh - 113px)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 56
    }}>
      <CircularProgress />
    </div>
  );

  return (
    <>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <AppBarTitle title="Account" />
      </AppBar>
      <Typography variant="overline" color="textSecondary" style={{marginBottom: 8}}>
        {t('profile')}
      </Typography>
      {isLoading ? loading : <Account style={{marginTop: 56}} firebase={firebase}/>}
      {/* {transitions.map(({ item, key, props }) => 
        item
          ? <animated.div style={props}>{loading}</animated.div>
          : <animated.div style={props}><Account style={{marginTop: 56}} firebase={firebase}/></animated.div>
      )} */}
    </>
  );
};