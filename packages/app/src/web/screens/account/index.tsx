import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useFirebase } from 'react-redux-firebase';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Button from '@material-ui/core/Button';
import { spec } from 'lib/transitions';
import Header from './header';
import Avatar from './avatar';
import Settings from './settings';
import RolesSection from './roles-section';
import Dialogs from './dialogs';
import { openDialogAction } from 'features/ui/actions';
import { useAction } from '@dinify/common/src/lib/util';
import { RootState } from 'typesafe-actions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import * as routes from 'web/routes';

export const AccountScreen: React.FC = () => {
  const firebase = useFirebase();
  const auth = firebase.auth();
  const [claims, setClaims] = useState();
  const [mounted, setMounted] = useState(false);
  const user = useSelector((state: RootState) => state.firebase.auth);
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);
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
  const { push } = useHistory();

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
      {!user.isEmpty && !user.isAnonymous ?
        <Avatar user={auth.currentUser} />
        :
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 94,
            paddingBottom: 16,
          }}
        >
          {user.isAnonymous && <Typography>Anonymously authorized</Typography>}
          <Button
            style={{ boxShadow: 'none', height: 40 }}
            variant="contained"
            onClick={() => {
              push(routes.SIGNIN);
            }}
            color="primary"
          >
            {t('auth.createAccount')}
          </Button>
        </div>
      }

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
      {transitions.map(({ item, props }) =>
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
