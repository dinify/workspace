import React from 'react';

const data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==';

export default ({ style }: { style?: React.CSSProperties }) => {
  return <div style={{
    height: 99,
    backgroundRepeat: 'repeat-x',
    backgroundImage: `url(${data})`,
    pointerEvents: 'none',
    ...style
  }} />
};