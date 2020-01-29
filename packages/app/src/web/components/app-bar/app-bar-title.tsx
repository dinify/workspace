import React from 'react';

import { select } from '@dinify/common/src/lib/platform';
import { Typography } from '../../components/typography'

const AppBarTitle: React.FC<{
  title?: string,
  subtitle?: string,
  style?: React.CSSProperties,
}> = ({
  title = '',
  subtitle = '',
  style,
}) => {
    const titleStyle = select({
      standard: {
        textAlign: 'start'
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
        <div style={{ ...titleStyle, ...style }}>
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