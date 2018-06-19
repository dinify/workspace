import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Carousel from './Carousel';

const styles = theme => ({
  image: {
    position: 'relative',
    borderRadius: '4px',
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.divider,
    boxShadow: theme.shadows[2],
    overflow: 'hidden !important',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.12,
      }
    },
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
});

const RestaurantListItem = ({
  classes,
  tags,
  images,
  name,
  shortDescription
}) => {
  return (
    <div>
      <ButtonBase
        disableRipple
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        style={{
          width: '100%'
        }}>
        <Carousel
          images={images}
          backdrop={(<span className={classes.imageBackdrop} />)}
        />
      </ButtonBase>
      {tags &&
        <Typography gutterBottom className={classes.category} variant="button" color="primary">
          {tags.join(' · ')}
        </Typography>
      }
      <Typography variant="title">
        {name}
      </Typography>
      <Typography variant="body1">
        {shortDescription}
      </Typography>
    </div>
  )
}

RestaurantListItem.propTypes = {
  name: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  shortDescription: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default withStyles(styles)(RestaurantListItem);
