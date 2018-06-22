// @flow
import React from 'react';
import R from 'ramda';
import * as FN from 'lib/FN';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'web/components/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Carousel from './Carousel';
import { Link } from 'react-router';

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
      },
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
  restaurant,

}) => {
  const images = R.pluck('url')(FN.MapToList(restaurant.images));
  const shortDescription = 'Sweet and savory crepes in a space like a country cafe';
  const tags = null;
  return (
    <div>
      <ButtonBase
        disableRipple
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        style={{
          width: '100%',
        }}
      >
        <Carousel
          images={images}
          backdrop={<span className={classes.imageBackdrop} />}
        />
      </ButtonBase>
      {tags && (
        <Typography
          gutterBottom
          className={classes.category}
          variant="overline"
          color="primary"
        >
          {tags.join(' · ')}
        </Typography>
      )}
      <Link to={`/restaurant/${restaurant.id}`}>
        <Typography variant="title">{restaurant.name}</Typography>
      </Link>
      <Typography variant="body1">{shortDescription}</Typography>
    </div>
  );
};

export default withStyles(styles)(RestaurantListItem);
