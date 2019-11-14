import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useFirebase } from 'react-redux-firebase';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Button from '@material-ui/core/Button';
import { spec } from '../../../lib/transitions';
import Header from './header';
import Avatar from './avatar';
import Settings from './settings';
import RolesSection from './roles-section';
import Dialogs from './dialogs';
import { openDialogAction } from '../../../features/ui/actions';
import { useAction } from '@dinify/common/src/lib/util';

export const AccountScreen: React.FC = () => {
  const firebase = useFirebase();
  const auth = firebase.auth();
  const [claims, setClaims] = useState();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, []);
  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser
        .getIdTokenResult()
        .then(result => setClaims(result.claims));
    }
  }, [auth.currentUser]);
  const transitions = useTransition(mounted, null, spec.lateral);
  const { t } = useTranslation();
  const openDialog = useAction(openDialogAction);

  const account = (
    <div
      style={{
        maxWidth: 660,
        marginTop: 56,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Avatar user={auth.currentUser} />
      <Settings />
      {claims && claims.roles && <RolesSection roles={claims.roles} />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 16,
          paddingBottom: 16,
        }}
      >
        <Button
          disabled={!auth.currentUser}
          style={{ boxShadow: 'none', height: 40 }}
          variant="contained"
          onClick={() => {
            openDialog('logout');
          }}
          color="primary"
        >
          {t('user.logOut')}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Dialogs />
      <Header />
      {/* <div key="account-screen">{account}</div> */}
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key="account-screen" style={props}>
            {account}
          </animated.div>
        ) : (
          <React.Fragment key="account-transition-fragment" />
        ),
      )}
    </>
  );
};
