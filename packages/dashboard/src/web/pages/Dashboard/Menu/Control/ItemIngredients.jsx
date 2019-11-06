import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Label } from 'web/components/styled/FormBox';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import {
  assignIngredientAsync,
  unassignIngredientAsync,
  setIngredientExcludability
} from 'features/menuItem/actions';
import { listOfIngredients } from 'features/ingredient/selectors';
import { fetchIngredientsAsync } from 'features/ingredient/actions';
import ListOfCustomizations from './ListOfCustomizations';
import { getT } from '@dinify/common/src/lib/translation.ts';

const Excludability = ({ selectedFoodId, setIngredientExcludability }) => ({ ingredient }) => {
  const excludable = ingredient.pivot ? ingredient.pivot.excludable : true;
  return (
    <Tooltip
      placement="left"
      title={excludable ? 'Excludable' : 'Mandatory'}
    >
      <Checkbox
        style={{width: 28}}
        color="default"
        icon={<RemoveCircleOutline style={{ color: 'rgba(255,255,255,0.2)' }}/>}
        checkedIcon={<RemoveCircle style={{ color: 'rgba(255,255,255,1)' }}/>}
        checked={excludable}
        onChange={ev =>
          setIngredientExcludability({
            menuItemId: selectedFoodId,
            ingredientId: ingredient.id,
            excludable: ev.target.checked
          })
        }
      />
    </Tooltip>
  )
}


const ItemIngredients = ({
  selectedFood,
  ingredientsList,
  ingredientsMap,
  fetchIngredients,
  ingredientsLoaded,
  assignIngredient,
  unassignIngredient,
  setIngredientExcludability,
  t,
  defaultLang
}) => {

  const shouldLoad = ingredientsList.length < 1 && !ingredientsLoaded;

  useEffect(() => {
    if (shouldLoad) fetchIngredients();
  }, []);

  if (!selectedFood) {
    return <div />;
  }

  let assignedIngredients = [];

  if (selectedFood.menuIngredients) {
    assignedIngredients = selectedFood.menuIngredients.map((compoundId) => {
      const ingredientId = compoundId.split('.')[1];
      return ingredientsMap[ingredientId];
    });
  }

  const assignedIngredientsIds = assignedIngredients.map(o => o.id);

  const dataSource = ingredientsList
    .filter(o => !assignedIngredientsIds.includes(o.id))
    .map(o => ({ value: o.id, label: getT(o.translations, defaultLang)}));
    
  return (
    <div style={{ marginBottom: 30 }}>
      <Label>{t('menu.ingredients')}</Label>
      {assignedIngredients ? (
        <ListOfCustomizations
          list={assignedIngredients}
          rmButtonFunction={ingredient =>
            unassignIngredient({
              menuItemId: selectedFood.id,
              ingredientId: ingredient.id
            })
          }
          ActionComponent={Excludability({ selectedFoodId: selectedFood.id, setIngredientExcludability })}
        />
      ) : (
        t('menu.noIngredients')
      )}
      <AutoComplete
        dataSource={dataSource}
        placeholder={(t('menu.selectIngredients'))}
        onChange={ingredient =>
          assignIngredient({
            menuItemId: selectedFood.id,
            ingredientId: ingredient.value
          })
        }
      />
    </div>
  );
};

export default connect(
  state => ({
    ingredientsMap: state.ingredient.all,
    ingredientsList: listOfIngredients(state),
    ingredientsLoaded: state.ingredient.loaded,
    defaultLang: state.restaurant.defaultLanguage
  }),
  {
    fetchIngredients: fetchIngredientsAsync.request,
    assignIngredient: assignIngredientAsync.request,
    unassignIngredient: unassignIngredientAsync.request,
    setIngredientExcludability
  },
)(ItemIngredients);
