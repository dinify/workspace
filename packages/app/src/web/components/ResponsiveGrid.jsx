import React from 'react';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

class ResponsiveGrid extends React.Component {
  state = {
    breakpoint: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    const w = window.innerWidth;
    if      (w < 360) this.setState({ breakpoint: 0 });
    else if (w < 720) this.setState({ breakpoint: 1 });
    else this.setState({ breakpoint: 3 });
  };

  render() {
    const { children, width } = this.props;
    const { breakpoint } = this.state;

    return (
      <Grid container spacing={isWidthDown('sm', width) ? 16 : 24}>
        {children &&
          children.map((child, i) => (
            <Grid item key={i} xs={breakpoint === 0 ? 12 : 6} sm={breakpoint === 1 ? 6 : 4} md={3} lg={3}>
              {child}
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default withWidth()(ResponsiveGrid);
