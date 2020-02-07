import React, { useState, useEffect, useRef } from 'react';
import Marker from './marker';
import { Restaurant } from 'RestaurantModels';

export interface StaticMapProps {
  mapStyle?: string,
  zoom?: number,
  restaurant: Restaurant,
  aspectRatio?: number
}

// public token used in mapbox demos
const token = 'pk.eyJ1IjoibWF0ZWgiLCJhIjoiY2pmOTEzbHo2MzU3cTJ3b201NDNkOXQxZiJ9.UYLkoWDRs877jt_-k4LH4g';

const StaticMap: React.FC<StaticMapProps> = ({
  mapStyle = 'mapbox/light-v9',
  zoom = 12.5,
  restaurant,
  aspectRatio = 2
}) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (container.current) {
      const width = container.current.clientWidth;
      const height = container.current.clientHeight;
      setDimensions({ width, height });
    }
  });

  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 });

  if (!(restaurant && restaurant.longitude && restaurant.latitude)) return null;

  const ratio = Math.round((1 / aspectRatio) * 100 * 10000) / 10000;
  const url = `https://api.mapbox.com/styles/v1/${mapStyle}/static/${restaurant.longitude},${restaurant.latitude},${zoom},0,0/${width}x${height}@2x?access_token=${token}`

  return (
    <div
      ref={container}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        paddingTop: `${ratio}%`,
      }}>
      <img
        alt="Map"
        style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
        src={url} />
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

export default StaticMap;
