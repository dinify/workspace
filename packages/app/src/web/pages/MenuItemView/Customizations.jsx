import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@dinify/common/dist/components/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import AddCircle from '@material-ui/icons/AddCircleRounded';
import RemoveCircle from '@material-ui/icons/RemoveCircleRounded';
import AddShoppingCart from '@material-ui/icons/AddShoppingCartRounded';
import * as FN from '@dinify/common/dist/lib/FN';
import {
  excludeIngredient as excludeIngredientAction,
  incAddonQty as incAddonQtyAction,
  selectChoice as selectChoiceAction
} from 'ducks/menuItem/actions';
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
  chipDifference: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: theme.palette.divider,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 16,
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
  // onSnackClose, addToCartDone,
  history,
}) => {

  const ingredients = FN.MapToList(menuItem.ingredients);
  const addons = FN.MapToList(menuItem.addons);
  const options = FN.MapToList(menuItem.options);

  let selectCount = 0;
  options.map(option => {
    let selected = false;
    FN.MapToList(option.choices).map((choice) => {
      selected = selected || choice.selected;
      return null;
    });
    if (selected) selectCount += 1;
    return null;
  });

  let allNonExcludable = true;
  ingredients.forEach(ingredient => {
    allNonExcludable = allNonExcludable && !ingredient.pivot.excludable;
  });

  return (
    <div>
      {ingredients.length > 0 && <Divider style={{marginTop: 16}} />}

      {ingredients.length > 0 && <Typography
        style={{marginTop: 32}}
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              width: '100%'
            }}>
              <Typography

                color={ingredient.excluded ? 'textSecondary' : 'default'}
                style={{
                  flex: 1,
                  textAlign: 'start',
                  paddingLeft: 16,
                  textDecoration: ingredient.excluded ? 'line-through' : 'none'
                }}>
                {ingredient.name}
              </Typography>
              {ingredient.pivot.excludable ?
                <div style={{width: 40, height: 40, marginRight: 8, padding: 8}}>
                  {ingredient.excluded ?
                    <AddCircle className={classes.secondary}/> :
                    <RemoveCircle className={classes.secondary}/>
                  }
                </div> :
                <div style={{width: allNonExcludable ? 0 : 48, height: 40}}/>
              }
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
            <Typography >
              {addon.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
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
              disabled={addon.qty >= addon.maximum && addon.maximum !== null}>
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
              {FN.MapToList(option.choices).map((choice) => {
                const parsedAmt = choice.difference ? parseFloat(choice.difference.amount) : 0;
                return (
                  <Chip
                    variant="outlined"
                    key={choice.id}
                    avatar={parsedAmt !== 0 ? (
                      <div className={classes.chipDifference}>
                        <Typography variant="caption">
                          {FN.formatPrice(choice.difference)}
                        </Typography>
                      </div>
                    ) : null}
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
                );
              })}
            </div>
          </div>
        )
      })}
      <Button
        onClick={() => {
          addToCart({ menuItemId: menuItem.id });
          history.goBack();
        }} // add item to cart
        style={{marginTop: 24, marginBottom: 16}}
        disabled={selectCount < options.length && options.length !== 0}
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
