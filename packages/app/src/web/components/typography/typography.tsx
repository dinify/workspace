import React from 'react';

import { withTheme } from '@material-ui/core/styles';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@material-ui/core/Typography';

type TypographyProps = Omit<MuiTypographyProps, 'variant'> & {
  variant?: MuiTypographyProps['variant'] | 'button2',
  theme?: any,
  style?: any,
}

const Typography: React.FC<TypographyProps> = ({
  theme,
  style,
  variant,
  children,
  ...otherProps
}) => {
  const { typography } = theme;
  let childVariant: MuiTypographyProps['variant'];
  let childStyle = {};
  if (variant === 'button2') {
    childVariant = 'button';
    childStyle = typography[variant];
  }
  else childVariant = variant as MuiTypographyProps['variant'];

  return (
    <MuiTypography
      style={{
        ...childStyle,
        ...style
      }}
      variant={childVariant}
      {...otherProps}>
      {children}
    </MuiTypography>
  );
}

export default withTheme(Typography);