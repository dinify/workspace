import React from 'react';
import { useTheme } from '@material-ui/styles';
import { AppTheme } from '@dinify/common/src/theme';

export interface MarkerProps {
  size?: number,
  onClick?: () => {}
}

const Marker: React.SFC<MarkerProps> = ({ size = 40, onClick }) => {
  const theme = useTheme<AppTheme>();
  return (
    <svg
      height={size}
      viewBox="0 0 40 40"
      style={{ 
        cursor: 'pointer',
        stroke: 'none',
        transform: `translate(${-size / 2}px,${-size}px)`,
        fill: theme.palette.primary.main,
      }}
      onClick={onClick}
    >
      <circle cx="20" cy="16" r="16" />
      <circle cx="20" cy="38" r="2" />
      <polygon points="7.7,26.2 18.5,39.3 21.5,39.3 32.3,26.2" />
      <path
        fill="#fff"
        d="M16.1,17.3l2.8-2.8l-6.2-6.2c-0.5-0.5-1.3-0.3-1.6,0.3c-0.7,1.5-0.4,3.3,0.8,4.6L16.1,17.3z M22.9,15.5
          c1.5,0.7,3.7,0.2,5.3-1.4c1.9-1.9,2.3-4.6,0.8-6.1c-1.5-1.5-4.2-1.1-6.1,0.8c-1.6,1.6-2.1,3.7-1.4,5.3l-9.1,9.1
          c-0.4,0.4-0.4,1,0,1.4l0,0c0.4,0.4,1,0.4,1.4,0l6.2-6.2l6.2,6.2c0.4,0.4,1,0.4,1.4,0l0,0c0.4-0.4,0.4-1,0-1.4L21.4,17L22.9,15.5z"
      />
    </svg>
  );
}

export default Marker;
