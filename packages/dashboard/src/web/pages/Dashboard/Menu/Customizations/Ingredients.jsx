import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from '@dinify/common/src/lib/i18n';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Text from 'web/components/MaterialInputs/Text';
import { getT } from '@dinify/common/src/lib/translation.ts';

import {
  fetchIngredientsAsync,
  createIngredientAsync,
  removeIngredientAsync,
  updateIngredientAsync,
} from 'features/ingredient/actions.ts';
import { listOfIngredients } from 'features/ingredient/selectors';
import { getDefaultLanguage } from 'features/restaurant/selectors';

let AddIngredientForm = ({ handleSubmit, progress, errorMessage, t, reset }) => {
  return (
    <form onSubmit={(...args) => { reset(); handleSubmit(...args) }} style={{ width: '100%' }}>
      <FormControl
        error={progress === 'ERROR'}
        aria-describedby="name-error-text"
        fullWidth
      >
        <Grid container spacing={0} alignItems="flex-end" justify="center">
          <Grid item xs={11}>
            <Field
              name="name"
              component={Text}
              componentProps={{
                label: t('menu.newIngredient'),
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
                placeholder: t('menu.newIngredientPlaceholder')
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Tooltip placement="top" title={t('menu.addIngredient')}>
              <IconButton type="submit" aria-label={t('menu.addIngredient')}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {progress === 'ERROR' ? (
          <FormHelperText>{errorMessage}</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>
    </form>
  );
};
AddIngredientForm = reduxForm({
  form: 'customizations/ingredient',
})(AddIngredientForm);

const Ingredients = ({
  createIngredient,
  ingredientsList,
  fetchIngredients,
  // ingredientsLoaded,
  removeIngredient,
  // updateIngredient,
  styles,
  progressMap,
  errorsMap,
  lang
}) => {
  const { t } = useTranslation();

  // const shouldLoad = ingredientsList.length < 1 && !ingredientsLoaded;
  useEffect(() => {
    fetchIngredients()
  }, []);
  // if (shouldLoad) return <Loading />;

  return (
    <React.Fragment>
      <Card square>
        <CardContent>
          <AddIngredientForm
            t={t}
            onSubmit={({ name }) => createIngredient({
              name,
              form: 'customizations/ingredient'
            })}
            progress={progressMap.CREATE_INGREDIENT}
            errorMessage={errorsMap.CREATE_INGREDIENT}
          />
        </CardContent>
      </Card>
      <List component="nav">
        {ingredientsList.map((ingredient) => (
          <ListItem dense style={styles.ListItem} key={ingredient.id}>
            <ListItemText primary={getT(ingredient.translations, lang)} />
            <Tooltip placement="left" title={t('delete')}>
              <IconButton
                aria-label={t('delete')}
                onClick={() => removeIngredient({ id: ingredient.id })}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default connect(
  state => ({
    ingredientsList: listOfIngredients(state),
    ingredientsLoaded: state.ingredient.loaded,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
    lang: getDefaultLanguage(state)
  }),
  {
    createIngredient: createIngredientAsync.request,
    removeIngredient: removeIngredientAsync.request,
    updateIngredient: updateIngredientAsync.request,
    fetchIngredients: fetchIngredientsAsync.request
  },
)(Ingredients);