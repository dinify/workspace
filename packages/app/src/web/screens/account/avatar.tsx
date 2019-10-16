import React from 'react';
import { useSpring, animated } from 'react-spring';
import Avatar from '@material-ui/core/Avatar';
import Image from '../../components/Image';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/PersonRounded';
import { User } from 'firebase';

export default ({ user }: { user: User | null }) => {
  const fadeStyle = useSpring({opacity: user === null ? 0 : 1});
  const AnimatedImage = animated(Image);
  const AnimatedTypography = animated(Typography);
  return (
    <div style={{
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Avatar style={{width: 96, height: 96}}>
        {user && user.photoURL ?
          <AnimatedImage style={fadeStyle} aspect={1} image={user.photoURL} title={user.displayName || ''} /> :
          <Person style={{width: 56, height: 56}} />
        }
      </Avatar>
      <AnimatedTypography style={{marginTop: 8, minHeight: '1.75rem', ...fadeStyle}} variant="h5">
        {user && user.displayName}
      </AnimatedTypography>
      <AnimatedTypography style={{minHeight: '1.5rem', ...fadeStyle}} variant="subtitle1">
        {user && user.email}
      </AnimatedTypography>
    </div>
  );
}