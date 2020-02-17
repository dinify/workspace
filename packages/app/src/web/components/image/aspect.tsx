import React from 'react';

export interface AspectProps {
  ratio?: number,
  style?: React.CSSProperties,
  className?: string
}

const Aspect: React.SFC<React.PropsWithChildren<AspectProps>> = ({ ratio = 3 / 2, style, children, className }) => {
  const rounded = Math.round((1 / ratio) * 100 * 10000) / 10000;
  return (
    <div className={className} style={{ position: 'relative', paddingTop: `${rounded}%`, ...style }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default Aspect;