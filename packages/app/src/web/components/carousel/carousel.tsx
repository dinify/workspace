import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageType } from 'RestaurantModels';
import styles from './styles';
import comparator from 'ramda/es/comparator';
import { Image } from '../image';
import PageIndicator from '../PageIndicator';

export interface CarouselProps {
  classes?: string,
  images: ImageType[],
  aspectRatio?: number,
  borderRadius?: number,
  backdrop?: string,
  fixed?: boolean,
  alt: string,
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  alt,
  aspectRatio = 16 / 9
}) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const ratio = Math.round((1 / aspectRatio) * 100 * 10000) / 10000;
  const count = images.length;
  const handleScroll = (e: any) => {
    const ratio = e.target.scrollLeft / e.target.scrollWidth;
    const progress = ratio * count + 0.5;
    const newPage = Math.floor(Math.max(0, progress));
    if (newPage !== selectedPage) {
      setSelectedPage(newPage);
    }
  };
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (container.current) {
      container.current.addEventListener('scroll', handleScroll);
    }
    return function cleanup() {
      if (container.current)
        container.current.removeEventListener('scroll', handleScroll);
    };
  }, [count, selectedPage]);
  return (
    <div style={{ position: 'relative', paddingTop: `${ratio}%`, width: '100%' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div ref={container} style={styles.container} className="hide-scollbar">
          {images.sort(
            comparator((a, b) => a.precedence < b.precedence)
          ).map((image, i) => (
            <Image style={styles.image} key={image.url} url={image.url} alt={`${alt} ${i}`} />
          ))}
        </div>
      </div>
      {count > 1 && <div style={{
        paddingBottom: 8,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <PageIndicator
          size={8}
          gap={8}
          count={count}
          dotColor="rgba(255, 255, 255, 0.54)"
          selectedDotColor="rgba(255, 255, 255, 1)"
          selectedPage={selectedPage}
        />
      </div>}
    </div>
  );
}

export default Carousel;