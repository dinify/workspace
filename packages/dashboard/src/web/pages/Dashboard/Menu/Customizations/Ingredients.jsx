import React, { useEffect, useState } from 'react';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Checkbox from '@material-ui/core/Checkbox';
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

const allergenNames = [
  'Cereals containing gluten',
  'Crustaceans',
  'Eggs',
  'Fish',
  'Peanuts',
  'Soybeans',
  'Milk',
  'Nuts',
  'Celery',
  'Mustard',
  'Sesame seeds',
  'Sulphur dioxide and sulphites',
  'Lupin',
  'Molluscs'
];

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
  ingredients,
  ingredientsList,
  fetchIngredients,
  // ingredientsLoaded,
  removeIngredient,
  updateIngredient,
  styles,
  progressMap,
  errorsMap,
  lang
}) => {
  const { t } = useTranslation();

  const [editingId, setEditingId] = useState(null);
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  const openDialog = (id) => {
    if (ingredients[id] && ingredients[id].alergens) {
      setSelectedAllergens(ingredients[id].alergens);
    } else {
      setSelectedAllergens([]);
    }
    setEditingId(id);
  }
  const selectAllergen = (i) => {
    if (!selectedAllergens.includes(i)) {
      setSelectedAllergens([...selectedAllergens, i]);
    } else {
      setSelectedAllergens(
        selectedAllergens.filter(a => a !== i)
      );
    }
  }

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

            <Tooltip placement="left" title="Allergens">
              <IconButton
                aria-label="Allergens"
                onClick={() => openDialog(ingredient.id)}
              >
                A
              </IconButton>
            </Tooltip>

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
      
      <Dialog
        open={!!editingId}
        onClose={() => setEditingId(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {editingId && <>
          <DialogTitle id="alert-dialog-title">
            Allergens of {getT(ingredients[editingId].translations, lang)}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              <List dense>
                {allergenNames.map((allergenName, i) => (
                  <ListItem key={allergenName} role={undefined} button onClick={() => selectAllergen(i)}>
                    <Checkbox
                      checked={selectedAllergens.includes(i)}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={allergenName} />
                  </ListItem>
                ))}
              </List>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              updateIngredient({id: editingId, allergens: selectedAllergens});
              setEditingId(null);
            }} color="primary" autoFocus>
              {t('save')}
            </Button>
          </DialogActions>
        </>}
      </Dialog>

    </React.Fragment>
  );
};

export default connect(
  state => ({
    ingredients: state.ingredient.all,
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