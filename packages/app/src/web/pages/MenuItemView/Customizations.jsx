import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { useTranslation } from 'react-i18next';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import AddCircle from '@material-ui/icons/AddCircleRounded';
import RemoveCircle from '@material-ui/icons/RemoveCircleRounded';
import Price from 'web/components/Price';
import {
  excludeIngredient as excludeIngredientAction,
  incAddonQty as incAddonQtyAction,
  selectChoice as selectChoiceAction
} from 'ducks/menuItem/actions.ts';
import { addToCartAsync } from 'ducks/cart/actions.ts';
import { getType } from 'typesafe-actions';
import { getT } from 'lib/translation.ts';
import { getUserLang } from 'ducks/user/selectors.ts';

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
  addons,
  ingredients,
  options,
  choices,
  menuAddons,
  menuIngredients,
  menuOptions,
  selectedAddons,
  selectedExcludes,
  selectedChoices,
  userLang
}) => {

  const { t } = useTranslation();

  // const selectCount = 0;

  const allNonExcludable = true;

  if (!menuItem.menuIngredients) return <div />;

  return (
    <div>
      {menuItem.menuIngredients.length > 0 && <Divider style={{marginTop: 16}} />}

      {menuItem.menuIngredients.length > 0 && <Typography
        style={{marginTop: 32}}
        color="primary"
        variant="overline">
        {t('ingredients')}
      </Typography>}


      {menuItem.menuIngredients.length > 0 && menuItem.menuIngredients.map(menuIngredientId => {
        const menuIngredient = menuIngredients[menuIngredientId];
        if (!menuIngredient) return null;
        const ingredient = ingredients[menuIngredient.ingredientId];
        
        let excluded = false;
        const relevantSE = selectedExcludes[menuItem.id];
        if (relevantSE && relevantSE[ingredient.id]) {
          excluded = true;
        }

        return (<div key={ingredient.id} style={{width: '100%', marginTop: allNonExcludable ? 0 : 8}}>
          <ButtonBase
            style={{borderRadius: 4, width: '100%'}}
            disabled={!menuIngredient.excludable}
            onClick={() => {
              excludeIngredient({
                menuItemId: menuItem.id,
                ingredientId: ingredient.id,
                excluded: !excluded
              })
            }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              width: '100%'
            }}>
              <Typography

                color={excluded ? 'textSecondary' : 'default'}
                style={{
                  flex: 1,
                  textAlign: 'start',
                  paddingLeft: 16,
                  textDecoration: excluded ? 'line-through' : 'none'
                }}>
                {getT(ingredient.translations, userLang)}
              </Typography>
              {menuIngredient.excludable ?
                <div style={{width: 40, height: 40, marginRight: 8, padding: 8}}>
                  {excluded ?
                    <AddCircle className={classes.secondary}/> :
                    <RemoveCircle className={classes.secondary}/>
                  }
                </div> :
                <div style={{ width: allNonExcludable ? 0 : 48, height: 40 }}/>
              }
            </div>
          </ButtonBase>
        </div>);
      })}

      {menuItem.menuAddons.length > 0 && <Divider style={{marginTop: 16}} />}

      {menuItem.menuAddons.length > 0 &&
        <Typography
          style={{marginTop: 16}}
          color="primary"
          variant="overline">
          {t('addons')}
        </Typography>
      }
      {menuItem.menuAddons.length > 0 && menuItem.menuAddons.map(menuAddonId => {
        const menuAddon = menuAddons[menuAddonId];
        if (!menuAddon) return null;
        const addon = addons[menuAddon.addonId];

        let amount = 0;
        const relevantSA = selectedAddons[menuItem.id];
        if (relevantSA && relevantSA[addon.id]) {
          amount = relevantSA[addon.id].amount;
        }
        
        return (<Grid key={addon.id} container wrap="nowrap" style={{marginTop: 8, alignItems: 'center'}} spacing={16}>
          <Grid item>
            <IconButton
              onClick={() => {
                if (amount > 0) incAddonQty({
                  menuItemId: menuItem.id,
                  addonId: addon.id,
                  inc: - 1
                })
              }} // remove addon if amount > 0
              disabled={amount < 1}>
              <RemoveCircle />
            </IconButton>
          </Grid>
          <Grid item style={{flex: 1}}>
            <Typography className={classes.secondary} variant="overline">
              <Price price={addon.price} />
            </Typography>
            <Typography >
              {getT(addon.translations, userLang)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {amount ? `× ${amount}` : ''}
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
              disabled={amount >= addon.maximum && addon.maximum !== null}>
              <AddCircle />
            </IconButton>
          </Grid>
        </Grid>)
      })}

      {menuItem.menuOptions.length > 0 && <Divider style={{marginTop: 16}} />}

      {menuItem.menuOptions.length > 0 && menuItem.menuOptions.map(menuOptionId => {

        const menuOption = menuOptions[menuOptionId];
        if (!menuOption) return null;
        const option = options[menuOption.optionId];

        return (
          <div key={option.id}>
            <Typography
              style={{marginTop: 32}}
              className={classes.secondary}
              variant="overline">
              {getT(option.translations, userLang)}
            </Typography>
            <div className={classes.chipContainer}>
              {option.choices.map((choiceId) => {
                const choice = choices[choiceId];
                const parsedAmt = choice.difference ? parseFloat(choice.difference.amount) : 0;
                let selected = false;
                const relevantSC = selectedChoices[menuItem.id];
                if (relevantSC && relevantSC[choice.id]) selected = true;
                return (
                  <Chip
                    variant="outlined"
                    key={choice.id}
                    avatar={parsedAmt !== 0 ? (
                      <div className={classes.chipDifference}>
                        <Typography variant="caption">
                          <Price price={choice.difference} />
                        </Typography>
                      </div>
                    ) : null}
                    classes={{root: selected ? classes.selected : null}} // add class if selected
                    onClick={() => {
                      selectChoice({
                        menuItemId: menuItem.id,
                        optionId: option.id,
                        choiceId: choice.id,
                      })
                    }} // select choice
                    className={classes.chip}
                    label={getT(choice.translations, userLang)}/>
                );
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

Customizations = connect(
  (state) => ({
    addToCartDone: state.ui.progressMap[getType(addToCartAsync.success)],
    menuAddons: state.menuItem.menuAddons,
    menuIngredients: state.menuItem.menuIngredients,
    menuOptions: state.menuItem.menuOptions,
    addons: state.addon.all,
    ingredients: state.ingredient.all,
    options: state.option.all,
    choices: state.option.choices,
    selectedAddons: state.menuItem.selectedAddons,
    selectedExcludes: state.menuItem.selectedExcludes,
    selectedChoices: state.menuItem.selectedChoices,
    userLang: getUserLang(state)
  }), {
    excludeIngredient: excludeIngredientAction,
    incAddonQty: incAddonQtyAction,
    selectChoice: selectChoiceAction,
    addToCart: addToCartAsync.request,
  }
)(Customizations)

export default withRouter(withStyles(styles)(Customizations));
