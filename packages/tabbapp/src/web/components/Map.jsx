import React from 'react';
import ReactMapGL, { Marker as MarkerWrapper } from 'react-map-gl';
import MapStyleControl from './MapStyleControl';
import Marker from './Marker';

const availableStyles = [
  'mapbox://styles/mapbox/streets-v9',
  'mapbox://styles/mapbox/light-v9',
  'mapbox://styles/mapbox/dark-v9',
];

class Map extends React.Component {
  state = {
    selectedStyle: 0,
    styleControlOutline: false,
    viewport: {
      latitude: 29.31,
      longitude: 48,
      zoom: 11,
    },
  };

  handleStyleChange = () => {
    console.log('Handler called');
    if (this.state.selectedStyle >= availableStyles.length)
      this.setState({
        selectedStyle: 0,
        styleControlOutline: !this.state.styleControlOutline,
      });
    else
      this.setState({
        selectedStyle: this.state.selectedStyle + 1,
        styleControlOutline: !this.state.styleControlOutline,
      });
  };

  renderMarker = (data, index) => {
    return (
      <MarkerWrapper
        key={`marker-${index}`}
        longitude={data.longitude}
        latitude={data.latitude}
      >
        <Marker size={32} onClick={() => this.setState({ popupInfo: data })} />
      </MarkerWrapper>
    );
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        width={this.props.width}
        height={this.props.height}
        className="mui-fixed"
        style={{ boxSizing: 'content-box' }}
        mapboxApiAccessToken="pk.eyJ1IjoibWF0ZWgiLCJhIjoiY2pmOTEzbHo2MzU3cTJ3b201NDNkOXQxZiJ9.UYLkoWDRs877jt_-k4LH4g"
        mapStyle={availableStyles[this.state.selectedStyle]}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <MapStyleControl onClick={this.handleStyleChange} />

        {this.renderMarker(
          {
            latitude: 29.3421765,
            longitude: 48.0374531,
          },
          0,
        )}
      </ReactMapGL>
    );
  }
}

export default Map;
