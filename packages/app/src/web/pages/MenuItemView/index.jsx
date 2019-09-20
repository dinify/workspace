import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import { useTranslation } from 'react-i18next';
import FavoriteToggle from 'web/components/FavoriteToggle';
import Typography from '@material-ui/core/Typography';
import ResponsiveContainer from '@dinify/common/dist/components/ResponsiveContainer';
import AddShoppingCart from '@material-ui/icons/AddShoppingCartRounded';
import Fab from '@material-ui/core/Fab';
import Carousel from 'web/components/Carousel';
import Price from 'web/components/Price';
import * as FN from '@dinify/common/dist/lib/FN';
import uniqueId from 'lodash.uniqueid';
import {
  favMenuitemInit,
  fetchMenuItemAsync,
  clearCustomizationsAction
} from 'ducks/menuItem/actions.ts';
import { getT } from 'lib/translation.ts';
import { addToCartAsync } from 'ducks/cart/actions.ts';
import { getUserLang } from 'ducks/user/selectors.ts';
import Customizations from './Customizations';
import NutritionFacts from './NutritionFacts';

const styles = theme => ({
  category: {
    paddingTop: theme.spacing.unit
  },
  imageContainer: {
    height: 256,
    width: '100%',
    maxWidth: '100%',
    overflowX: 'scroll',
    overflowY: 'hidden'
  },
  image: {
    borderRadius: 4,
    boxShadow: theme.shadows[2],
  },
  imageSrc: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  secondary: {
    color: theme.palette.text.secondary
  },
});

let MenuItemView = props => {

  const {
    width,
    classes,
    menuItem,
    favMenuitem,
    userLang,
    fetchMenuItem,
    clearCustomizations,
    match: { params },
    addToCart,
    history
  } = props;

  useEffect(() => {
    clearCustomizations({ menuItemId: params.id })
    fetchMenuItem({ menuItemId: params.id });
  }, []);

  if (!menuItem) return <div />;
  const images = FN.MapToList(menuItem.images);

  const extraSmallScreen = isWidthDown('xs', width);
  const smallScreen = isWidthDown('sm', width);
  const mediumScreen = isWidthUp('md', width);

  const sm = isWidthDown('sm', width);
  const md = !sm && isWidthDown('md', width);
  const lg = !md && isWidthDown('lg', width);

  const { t } = useTranslation();

  return (
    <div>
      {extraSmallScreen &&
        <Carousel images={images.map(image => image.url)}/>
      }
      {!extraSmallScreen &&
        <Grid container wrap="nowrap" spacing={8} className={classes.imageContainer}>
          {images.map((image, i) =>
            <Grid item key={uniqueId()} style={{minWidth: sm ? '50%' : (md ? '33.3333%' : (lg ? '25%' : '20%'))}} xs={12}>
              <div
                className={classes.imageSrc}
                style={{
                  borderRadius: i === 0 ? '0 0 4px 0' : (i === images.length - 1 ? '0 0 0 4px' : '0 0 4px 4px'),
                  backgroundImage: `url(${image.url})`
                }}
              />
            </Grid>
          )}
        </Grid>
      }

      <ResponsiveContainer>
        <Grid container spacing={mediumScreen ? 24 : 16} style={{marginTop: mediumScreen ? 24 : 16}}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={0}>
              <Grid item style={{flex: 1}}>
                <Typography variant="h6">{getT(menuItem.translations, userLang)}</Typography>
                <Typography gutterBottom variant="subtitle1">
                  <Price price={menuItem.price} />
                </Typography>
              </Grid>
              <Grid item>
                <FavoriteToggle
                  checked={menuItem.favorite}
                  onChange={() => favMenuitem({
                    fav: !menuItem.favorite,
                    id: menuItem.id
                  })}
                />
              </Grid>
            </Grid>
            <Typography>{getT(menuItem.translations, userLang, 'description')}</Typography>
            {menuItem.calories && <div style={{marginTop: 16}}>
              <NutritionFacts calories={menuItem.calories} />
            </div>}
          </Grid>
          <Grid item xs={12} md={6}>
            {smallScreen && <Customizations menuItem={menuItem}/>}
            {!smallScreen && <Paper style={{padding: 16}}>
              {<Customizations menuItem={menuItem}/>}
            </Paper>}

            <Fab
              onClick={() => {
                addToCart({ menuItemId: menuItem.id });
                history.goBack();
              }} // add item to cart
              style={{marginTop: 24, marginBottom: 64, width: '100%'}}
              // disabled={selectCount < options.length && options.length !== 0}
              variant="extended"
              color="primary"
              className={classes.button}
            >
              <AddShoppingCart style={{marginRight: 16}} />
              <span>{t('cart.add')}</span>
            </Fab>

          </Grid>
        </Grid>
      </ResponsiveContainer>
    </div>
  );

}

MenuItemView = connect(
  (state, { match }) => ({
    menuItem: state.menuItem.all[match.params.id],
    userLang: getUserLang(state)
  }), {
    fetchMenuItem: fetchMenuItemAsync.request,
    favMenuitem: favMenuitemInit,
    clearCustomizations: clearCustomizationsAction,
    addToCart: addToCartAsync.request,
  }
)(MenuItemView)

export default withStyles(styles)(withWidth()(MenuItemView));
