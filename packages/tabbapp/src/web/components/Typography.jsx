import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiTypography from '@material-ui/core/Typography'

const styles = theme => ({
  overline: {
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamily,
    letterSpacing: `${1 / 12}rem`,
  }
})

const headlineMapping = {
  display4: 'h1',
  display3: 'h1',
  display2: 'h1',
  display1: 'h1',
  headline: 'h3',
  title: 'h2',
  subheading: 'h3',
  body2: 'aside',
  body1: 'p',
}

const Typography = props => {
  const { className, children, classes, variant, ...other } = props

  let classNames;
  switch (variant) {
    case 'overline':
      classNames = `${className} ${classes.overline}`;
      break;
    case 'subheading2':
      classNames = `${className} ${classes.subheading2}`;
      break;
    default:
      classNames = className;
      break;
  }

  return (
    <MuiTypography className={classNames} headlineMapping={headlineMapping} variant={variant} {...other}>
      {children}
    </MuiTypography>
  )
}

export default withStyles(styles)(Typography)
