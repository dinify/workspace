import React from 'react';
import { connect } from 'react-redux';
import * as FN from '@dinify/common/dist/lib/FN';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';

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

import {
  createIngredientInit,
  removeIngredientInit,
  updateIngredientInit,
} from 'ducks/ingredient/actions';

let AddIngredientForm = ({ handleSubmit, progress, errorMessage, t }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
  ingredients,
  removeIngredient,
  // updateIngredient,
  styles,
  progressMap,
  errorsMap,
}) => {
  const ingredientsList = FN.MapToList(ingredients).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const { t } = useTranslation();
  return (
    <div>
      <Card square>
        <CardContent>
          <AddIngredientForm
            t={t}
            onSubmit={({ name }) => createIngredient({
              name,
              form: 'customizations/ingredient'
            })}
            progress={progressMap['CREATE_INGREDIENT']}
            errorMessage={errorsMap['CREATE_INGREDIENT']}
          />
        </CardContent>
      </Card>
      <List component="nav">
        {ingredientsList.map((ingredient, i) => (
          <div key={ingredient.id}>
            <ListItem dense style={styles.ListItem}>
              <ListItemText primary={ingredient.name} />
              <Tooltip placement="left" title={t('delete')}>
                <IconButton
                  aria-label={t('delete')}
                  onClick={() => removeIngredient({ id: ingredient.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

export default connect(
  state => ({
    ingredients: state.ingredient.all,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
  }),
  {
    createIngredient: createIngredientInit,
    removeIngredient: removeIngredientInit,
    updateIngredient: updateIngredientInit,
  },
)(Ingredients);
