import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Label } from 'web/components/styled/FormBox';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import {
  assignIngredient,
  unassignIngredient,
  setIngredientExcludability
} from 'ducks/menuItem/actions';
import { listOfIngredients } from 'ducks/ingredient/selectors';
import { fetchIngredientsAsync } from 'ducks/ingredient/actions';
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
  selectedFoodId,
  ingredientsList,
  fetchIngredients,
  ingredientsLoaded,
  menuItems,
  assignIngredient,
  unassignIngredient,
  setIngredientExcludability,
  defaultLang,
  t
}) => {
  const shouldLoad = ingredientsList.length < 1 && !ingredientsLoaded;
  useEffect(() => {
    if (shouldLoad) fetchIngredients();
  }, []);
  const selectedFood = menuItems[selectedFoodId];
  if (!selectedFood) {
    return <div />;
  }
  const assignedIngredients = selectedFood.menuIngredients || [];
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
              menuItemId: selectedFoodId,
              ingredientId: ingredient.id
            })
          }
          ActionComponent={Excludability({ selectedFoodId, setIngredientExcludability })}
        />
      ) : (
        t('menu.noIngredients')
      )}
      <AutoComplete
        dataSource={dataSource}
        placeholder={(t('menu.selectIngredients'))}
        onChange={ingredient =>
          assignIngredient({
            menuItemId: selectedFoodId,
            ingredientId: ingredient.value
          })
        }
      />
    </div>
  );
};

export default connect(
  state => ({
    ingredientsList: listOfIngredients(state),
    ingredientsLoaded: state.ingredient.loaded,
    menuItems: state.menuItem.all,
    defaultLang: state.restaurant.defaultLanguage
  }),
  {
    fetchIngredients: fetchIngredientsAsync.request,
    assignIngredient,
    unassignIngredient,
    setIngredientExcludability
  },
)(ItemIngredients);
