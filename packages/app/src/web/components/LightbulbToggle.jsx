import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
import LightbulbOutlined from '@dinify/common/src/icons/LightbulbOutlined';
import times from 'lodash.times';
import { StaggeredMotion, Motion, spring } from 'react-motion';

const LightbulbToggle = ({
  onChange,
  theme,
  style,
  defaultChecked = false,
  checked
}) => {

  // console.log(checked);
  const isDark = theme === 'dark';
  return (
      <div style={{
        position: 'relative',
        pointerEvents: 'none',
        width: 24,
        height: 24,
        opacity: isDark ? 0.54 : 0.38,
        ...style
      }}>
      <Motion
        defaultStyle={{x: !checked ? 1 : 0}}
        style={{x: spring(checked ? 1 : 0, { stiffness: 480, damping: checked ? 12 : 48 })}}>
        {style =>
          <div style={{ position: 'relative', transform: 'translate(12px, 12px)'}}>
            <LightbulbOutlined style={{
              color: isDark ? '#fff' : '#000',
              position: 'absolute',
              top: -12,
              left: -12,
            }}/>
            <div style={{
              position: 'absolute',
              top: -10,
              left: -7,
            }}>
              <div style={{
                position: 'absolute',
                backgroundColor: isDark ? '#fff' : '#000',
                width: 14,
                height: 14,
                borderRadius: '50%',
                opacity: Math.min(1, style.x * 1.2),
                transform: `scale(${Math.max(0.1, style.x)}, ${Math.max(0.1, style.x)})`,
                WebkitTransform: `scale(${Math.max(0.1, style.x)}, ${Math.max(0.1, style.x)})`,
              }}/>
            </div>
            <div style={{
              position: 'absolute',
              top: 4,
              left: -3,
              backgroundColor: isDark ? '#fff' : '#000',
              width: 6,
              height: 1,
              transformOrigin: 'center bottom',
              transform: `scale(1, ${Math.max(0.1, style.x) * 3.2}) translate3d(0,0,0)`,
            }}/>
          </div>
        }
      </Motion>
      <StaggeredMotion
        defaultStyles={times(2, () => {
          return { x: !checked ? 1 : 0 };
        })}
        styles={styles =>
          styles.map((_, i) => {
            if (i === 0) return { x: spring(checked ? 1 : 0, { stiffness: 440, damping: 48 }) };
            return { x: spring(styles[i - 1].x, { stiffness: 250, damping: 48 }) };
          })
        }>
        {stylesParent => <div style={{transform: 'translate(12px, 12px)'}}>
          {[-90, -45, 0, +45, +90].map(angle => {
            const w = checked ? (stylesParent[0].x - stylesParent[1].x) : (stylesParent[1].x - stylesParent[0].x);
            return (
              <div key={`lightbulb${angle}`} style={{
                position: 'absolute',
                top: -3,
                left: 0,
                transform: `rotate(${angle}deg)`,
              }}>
                <div style={{
                  position: 'absolute',
                  top: -10,
                  left: -1,
                  width: 2,
                  height: 1,
                  opacity: (w <= 0) ? 0 : (w**(1/3)),
                  backgroundColor: isDark ? '#fff' : '#000',
                  transformOrigin: 'center bottom',
                  transform: `translate3d(0,${stylesParent[checked ? 1 : 0].x * -4}px,0) scale(1, ${Math.max(0.1, w) * 4})`,
                }}/>
              </div>
            )
          })}
        </div>}
      </StaggeredMotion>

    </div>
  );

}

export default LightbulbToggle;
