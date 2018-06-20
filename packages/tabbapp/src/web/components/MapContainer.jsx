import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Map from './Map';

class MapContainer extends React.Component {
  state = {
    windowWidth: 0,
    windowHeight: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  render() {
    let smallScreen = isWidthDown('xs', this.props.width);

    return (
      <div style={{ height: '100%' }}>
        <Map
          width={
            this.props.fullWidth ? this.state.windowWidth : this.props.mapWidth
          }
          height={this.state.windowHeight - (smallScreen ? 56 : 64)}
        />
      </div>
    );
  }
}

export default withWidth()(MapContainer);
