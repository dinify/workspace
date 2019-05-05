import React from 'react';
import Marker from 'web/components/Marker';

class StaticMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    if (this.container) {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.setState({ width, height });
    }
  }

  render() {
    const { width, height } = this.state;
    let { style, zoom, restaurant, aspectRatio } = this.props;

    if (restaurant.longitude === undefined || restaurant.latitude === undefined) return null;

    if (!style) style = 'mapbox/light-v9';
    if (!zoom) zoom = 12.5;
    if (!aspectRatio) aspectRatio = 2;

    const ratio = Math.round((1 / aspectRatio) * 100 * 10000) / 10000;
    const url = `https://api.mapbox.com/styles/v1/${style}/static/${restaurant.longitude},${restaurant.latitude},${zoom},0,0/${width}x${height}@2x?access_token=pk.eyJ1IjoibWF0ZWgiLCJhIjoiY2pmOTEzbHo2MzU3cTJ3b201NDNkOXQxZiJ9.UYLkoWDRs877jt_-k4LH4g`

    return (
      <div
        ref={element => {this.container = element}}
        style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            paddingTop: `${ratio}%`,
          }}>
        <img
          alt="Map"
          style={{position: 'absolute', top: 0, width: '100%', height: '100%'}}
          src={url}/>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}>
          <Marker size={32} />
        </div>
      </div>
    )
  }
}

export default StaticMap;
