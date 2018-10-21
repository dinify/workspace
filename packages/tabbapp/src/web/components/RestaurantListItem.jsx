// @flow
import React from 'react';
import R from 'ramda';
import * as FN from 'tabb-front/dist/lib/FN';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    '&:hover': {
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
  const allTags = FN.MapToList(restaurant.tags);
  const tags = [];
  allTags.forEach(tag => {
    if (tags.join().length + tag.name.length <= 25) {
      tags.push(tag.name.split('_').join(' '))
    }
  });


  const RestaurantLink = props => <Link to={`/restaurant/${restaurant.subdomain}${FN.isInstalled() ? '?source=pwa' : ''}`} {...props}/>
  return (
    <RestaurantLink
      style={{
        textDecoration: 'none',
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
            variant="overline"
            color="primary"
          >
            {tags.join(' · ')}
          </Typography>
        )}

        <Typography variant="h6">{restaurant.name}</Typography>
        { /* <Typography >{restaurant.description}</Typography> */}
      </div>
    </RestaurantLink>
  );
};

export default withStyles(styles)(RestaurantListItem);
