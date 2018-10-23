import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import times from 'lodash.times';
import uniqueId from 'lodash.uniqueid';
import { StaggeredMotion, spring, presets } from 'react-motion';

class PageIndicator extends React.Component {
  constructor(props) {
    super();

    this.state = {
      to: 0,
      from: 0,
      baseColor: '',
      baseOpacity: 0,
      selectorContainer: null,
    };

    const memoize = (factory, ctx) => {
      const cache = {};
      return function result(key) {
        if (!(key in cache)) {
          cache[key] = factory.call(ctx, key);
        }
        return cache[key];
      };
    };

    this.colorToRGBA = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');

      // TODO - invalid values of "color" are ignored
      return memoize(color => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return [...ctx.getImageData(0, 0, 1, 1).data];
      });
    })();

    let base = [];
    if (props.dotColor.trim().startsWith('rgba')) {
      props.dotColor.trim().substring(5, props.dotColor.trim().length - 1).split(',').forEach(e => {
        base.push(parseFloat(e.trim()));
      })
    } else base = this.colorToRGBA(props.dotColor);

    this.state.baseColor = `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
    this.state.baseOpacity = base[3] / 255;
  }

  componentWillMount() {
    this.id = uniqueId();
  }

  componentDidMount() {
    const container = document.getElementById(this.id);
    this.setState({ selectorContainer: container });
  }

  componentWillReceiveProps(nextProps) {
    // clip count to be bigger than 1
    const count = Math.max(nextProps.count, 1);

    // clip selected page between 0 and count - 1
    const to = Math.min(count - 1, Math.max(0, nextProps.selectedPage));
    const from = Math.min(count - 1, Math.max(0, this.props.selectedPage));
    if (to !== from) {
      this.setState({ from, to });
    } else if (this.props.count !== count && nextProps.selectedPage >= count) {
      this.setState({
        from: Math.min(this.props.count - 1, nextProps.selectedPage),
        to: count - 1,
      });
    } else if (this.props.count !== count) {
      this.setState({ from: this.state.to, to: nextProps.selectedPage });
    }

    if (nextProps.dotColor !== this.props.dotColor) {
      this.updateDotColor(nextProps.dotColor);
    }
  }

  updateDotColor = dotColor => {
    const base = this.colorToRGBA(dotColor);
    this.setState({
      baseColor: `rgb(${base[0]}, ${base[1]}, ${base[2]})`,
      baseOpacity: base[3] / 255,
    });
  };

  render() {
    const { gap, size, selectedDotColor } = this.props;
    let { count } = this.props;
    const { from, to, baseColor, baseOpacity, selectorContainer } = this.state;

    // clip count to be bigger than 1
    count = Math.max(count, 1);

    const moveTo = (to / (count - 1)) * (count - 1) * (size + gap);
    const moveFrom = (from / (count - 1)) * (count - 1) * (size + gap);

    return (
      <div
        style={{
          position: 'relative',
          height: size,
          width: gap * (count - 1) + size * count,
        }}
      >
        <StaggeredMotion
          defaultStyles={times(3, () => {
            return { x: 0 };
          })}
          styles={styles =>
            styles.map((_, i) => {
              switch (i) {
                case 0:
                  return { x: spring(moveTo, { stiffness: 440, damping: 48 }) };
                case 1:
                  return {
                    x: spring(styles[i - 1].x, { stiffness: 210, damping: 24 }),
                  };
                case 2:
                  return {
                    x:
                      Math.abs(styles[0].x - moveTo) < 1
                        ? spring(moveTo, { stiffness: 440, damping: 48 })
                        : spring(moveFrom),
                  };
                default:
                  return {x: 0};
              }
            })
          }
        >
          {stylesParent => {
            const width = Math.abs(stylesParent[0].x - stylesParent[2].x);
            const translate =
              stylesParent[stylesParent[0].x > stylesParent[2].x ? 2 : 0].x +
              size / 2;
            return (
              <div
                style={{
                  opacity: baseOpacity,
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                }}
              >
                <StaggeredMotion
                  key={count} // force React to treat the StaggeredMotion as a new one when count changes
                  defaultStyles={times(count, () => {
                    return { x: 1 };
                  })}
                  styles={styles =>
                    styles.map((_, i) => {
                      let left = i === 0 ? 1 : styles[i - 1].x; // styles[count - 1].x
                      let right = i === count - 1 ? 1 : styles[i + 1].x; // styles[0].x
                      let between = (i - from) * (i - to) < 0;
                      return {
                        x:
                          i !== to &&
                          (between || i === from) &&
                          Math.abs(stylesParent[0].x - moveTo) > 1
                            ? 0
                            : spring(
                                i === to || i === from || !between
                                  ? 1
                                  : to > from
                                    ? left
                                    : right,
                                presets.stiff,
                              ),
                      };
                    })
                  }
                >
                  {interpolatingStyles => (
                    <div style={{ height: size, width: '100%' }}>
                      {interpolatingStyles.map((style, i) => (
                        <div
                          key={uniqueId()}
                          style={{
                            display: 'inline-block',
                            position: 'absolute',
                            width: size,
                            height: size,
                            left: (gap + size) * i,
                            borderRadius: size / 2,
                            WebkitTransform: `scale(${style.x}, ${style.x})`,
                            transform: `scale(${style.x}, ${style.x})`,
                            backgroundColor: baseColor,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </StaggeredMotion>
                <div
                  style={{
                    display: 'inline-block',
                    position: 'absolute',
                    width,
                    height: size,
                    WebkitTransform: `translateX(${translate}px)`,
                    transform: `translateX(${translate}px)`,
                    backgroundColor: baseColor,
                  }}
                />
                {stylesParent.map((style, i) => {
                  const selector = i === 1;
                  const currentDiv = (
                    <div
                      key={uniqueId()}
                      style={{
                        display: 'inline-block', // inline-block
                        position: 'absolute',
                        key: `selector${i}`,
                        width: size,
                        height: size,
                        WebkitTransform: `translateX(${style.x}px)`,
                        transform: `translateX(${style.x}px)`,
                        borderRadius: size / 2,
                        zIndex: selector ? 1 : 'inherit',
                        backgroundColor: selector
                          ? selectedDotColor
                          : baseColor,
                      }}
                    />
                  );

                  return selector && selectorContainer !== null
                    ? ReactDOM.createPortal(currentDiv, selectorContainer)
                    : currentDiv;
                })}
              </div>
            );
          }}
        </StaggeredMotion>
        <div
          id={this.id}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            display: 'flex',
          }}
        />
      </div>
    );
  }
}

PageIndicator.propTypes = {
  dotColor: PropTypes.string,
  selectedDotColor: PropTypes.string,
  count: PropTypes.number,
  size: PropTypes.number,
  gap: PropTypes.number,
  selectedPage: PropTypes.number,
};

PageIndicator.defaultProps = {
  selectedDotColor: '#757575',
  dotColor: 'rgba(0, 0, 0, 0.12)', // '#E0E0E0',
  count: 3,
  size: 8,
  gap: 8,
  selectedPage: 0,
};

export default PageIndicator;
