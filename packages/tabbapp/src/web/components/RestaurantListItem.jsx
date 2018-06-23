// @flow
import React from 'react';
import R from 'ramda';
import * as FN from 'lib/FN';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'web/components/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

const styles = theme => ({
  image: {
    position: 'relative',
    borderRadius: 4,
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
  let allTags = FN.MapToList(restaurant.tags);
  let tags = [];
  allTags.forEach(tag => {
    if (tags.join().length + tag.name.length <= 25) {
      tags.push(tag.name.split('_').join(' '))
    }
  });

  const RestaurantLink = props => <Link to={`/restaurant/${restaurant.subdomain}`} {...props}/>
  return (
    <ButtonBase
      component={RestaurantLink}
      disableRipple
      style={{
        width: '100%',
      }}
    >
      <div style={{width: '100%'}}>
        <div style={{width: '100%'}} className={classes.image}>
          <Carousel
            borderRadius={4}
            aspectRatio={3/2}
            images={images}
            backdrop={<span className={classes.imageBackdrop} />}
          />
        </div>
        {tags && (
          <Typography
            gutterBottom
            className={classes.category}
            variant="body2"
            color="primary"
          >
            {tags.join(' · ')}
          </Typography>
        )}

        <Typography variant="title">{restaurant.name}</Typography>
        <Typography variant="body1">{restaurant.description}</Typography>
      </div>
    </ButtonBase>
  );
};

export default withStyles(styles)(RestaurantListItem);
