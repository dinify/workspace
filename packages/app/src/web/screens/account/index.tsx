import React from 'react';
import { useTransition, animated } from 'react-spring';
import { spec } from '../../../lib/transitions';

import Header from './header';
import AccountPage from '../../pages/Account';
import CircularProgress from '@material-ui/core/CircularProgress';

const { useFirebase } = require('react-redux-firebase');

export const AccountScreen: React.FC = () => {
  const firebase = useFirebase();
  const user = firebase.auth();
  const isLoading = user.currentUser === null;
  const transitions = useTransition(isLoading, null, spec.lateral);
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
      <Header/>
      {/* {isLoading ? loading : <Account style={{marginTop: 56}} firebase={firebase}/>} */}
      {transitions.map(({ item, key, props }) => 
        item
          ? <animated.div key="account-screen-loading" style={props}>{loading}</animated.div>
          : <animated.div key="account-screen" style={props}><Account style={{marginTop: 56}} firebase={firebase}/></animated.div>
      )}
    </>
  );
};