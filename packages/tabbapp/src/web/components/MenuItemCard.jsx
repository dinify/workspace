import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'web/components/Typography';
import Grid from '@material-ui/core/Grid';
import Carousel from 'web/components/Carousel';
import * as FN from 'lib/FN';

const styles = theme => ({
  image: {
    position: 'relative',
    borderRadius: '4px',
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.divider,
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
  price: {
    color: theme.palette.text.secondary
  },
  imageSrc: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

const MenuItemCard = ({
  classes,
  menuItem
}) => {
  const images = FN.MapToList(menuItem.images).map(image => image.url)
  return (
    <div>
      <div
        className={classes.image}
        style={{
          width: '100%',
          paddingTop: '66.6667%'
        }}>
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${images[0]})`
          }}/>
      </div>
      <Typography
        className={classes.price}
        variant="overline">
        {FN.formatPrice(menuItem.price)}
      </Typography>
      <Typography variant="title">{menuItem.name}</Typography>
      <Typography noWrap variant="body1">{menuItem.description}</Typography>
    </div>
  );
};

export default withStyles(styles)(MenuItemCard);
