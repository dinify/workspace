import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { spec } from '../../../lib/transitions';
import { useFirebase } from 'react-redux-firebase';

import Header from './header';
import Avatar from './avatar';
import AccountPage from '../../pages/Account';

export const AccountScreen: React.FC = () => {
  const firebase = useFirebase();
  const auth = firebase.auth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const transitions = useTransition(mounted, null, spec.lateral);

  // TODO: remove this temporary fix
  const Account = AccountPage as any;

  const account = (
    <div style={{
      maxWidth: 660,
      marginTop: 56,
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingLeft: 16,
      paddingRight: 16
    }}>
      <Avatar user={auth.currentUser}/>
      <Account firebase={firebase}/>
    </div>
  );

  return (
    <>
      <Header/>
      {/* {isLoading ? loading : <Account style={{marginTop: 56}} firebase={firebase}/>} */}
      {transitions.map(({ item, key, props }) => 
        <animated.div key="account-screen" style={props}>{account}</animated.div>
      )}
    </>
  );
};