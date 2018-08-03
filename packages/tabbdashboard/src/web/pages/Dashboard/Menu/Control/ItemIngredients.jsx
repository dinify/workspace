// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { updateCusomizationsInit } from 'ducks/menuItem/actions';
import ListOfCustomizations from './ListOfCustomizations';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

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
        icon={<RemoveCircleOutline />}
        checkedIcon={<RemoveCircle />}
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
  updateCusomizations
}) => {
  const ingredientsList = FN.MapToList(ingredientsMap);
  const dataSource = ingredientsList.map(o => ({ value: o.id, label: o.name }));
  const selectedFood = menuItems[selectedFoodId];
  return (
    <div style={{ marginBottom: 30 }}>
      <Label>Ingredients</Label>
      {selectedFood.ingredients ? (
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.ingredients)}
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
        'No ingredients'
      )}
      <AutoComplete
        dataSource={dataSource}
        placeholder="Select ingredients here"
        onChange={ingredientId =>
          updateCusomizations({
            menuItemId: selectedFoodId,
            actionKind: 'ADD',
            custKey: 'ingredients',
            custId: ingredientId,
            cust: ingredientsMap[ingredientId],
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
