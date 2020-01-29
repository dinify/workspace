import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Image } from '../../components/image';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/PersonRounded';
import { User } from 'firebase';
import Button from '@material-ui/core/Button';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useHistory } from 'react-router';
import * as routes from '../../routes';

export default ({ user }: { user: User | null }) => {
  const { t } = useTranslation();
  const history = useHistory();
  // user.isAnonymous
  const trans = {
    transition: 'opacity 100ms',
    opacity: user === null ? 0 : 1,
  };
  return (
    <div
      style={{
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        style={{
          position: 'relative',
          width: 96,
          height: 96,
          opacity: 1,
        }}
      >
        <Person style={{ position: 'absolute', width: 56, height: 56 }} />
        {user !== null && user.photoURL && (
          <Image
            style={{ position: 'absolute', top: 0, ...trans }}
            url={user.photoURL}
            alt={user.displayName || ''}
          />
        )}
      </Avatar>
      {!user && (
        <Button
          style={{ boxShadow: 'none', height: 40, marginTop: 16 }}
          variant="contained"
          onClick={() => history.push(routes.SIGNIN)}
          color="primary"
        >
          {t('user.signIn')}
        </Button>
      )}
      {user && user.displayName && (
        <Typography
          style={{ marginTop: 8, minHeight: '1.75rem', ...trans }}
          variant="h5"
        >
          {user.displayName}
        </Typography>
      )}
      {user && user.email && (
        <Typography
          style={{ minHeight: '1.5rem', ...trans }}
          variant="subtitle1"
        >
          {user.email}
        </Typography>
      )}
    </div>
  );
};
