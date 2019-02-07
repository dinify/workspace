import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const Image = ({
  style,
  image,
  title,
  children,
  aspect = 16/9
}) => {
  const ratio = Math.round((1 / aspect) * 100 * 10000) / 10000;
  return (
    <CardMedia style={{
      paddingTop: `${ratio}%`,
      width: '100%',
      ...style
    }}
    image={image}
    title={title}>
      {children}
    </CardMedia>
  );
}

export default Image;
