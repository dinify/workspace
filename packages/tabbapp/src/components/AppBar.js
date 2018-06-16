import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  headerContainer: {
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    zIndex: 9999
  },
  header: {
    display: 'inline-block',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    height: theme.spacing.unit * 9,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  },
  logo: {
    width: '24px',
    maxWidth: '24px',
    opacity: '0.87',
    display: 'inline-block'
  },
  logoText: {
    width: '74px',
    maxWidth: '74px',
    opacity: '0.87',
    display: 'inline-block'
  }
});

class AppBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <a href="#" className={logoWithText ? classes.logoText : classes.logo}>
            {logo}
          </a>
        </div>
        <ViewModeSelector onViewModeChange={this.handleViewModeChange}/>
        <Divider/>
      </div>
    )
  }
}

AppBar.propTypes = {

};

export default withStyles(styles)(AppBar);
