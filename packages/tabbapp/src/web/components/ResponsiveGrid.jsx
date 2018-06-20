import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

class ResponsiveGrid extends React.Component {
  state = {
    extraSmallScreen: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    if (window.innerWidth <= 400) {
      this.setState({ extraSmallScreen: true });
    } else if (this.state.extraSmallScreen)
      this.setState({ extraSmallScreen: false });
  };

  render() {
    const { classes, children, lg } = this.props;
    const { extraSmallScreen } = this.state;

    let smallScreen = isWidthDown('xs', this.props.width);

    return (
      <Grid container spacing={smallScreen ? 16 : 24}>
        {children &&
          children.map((child, i) => (
            <Grid item xs={extraSmallScreen ? 12 : 6} key={i} sm={6} lg={lg}>
              {child}
            </Grid>
          ))}
      </Grid>
    );
  }
}

ResponsiveGrid.propTypes = {
  lg: PropTypes.number,
};

ResponsiveGrid.defaultProps = {
  lg: 4,
};

export default withWidth()(ResponsiveGrid);
