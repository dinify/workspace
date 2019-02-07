import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import classNames from 'classnames';

const styles = theme => ({
  base: {
    padding: theme.spacing.unit * 1,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  overlay: {
    backgroundColor: 'transparent',
  },
  overlayChecked: {
    backgroundColor: theme.palette.divider,
  },
});

class ToggleButton extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ButtonBase
        {...this.props}
        className={classNames(
          this.props.className,
          classes.base,
          this.props.checked ? classes.overlayChecked : classes.overlay,
        )}
      >
        {this.props.children}
      </ButtonBase>
    );
  }
}

ToggleButton.propTypes = {
  checked: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ToggleButton);
