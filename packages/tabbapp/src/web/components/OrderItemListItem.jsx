import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'web/components/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
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
});

const OrderItemListItem = ({
  classes,
  orderItem
}) => {
  const images = FN.MapToList(orderItem.menu_item.images).map(image => image.url)
  return (
    <div>
      <div
        className={classes.image}
        style={{
          width: '100%',
        }}>
        <Carousel
          images={images}
          backdrop={<span className={classes.imageBackdrop} />}
        />
      </div>
      <Grid container spacing={8}>
        <Grid item>
          <Typography
            className={classes.price}
            variant="overline">
            {`${orderItem.subtotal.amount} ${orderItem.subtotal.currency}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="title">{orderItem.menu_item.name}</Typography>
        </Grid>
      </Grid>
      <Typography noWrap variant="body1">{orderItem.menu_item.description}</Typography>
    </div>
  );
};

export default withStyles(styles)(OrderItemListItem);
