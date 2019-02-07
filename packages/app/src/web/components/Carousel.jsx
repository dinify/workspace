import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import PageIndicator from './PageIndicator';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import ChevronLeft from '@material-ui/icons/ChevronLeftRounded';
import SwipeableViews from 'react-swipeable-views';
import {
  isTouchMobile,
  isMobile,
  getPlatform,
  supportsScrollSnap,
} from 'tabb-front/dist/lib/FN';
import { Motion, spring } from 'react-motion';
import isFunction from 'lodash.isfunction';

const styles = () => ({
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
    '& div': {
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
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'x mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
  scrollSnapChild: {
    position: 'relative',
    borderRadius: props => props.borderRadius,
    height: '100%',
    width: '100%',
    display: 'inline-block',
    WebkitOverflowScrolling: 'touch',
    scrollSnapAlign: 'start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

class Carousel extends React.Component {
  state = {
    selectedPage: 0,
  };

  handlePageChange = (delta, e) => {
    e.preventDefault();
    const pageCount = this.props.images.length;
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
    const ratio = e.target.scrollLeft / e.target.scrollWidth;
    const count = this.props.images ? this.props.images.length : 0;
    if (count > 1) {
      const relWidth = 1 / count;
      const proximity = relWidth / 20;
      const last = count - 1;
      if (ratio >= 0 && ratio < 2 * proximity) {
        if (this.state.selectedPage !== 0) this.setState({ selectedPage: 0 });
      } else if (
        ratio > last * relWidth - proximity * 2 &&
        ratio <= last * relWidth
      ) {
        if (this.state.selectedPage !== last)
          this.setState({ selectedPage: last });
      } else {
        for (let i = 1; i < last; i += 1) {
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
    const { classes, images, aspectRatio, borderRadius, backdrop, fixed } = this.props;
    const { selectedPage } = this.state;
    // const swipeable = isTouchMobile();
    const platform = getPlatform();

    const TYPE_FIX = 0;
    const TYPE_BUTTONS = 1;
    const TYPE_SCROLL_SNAP = 2;
    const TYPE_SWIPE = 3;

    const type =
      (images.length <= 1 || fixed)
        ? TYPE_FIX
        : supportsScrollSnap()
          ? TYPE_SCROLL_SNAP
          : isTouchMobile()
            ? TYPE_SWIPE
            : TYPE_BUTTONS;

    const imagesAnimated = images.map((image, i) => (
      <Motion
        key={image}
        defaultStyle={{ x: i - selectedPage }}
        style={{ x: spring(i - selectedPage) }}
      >
        {style => {
          return (
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image})`,
                WebkitTransform: `translateX(${style.x * 100}%)`,
                transform: `translateX(${style.x * 100}%)`,
              }}
            />
          );
        }}
      </Motion>
    ));

    const ratio = Math.round((1 / aspectRatio) * 100 * 10000) / 10000;
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
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${images[0]})`
              }}
            />
          )}

        {type === TYPE_SWIPE && (
          <div className={classes.slideContainer}>
            <SwipeableViews
              resistance={platform === 'ios'}
              index={selectedPage}
              onChangeIndex={this.handleChangeIndex}
            >
              {images.map((image) => (
                <span
                  key={image}
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${image})`
                  }}
                />
              ))}
            </SwipeableViews>
          </div>
        )}

        {type === TYPE_SCROLL_SNAP && (
          <div
            className={classes.scrollSnapContainer}
            onScroll={this.handleScroll}
          >
            {images.map((image) => (
              <div
                key={image}
                className={classes.scrollSnapChild}
                style={{
                  borderRadius,
                  backgroundImage: `url(${image})`
                }}/>
            ))}
          </div>
        )}

        {type === TYPE_BUTTONS && imagesAnimated}
        {!isMobile() && (
          <div style={{ pointerEvents: 'none' }}>{isFunction(backdrop) ? backdrop() : backdrop}</div>
        )}
        {type === TYPE_BUTTONS && (
          <div>
            <ButtonBase
              className={classes.carouselButton}
              onClick={(e) => this.handlePageChange(-1, e)}
              style={{ left: 0 }}
              aria-label="Previous"
            >
              <ChevronLeft />
            </ButtonBase>
            <ButtonBase
              className={classes.carouselButton}
              onClick={(e) => this.handlePageChange(1, e)}
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

Carousel.defaultProps = {
  images: [],
  fixed: false,
  aspectRatio: 3/2
};

export default withStyles(styles)(Carousel);
