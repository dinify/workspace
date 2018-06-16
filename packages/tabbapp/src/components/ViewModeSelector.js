import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from './ToggleButton';
import VerticalSplit from 'icons/VerticalSplit';
import Public from 'icons/Public';
import ViewList from 'icons/ViewList';

const styles = theme => ({
  left: {
    border: '1px solid ' + theme.palette.divider,
    borderRight: 'none',
    borderRadius: '4px 0 0 4px',
    color: theme.palette.text.secondary
  },
  between: {
    border: '1px solid ' + theme.palette.divider,
    color: theme.palette.text.secondary
  },
  right: {
    border: '1px solid ' + theme.palette.divider,
    borderLeft: 'none',
    borderRadius: '0 4px 4px 0',
    color: theme.palette.text.secondary
  },
  leftSelected: {
    border: '1px solid transparent',
    borderRight: 'none',
    borderRadius: '4px 0 0 4px',
    color: theme.palette.text.primary
  },
  betweenSelected: {
    border: '1px solid transparent',
    color: theme.palette.text.primary
  },
  rightSelected: {
    border: '1px solid transparent',
    borderLeft: 'none',
    borderRadius: '0 4px 4px 0',
    color: theme.palette.text.primary
  },
  container: {
    display: 'inline-block'
  },
  smaller: {
    width: 20,
    height: 20
  }
});

class ViewModeSelector extends React.Component {
  handleClick0 = () => { this.handleClick(0) }
  handleClick1 = () => { this.handleClick(1) }
  handleClick2 = () => { this.handleClick(2) }

  handleClick = (number) => {
    if (this.props.onViewModeChange) this.props.onViewModeChange(number);
  }

  render() {
    const { classes } = this.props;

    let splitButton = this.props.splitAvailable ? (
      <ToggleButton
        className={this.props.selected === 2 ? classes.rightSelected : classes.right}
        onClick={this.handleClick2}
        checked={this.props.selected === 2}>
          <VerticalSplit className={classes.smaller}/>
      </ToggleButton>
    ) : null;

    return (
      <div className={this.props.selected === 1 ? classes.containerPaper : classes.container}>
        <ToggleButton
          className={this.props.selected === 0 ? classes.leftSelected : classes.left}
          onClick={this.handleClick0}
          checked={this.props.selected === 0}>
            <ViewList className={classes.smaller}/>
        </ToggleButton>
        <ToggleButton
          className={this.props.selected === 1 ?
            (this.props.splitAvailable ? classes.betweenSelected : classes.rightSelected) :
            (this.props.splitAvailable ? classes.between : classes.right)}
          onClick={this.handleClick1}
          checked={this.props.selected === 1}>
            <Public className={classes.smaller}/>
        </ToggleButton>
        {splitButton}
      </div>
    );
  }
}

ViewModeSelector.propTypes = {
  onViewModeChange: PropTypes.function,
  selected: PropTypes.number,
  splitAvailable: PropTypes.bool
};

export default withStyles(styles)(ViewModeSelector);
