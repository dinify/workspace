import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@dinify/common/dist/components/Typography';
import { Link } from 'react-router-dom';
import * as FN from '@dinify/common/dist/lib/FN';
import Price from 'web/components/Price';

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
  const MenuItemLink = props => <Link to={`/menu/item/${menuItem.id}${FN.isInstalled() ? '?source=pwa' : ''}`} {...props}/>

  return (
    <MenuItemLink
      style={{
        textDecoration: 'none',
        width: '100%',
      }}>
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
      <Typography variant="subtitle1">{menuItem.name}</Typography>
      <Typography
        className={classes.price}
        variant="overline">
        <Price price={menuItem.price}/>
      </Typography>
      <div style={{width: 1000}} />
      { /* <Typography noWrap >{menuItem.description}</Typography> */ }
    </MenuItemLink>
  );
};

export default withStyles(styles)(MenuItemCard);
