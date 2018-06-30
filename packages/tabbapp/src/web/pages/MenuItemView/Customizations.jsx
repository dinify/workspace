import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from 'web/components/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import AddCircle from 'icons/AddCircle';
import RemoveCircle from 'icons/RemoveCircle';
import AddShoppingCart from 'icons/AddShoppingCart';
import * as FN from 'lib/FN';
import uniqueId from 'lodash.uniqueid';
import {
  excludeIngredient as excludeIngredientAction,
  incAddonQty as incAddonQtyAction,
  selectChoice as selectChoiceAction
} from 'ducks/menuItem/actions';

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
  }
});

let Customizations = ({
  classes,
  menuItem,
  excludeIngredient,
  incAddonQty,
  selectChoice,
}) => {

  const ingredients = FN.MapToList(menuItem.ingredients);
  const addons = FN.MapToList(menuItem.addons);
  const options = FN.MapToList(menuItem.options);

  return (
    <div>
      <Typography
        style={{marginTop: 16}}
        color="primary"
        variant="overline">
        Ingredients
      </Typography>
      <List>
        {ingredients.map(ingredient =>
          <ListItem
            key={uniqueId()}
            style={{padding: 0}}
            role={undefined}
            disabled={!ingredient.excludable}
            dense
            button
            onClick={() => {
              excludeIngredient({
                menuItemId: menuItem.id,
                ingredientId: ingredient.id,
                excluded: !ingredient.excluded
              })
            }} // toggle checkbox state
            className={classes.listItem}>
            {ingredient.excludable ?
              <Checkbox
                icon={<RemoveCircle />}
                checkedIcon={<AddCircle />}
                checked={ingredient.excluded}
                tabIndex={-1}
                disableRipple/> :
                <div style={{width: 48, height: 40}}/>
            }
            <ListItemText
              primary={ingredient.name}
              style={{
                textDecoration: ingredient.excluded ? 'line-through' : 'none'
              }}
            />
          </ListItem>
        )}
      </List>

      <Divider />

      {addons.length &&
        <Typography
          style={{marginTop: 16}}
          color="primary"
          variant="overline">
          Addons
        </Typography>
      }
      {addons.map(addon =>
        <Grid key={uniqueId()} container wrap="nowrap" style={{marginTop: 8, alignItems: 'center'}} spacing={16}>
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
              <RemoveCircle className={classes.secondary} />
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
              disabled={false}>
              <AddCircle className={classes.secondary} />
            </IconButton>
          </Grid>
        </Grid>
      )}

      <Divider style={{marginTop: 16}} />

      {options.map(option => {
        return (
          <div key={uniqueId()}>
            <Typography
              style={{marginTop: 32}}
              className={classes.secondary}
              variant="overline">
              {option.name}
            </Typography>
            <div className={classes.chipContainer}>
              {FN.MapToList(option.choices).map((choice) =>
                <Chip
                  key={uniqueId()}
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
        onClick={() => {}} // add item to cart
        style={{marginTop: 24, marginBottom: 32}}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}>
        <AddShoppingCart style={{marginRight: 16}} />
        Add to cart
      </Button>
    </div>
  )
}

Customizations = connect(
  null,
  {
    excludeIngredient: excludeIngredientAction,
    incAddonQty: incAddonQtyAction,
    selectChoice: selectChoiceAction,
  }
)(Customizations)

export default withStyles(styles)(Customizations);
