import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import PageIndicator from './PageIndicator';
import ChevronRight from 'icons/ChevronRight';
import ChevronLeft from 'icons/ChevronLeft';
import SwipeableViews from 'react-swipeable-views';
import { isTouchMobile, getPlatform } from 'utils';
import { Motion, spring } from 'react-motion';

const styles = theme => ({
  carouselButton: {
    position: 'absolute',
    width: 56,
    height: '100%',
    top: 0,
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)'
    }
  },
  focusVisible: {},
  imageSrc: {
    position: 'absolute',
    borderRadius: '4px',
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
    top: 0,
    '& $div': {
      width: '100%',
      height: '100%'
    }
  },
  pageIndicatorContainer: {
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'center'
  },
});

class Carousel extends React.Component {
  state = {
    selectedPage: 0
  };

  handlePageChange = (delta) => {
    let pageCount = this.props.images.length;
    if (delta < 0 && this.state.selectedPage <= 0) {
      this.setState({selectedPage: pageCount - 1});
    }
    else if (delta > 0 && this.state.selectedPage >= pageCount - 1) {
      this.setState({selectedPage: 0});
    }
    else this.setState({selectedPage: this.state.selectedPage + delta});
  }

  handleChangeIndex = index => {
    this.setState({ selectedPage: index });
  };

  render() {
    const { classes, images } = this.props;
    const { selectedPage } = this.state;
    const swipeable = isTouchMobile();
    const platform = getPlatform();

    let controls = images.length <= 1 ? null : (
      <div>
        {!swipeable && <ButtonBase
          className={classes.carouselButton}
          onClick={() => this.handlePageChange(-1)}
          style={{left: 0}} aria-label="Previous">
          <ChevronLeft />
        </ButtonBase>}

        {!swipeable && <ButtonBase
          className={classes.carouselButton}
          onClick={() => this.handlePageChange(1)}
          style={{right: 0}} aria-label="Next">
          <ChevronRight />
        </ButtonBase>}

        <div className={classes.pageIndicatorContainer}>
          <PageIndicator
            size={8} gap={8}
            count={images.length}
            dotColor="rgba(255, 255, 255, 0.54)"
            selectedDotColor="rgba(255, 255, 255, 1)"
            selectedPage={selectedPage}/>
        </div>
      </div>
    );

    let imagesAnimated = images.map((image, i) =>
      <Motion
        key={i}
        defaultStyle={{x: selectedPage - i}}
        style={{x: spring(selectedPage - i)}}>
        {style => {
          let opacity = Math.max(0, 1 - Math.abs(style.x));
          return <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image})`,
              opacity: opacity,
              WebkitTransform: `translateX(${style.x * 100}%)`,
              transform: `translateX(${style.x * 100}%)`
            }}/>;
        }}
      </Motion>
    );

    return (
      <div
        style={{
          width: '100%',
          paddingTop: images.length <= 1 ? '66.6667%' : 'calc(66.6667% - 16px)',
        }}>

        {swipeable && (
          <div className={classes.slideContainer}>
            <SwipeableViews
              resistance={platform === "ios"}
              index={selectedPage}
              onChangeIndex={this.handleChangeIndex}>
              {images.map((image, i) => <img style={{width: '100%', height: '100%'}} src={image}/>)}
            </SwipeableViews>
          </div>
        )}

        {!swipeable && imagesAnimated}

        {!swipeable && this.props.backdrop}
        {controls}
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  backdrop: PropTypes.any
};

export default withStyles(styles)(Carousel);
