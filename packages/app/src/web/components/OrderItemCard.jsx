import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as FN from '@dinify/common/src/lib/FN';
import Price from '@dinify/common/src/components/price';

const styles = theme => ({
  image: {
    position: 'relative',
    borderRadius: '4px',
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.divider,
    overflow: 'hidden !important',
    '&:hover': {
      zIndex: 1,
    },
  },
  price: {
    color: theme.palette.text.secondary,
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

const OrderItemCard = ({ classes, orderItem }) => {
  const images = FN.MapToList(orderItem.menu_item.images).map(
    image => image.url,
  );
  return (
    <div>
      <div
        className={classes.image}
        style={{
          width: '100%',
          paddingTop: '66.6667%',
        }}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${images[0]})`,
          }}
        />
      </div>
      <Typography className={classes.price} variant="overline">
        <Price price={orderItem.menu_item.price} />
      </Typography>
      <Typography variant="subtitle1">{orderItem.menu_item.name}</Typography>
      <div style={{ width: 1000 }} />
      {/* <Typography noWrap >{orderItem.menu_item.description}</Typography> */}
    </div>
  );
};

export default withStyles(styles)(OrderItemCard);
