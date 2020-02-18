import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { BaseControl } from 'react-map-gl';
import ButtonBase from '@material-ui/core/ButtonBase';
import InvertColors from '@material-ui/icons/InvertColorsRounded';

const styles = theme => ({
  mapButton: {
    padding: '2px',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    width: '24px',
    height: '24px',
    color: 'rgb(51, 51, 51)',
    position: 'absolute',
    right: '0',
    bottom: '0',
    marginBottom: '44px',
    marginRight: '10px',
  },
});

class MapStyleControl extends BaseControl {
  render() {
    const { classes } = this.props;
    // draw something
    // _onContainerLoad registers event listeners for map interactions
    return (
      <ButtonBase onClick={this.props.onClick} className={classes.mapButton}>
        <InvertColors style={{ width: '18px', height: '18px' }} />
      </ButtonBase>
    );
  }
}

MapStyleControl.propTypes = {
  onClick: PropTypes.function,
};

export default withStyles(styles)(MapStyleControl);
