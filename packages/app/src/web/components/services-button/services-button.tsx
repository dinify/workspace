import React from 'react';
import { animated, useSpring } from 'react-spring';
import Fab from '@material-ui/core/Fab';
import NotificationsActive from '@material-ui/icons/NotificationsActive';

export interface ServicesButtonProps {
  anchor?: number,
  visible?: boolean,
  style?: React.CSSProperties,
  onClick?: () => void
}

export const ServicesButton: React.FC<ServicesButtonProps> = ({
  anchor = 0,
  visible = true,
  onClick = () => {},
  style,
  ...otherProps
}) => {
  const animStyle = useSpring({
    transform: `scale(${visible ? 1 : 0}, ${visible ? 1 : 0})`,
    opacity: visible ? 1 : 0,
    config: {
      tension: 300,
      friction: 26
    }
  });
  const AnimatedFab = animated(Fab);
  return (
    <AnimatedFab 
      color="primary" 
      onClick={onClick}
      style={{
        ...style,
        ...animStyle
      }} {...otherProps}>
      <NotificationsActive/>
    </AnimatedFab>
  );
};