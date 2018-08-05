import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from 'web/components/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import AddCircle from 'icons/AddCircle';
import RemoveCircle from 'icons/RemoveCircle';
import AddShoppingCart from 'icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import * as FN from 'lib/FN';
import {
  excludeIngredient as excludeIngredientAction,
  incAddonQty as incAddonQtyAction,
  selectChoice as selectChoiceAction
} from 'ducks/menuItem/actions';
import { withStateHandlers } from 'recompose';
import { addToCartInit } from 'ducks/cart/actions';
import cartTypes from 'ducks/cart/types';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  selected: {
    backgroundColor: fade(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    '&:hover, &:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.24),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: fade(theme.palette.primary.main, 0.38),
    },
  },
  excluded: {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary
  }
});

let Customizations = ({
  classes,
  menuItem,
  excludeIngredient,
  incAddonQty,
  selectChoice,
  addToCart,
  onSnackClose,
  addToCartDone,
  history,
}) => {

  const ingredients = FN.MapToList(menuItem.ingredients);
  const addons = FN.MapToList(menuItem.addons);
  const options = FN.MapToList(menuItem.options);

  let allNonExcludable = true;
  ingredients.forEach(ingredient => {
    allNonExcludable = allNonExcludable && !ingredient.pivot.excludable;
  });

  return (
    <div>
      {ingredients.length > 0 && <Typography
        style={{marginTop: 16}}
        color="primary"
        variant="overline">
        Ingredients
      </Typography>}

      {ingredients.length > 0 && ingredients.map(ingredient =>
        <div key={ingredient.id} style={{width: '100%', marginTop: allNonExcludable ? 0 : 8}}>
          <ButtonBase
            style={{borderRadius: 4, width: '100%'}}
            disabled={!ingredient.pivot.excludable}
            onClick={() => {
              excludeIngredient({
                menuItemId: menuItem.id,
                ingredientId: ingredient.id,
                excluded: !ingredient.excluded
              })
            }}>
            <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
              {ingredient.pivot.excludable ?
                <div style={{width: 40, height: 40, marginRight: 8, padding: 8}}>
                  {ingredient.excluded ?
                    <AddCircle className={classes.secondary}/> :
                    <RemoveCircle className={classes.secondary}/>
                  }
                </div> :
                <div style={{width: allNonExcludable ? 0 : 48, height: 40}}/>
              }
              <Typography
                variant="body1"
                color={ingredient.excluded ? 'textSecondary' : 'default'}
                style={{
                  textDecoration: ingredient.excluded ? 'line-through' : 'none'
                }}>
                {ingredient.name}
              </Typography>
            </div>
          </ButtonBase>
        </div>
      )}

      {addons.length > 0 && <Divider style={{marginTop: 16}} />}

      {addons.length > 0 &&
        <Typography
          style={{marginTop: 16}}
          color="primary"
          variant="overline">
          Addons
        </Typography>
      }
      {addons.length > 0 && addons.map(addon =>
        <Grid key={addon.id} container wrap="nowrap" style={{marginTop: 8, alignItems: 'center'}} spacing={16}>
          <Grid item>
            <IconButton
              onClick={() => {
                if (addon.qty > 0) incAddonQty({
                  menuItemId: menuItem.id,
                  addonId: addon.id,
                  inc: - 1
                })
              }} // remove addon if amount > 0
              disabled={!addon.qty || addon.qty < 1}>
              <RemoveCircle />
            </IconButton>
          </Grid>
          <Grid item style={{flex: 1}}>
            <Typography className={classes.secondary} variant="overline">
              {FN.formatPrice(addon.price)}
            </Typography>
            <Typography variant="body1">
              {addon.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subheading">
              {addon.qty ? `× ${addon.qty}` : ''}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                incAddonQty({
                  menuItemId: menuItem.id,
                  addonId: addon.id,
                  inc: 1
                })
              }}  // add addon if amount < max - 1
              disabled={addon.qty >= addon.maximum}>
              <AddCircle />
            </IconButton>
          </Grid>
        </Grid>
      )}

      {options.length > 0 && <Divider style={{marginTop: 16}} />}

      {options.length > 0 && options.map(option => {
        return (
          <div key={option.id}>
            <Typography
              style={{marginTop: 32}}
              className={classes.secondary}
              variant="overline">
              {option.name}
            </Typography>
            <div className={classes.chipContainer}>
              {FN.MapToList(option.choices).map((choice) =>
                <Chip
                  key={choice.id}
                  classes={{root: choice.selected ? classes.selected : null}} // add class if selected
                  onClick={() => {
                    selectChoice({
                      menuItemId: menuItem.id,
                      optionId: option.id,
                      choiceId: choice.id,
                    })
                  }} // select choice
                  className={classes.chip}
                  label={choice.name}/>
              )}
            </div>
          </div>
        )
      })}
      <Button
        onClick={() => {
          addToCart({ menuItemId: menuItem.id });
          history.goBack();
        }} // add item to cart
        style={{marginTop: 24, marginBottom: 32}}
        fullWidth
        variant="extendedFab"
        color="primary"
        className={classes.button}
      >
        <AddShoppingCart style={{marginRight: 16}} />
        <span>Add to cart</span>
      </Button>
    </div>
  )
}

Customizations = connect(
  (state) => ({
    addToCartDone: state.ui.progressMap[cartTypes.ADD_TO_CART_DONE]
  }),
  {
    excludeIngredient: excludeIngredientAction,
    incAddonQty: incAddonQtyAction,
    selectChoice: selectChoiceAction,
    addToCart: addToCartInit,
  }
)(Customizations)

export default withRouter(withStyles(styles)(Customizations));
