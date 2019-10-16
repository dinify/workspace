import React from 'react';
import { useTransition } from 'react-spring';

import Header from './header';
import AccountPage from '../../pages/Account';
import CircularProgress from '@material-ui/core/CircularProgress';

const { useFirebase } = require('react-redux-firebase');

export const AccountScreen: React.FC = () => {
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
      <Header/>
      {isLoading ? loading : <Account style={{marginTop: 56}} firebase={firebase}/>}
      {/* {transitions.map(({ item, key, props }) => 
        item
          ? <animated.div style={props}>{loading}</animated.div>
          : <animated.div style={props}><Account style={{marginTop: 56}} firebase={firebase}/></animated.div>
      )} */}
    </>
  );
};