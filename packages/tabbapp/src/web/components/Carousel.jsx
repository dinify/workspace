import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import PageIndicator from './PageIndicator';
import ChevronRight from 'icons/ChevronRight';
import ChevronLeft from 'icons/ChevronLeft';
import SwipeableViews from 'react-swipeable-views';
import {
  isTouchMobile,
  isMobile,
  getPlatform,
  supportsScrollSnap,
} from 'lib/FN';
import { Motion, spring } from 'react-motion';

const styles = theme => ({
  carouselButton: {
    position: 'absolute',
    width: 56,
    height: '100%',
    top: 0,
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  },
  focusVisible: {},
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  slideContainer: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    top: 0,
    '& $div': {
      width: '100%',
      height: '100%',
    },
  },
  pageIndicatorContainer: {
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'center',
  },
  scrollSnapContainer: {
    position: 'absolute',
    top: 0,
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'x mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
  },
  scrollSnapChild: {
    position: 'relative',
    display: 'inline-block',
    WebkitOverflowScrolling: 'touch',
    scrollSnapAlign: 'start',
  },
});

class Carousel extends React.Component {
  state = {
    selectedPage: 0,
  };

  handlePageChange = delta => {
    let pageCount = this.props.images.length;
    if (delta < 0 && this.state.selectedPage <= 0) {
      this.setState({ selectedPage: pageCount - 1 });
    } else if (delta > 0 && this.state.selectedPage >= pageCount - 1) {
      this.setState({ selectedPage: 0 });
    } else this.setState({ selectedPage: this.state.selectedPage + delta });
  };

  handleChangeIndex = index => {
    this.setState({ selectedPage: index });
  };

  handleScroll = e => {
    let ratio = e.target.scrollLeft / e.target.scrollWidth;
    let count = this.props.images ? this.props.images.length : 0;
    if (count > 1) {
      let relWidth = 1 / count;
      let proximity = relWidth / 20;
      let last = count - 1;
      if (ratio >= 0 && ratio < 2 * proximity) {
        if (this.state.selectedPage !== 0) this.setState({ selectedPage: 0 });
      } else if (
        ratio > last * relWidth - proximity * 2 &&
        ratio <= last * relWidth
      ) {
        if (this.state.selectedPage !== last)
          this.setState({ selectedPage: last });
      } else {
        for (let i = 1; i < last; i++) {
          let current = relWidth * i;
          if (
            ratio > i * relWidth - proximity &&
            ratio < i * relWidth + proximity
          ) {
            if (this.state.selectedPage !== i)
              this.setState({ selectedPage: i });
          }
        }
      }
    }
  };

  render() {
    const { classes, images, aspectRatio } = this.props;
    const { selectedPage } = this.state;
    const swipeable = isTouchMobile();
    const platform = getPlatform();

    const TYPE_FIX = 0;
    const TYPE_BUTTONS = 1;
    const TYPE_SCROLL_SNAP = 2;
    const TYPE_SWIPE = 3;

    let type =
      images.length <= 1
        ? TYPE_FIX
        : supportsScrollSnap()
          ? TYPE_SCROLL_SNAP
          : isTouchMobile()
            ? TYPE_SWIPE
            : TYPE_BUTTONS;

    let imagesAnimated = images.map((image, i) => (
      <Motion
        key={i}
        defaultStyle={{ x: i - selectedPage }}
        style={{ x: spring(i - selectedPage) }}
      >
        {style => {
          let opacity = Math.max(0, 1 - Math.abs(style.x));
          return (
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image})`,
                opacity: opacity,
                WebkitTransform: `translateX(${style.x * 100}%)`,
                transform: `translateX(${style.x * 100}%)`,
              }}
            />
          );
        }}
      </Motion>
    ));

    let ratio = Math.round((1 / aspectRatio) * 100 * 10000) / 10000;
    return (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: type === TYPE_FIX ? `${ratio}%` : `calc(${ratio}% - 16px)`,
        }}
      >
        {type === TYPE_FIX &&
          images.length > 0 && (
            <div className={classes.imageSrc}>
              <img style={{ width: '100%', height: '100%' }} src={images[0]} />
            </div>
          )}

        {type === TYPE_SWIPE && (
          <div className={classes.slideContainer}>
            <SwipeableViews
              resistance={platform === 'ios'}
              index={selectedPage}
              onChangeIndex={this.handleChangeIndex}
            >
              {images.map((image, i) => (
                <img style={{ width: '100%', height: '100%' }} src={image} />
              ))}
            </SwipeableViews>
          </div>
        )}

        {type === TYPE_SCROLL_SNAP && (
          <div
            className={classes.scrollSnapContainer}
            onScroll={this.handleScroll}
          >
            {images.map((image, i) => (
              <div className={classes.scrollSnapChild}>
                <img style={{ width: '100%', height: '100%' }} src={image} />
              </div>
            ))}
          </div>
        )}

        {type === TYPE_BUTTONS && imagesAnimated}
        {!isMobile() && (
          <div style={{ pointerEvents: 'none' }}>{this.props.backdrop}</div>
        )}
        {type === TYPE_BUTTONS && (
          <div>
            <ButtonBase
              className={classes.carouselButton}
              onClick={() => this.handlePageChange(-1)}
              style={{ left: 0 }}
              aria-label="Previous"
            >
              <ChevronLeft />
            </ButtonBase>
            <ButtonBase
              className={classes.carouselButton}
              onClick={() => this.handlePageChange(1)}
              style={{ right: 0 }}
              aria-label="Next"
            >
              <ChevronRight />
            </ButtonBase>
          </div>
        )}

        {type !== TYPE_FIX && (
          <div className={classes.pageIndicatorContainer}>
            <PageIndicator
              size={8}
              gap={8}
              count={images.length}
              dotColor="rgba(255, 255, 255, 0.54)"
              selectedDotColor="rgba(255, 255, 255, 1)"
              selectedPage={selectedPage}
            />
          </div>
        )}
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  backdrop: PropTypes.any,
  aspectRatio: PropTypes.number,
};

Carousel.defaultProps = {
  images: [],
  aspectRatio: 3/2,
  backdrop: PropTypes.any
};

export default withStyles(styles)(Carousel);
