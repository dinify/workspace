import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiTypography from '@material-ui/core/Typography';

const styles = theme => ({
  overline: {
    lineHeight: 'unset',
    letterSpacing: `${1 / 12}rem`,
  },
  subtitle2: {
    fontWeight: '700',
  }
})

const Typography = props => {
  const { className, children, classes, variant, ...other } = props

  let classNames;
  switch (variant) {
    case 'overline':
    case 'subtitle2':
      classNames = `${className} ${classes[variant]}`;
      break;
    default:
      classNames = className;
      break;
  }

  return (
    <MuiTypography className={classNames} variant={variant} {...other}>
      {children}
    </MuiTypography>
  )
}

export default withStyles(styles)(Typography)
