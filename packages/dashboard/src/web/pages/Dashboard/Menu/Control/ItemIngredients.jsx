import React from 'react';
import { connect } from 'react-redux';
import { MapToList } from '@dinify/common/dist/lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { updateCusomizationsInit } from 'ducks/menuItem/actions';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import ListOfCustomizations from './ListOfCustomizations';

const Excludability = ({ selectedFoodId, updateCusomizations }) => ({ ingredient }) => {
  const excludable = ingredient.pivot ? ingredient.pivot.excludable : true;
  return (
    <Tooltip
      placement="left"
      title={excludable ? 'Excludable' : 'Mandatory'}
    >
      <Checkbox
        style={{width: 28}}
        color="default"
        icon={<RemoveCircleOutline style={{color: 'rgba(255,255,255,0.2)'}}/>}
        checkedIcon={<RemoveCircle style={{color: 'rgba(255,255,255,1)'}}/>}
        checked={excludable}
        onChange={ev =>
          updateCusomizations({
            menuItemId: selectedFoodId,
            actionKind: 'UPDATE',
            updateObj: {
              excludable: ev.target.checked,
            },
            custKey: 'ingredients',
            custId: ingredient.id
          })
        }
      />
    </Tooltip>
  )
}

const ItemIngredients = ({
  selectedFoodId,
  ingredientsMap,
  menuItems,
  updateCusomizations,
  t
}) => {
  const ingredientsList = MapToList(ingredientsMap);
  const dataSource = ingredientsList.map(o => ({ value: o.id, label: o.name }));
  const selectedFood = menuItems[selectedFoodId];
  return (
    <div style={{ marginBottom: 30 }}>
      <Label>{t('menu.ingredients')}</Label>
      {selectedFood.ingredients ? (
        <ListOfCustomizations
          list={MapToList(selectedFood.ingredients)}
          rmButtonFunction={ingredient =>
            updateCusomizations({
              menuItemId: selectedFoodId,
              actionKind: 'REMOVE',
              custKey: 'ingredients',
              custId: ingredient.id
            })
          }
          ActionComponent={Excludability({ selectedFoodId, updateCusomizations })}
        />
      ) : (
        t('menu.noIngredients')
      )}
      <AutoComplete
        dataSource={dataSource}
        placeholder={(t('menu.selectIngredients'))}
        onChange={ingredient =>
          updateCusomizations({
            menuItemId: selectedFoodId,
            actionKind: 'ADD',
            custKey: 'ingredients',
            custId: ingredient.value,
            cust: ingredientsMap[ingredient.value],
          })
        }
      />
    </div>
  );
};

export default connect(
  state => ({
    ingredientsMap: state.ingredient.all,
    menuItems: state.menuItem.all,
  }),
  {
    updateCusomizations: updateCusomizationsInit
  },
)(ItemIngredients);
