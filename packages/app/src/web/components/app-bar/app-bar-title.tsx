import React from 'react';

import { select } from '../../../lib/platform';
import { Typography } from '../../components/typography'

const AppBarTitle: React.FC<{
  title?: string,
  subtitle?: string,
}> = ({
  title = '',
  subtitle = '',
}) => {
  return (
    <div style={{
      flex: 1,
      padding: '0 8px',
      textAlign: select({standard: 'start', ios: 'center'})
    }}>
        <Typography variant="h6">
            {title}
        </Typography>
        <Typography variant="caption">
            {subtitle}
        </Typography>
    </div>
  );
};

export default AppBarTitle;