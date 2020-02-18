import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageType } from 'RestaurantModels';
import styles from './styles';
import { Image } from '../image';
import PageIndicator from '../PageIndicator';
import { ImageURIOptions } from '../image/image';

export interface CarouselProps {
  classes?: string,
  images: ImageType[],
  aspectRatio?: number,
  borderRadius?: number,
  backdrop?: string,
  fixed?: boolean,
  alt: string,
  style?: React.CSSProperties,
  imageOptions?: Partial<ImageURIOptions>
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  alt,
  aspectRatio = 3 / 2,
  style,
  imageOptions
}) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const ratio = Math.round((1 / aspectRatio) * 100 * 10000) / 10000;
  const count = images.length;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current;
    const handleScroll = (e: any) => {
      const ratio = e.target.scrollLeft / e.target.scrollWidth;
      const progress = ratio * count + 0.5;
      const newPage = Math.floor(Math.max(0, progress));
      if (newPage !== selectedPage) {
        setSelectedPage(newPage);
      }
    };
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }
    return function cleanup() {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [count, selectedPage]);
  return (
    <div style={{ position: 'relative', paddingTop: `${ratio}%`, width: '100%', ...style }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <figure ref={container} style={styles.container} className="hide-scrollbar">
          {images.map((image, i) => (
            <Image options={imageOptions} style={styles.image} key={`${image.url}`} url={image.url} alt={`${alt} ${i + 1}`} />
          ))}
        </figure>
      </div>
      {count > 1 && <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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