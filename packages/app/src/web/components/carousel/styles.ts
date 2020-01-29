const styles: {
  container: React.CSSProperties,
  image: React.CSSProperties,
} = {
  container: {
    height: '100%',
    width: '100%',
    scrollSnapType: 'x mandatory',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitScrollSnapType: 'mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    margin: 0,
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap'
  },
  image: {
    display: 'inline-block',
    height: '100%',
    width: '100%',
    WebkitOverflowScrolling: 'touch',
    scrollSnapAlign: 'start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
};

export default styles;