import React from 'react';

import { select } from '@dinify/common/src/lib/platform';
import { Typography } from '../../components/typography'

const AppBarTitle: React.FC<{
  title?: string,
  subtitle?: string,
}> = ({
  title = '',
  subtitle = '',
}) => {
  const titleStyle = select({
    standard: {
      textAlign: 'start',
      paddingLeft: 16
    }, 
    ios: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      textAlign: 'center'
    }
  });
  return (
    <div style={{
      pointerEvents: 'none',
      flex: 1,
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={titleStyle}>
          <Typography variant="h6">
              {title}
          </Typography>
          <Typography variant="caption">
              {subtitle}
          </Typography>
      </div>
    </div>
  );
};

export default AppBarTitle;