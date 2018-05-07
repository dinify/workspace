// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Field, reduxForm } from 'redux-form'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import * as FN from '../../../lib/FN'
import R from 'ramda'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Checkbox from 'material-ui/Checkbox'
import Tooltip from 'material-ui/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from 'material-ui/IconButton';

import {
  updateMenuitemInitAction,
  createMenuitemInitAction,
  deleteMenuitemInitAction,
  reorderItemsAction,
  selectFoodAction
} from '../../../ducks/restaurant'

const FoodList = styled.div`
  margin: 0 10px;
`
const FoodItem = styled.div`
  position: relative;
  background: black;
  width: 100%;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => {
    if (p.disabled) return p.selected ? 'rgb(60, 50, 50)' : lighten(0.3, 'rgb(169, 77, 72)');
    return p.selected ? 'rgb(70, 0, 0)' : 'rgb(169, 77, 72)';
  }};
  font-size: 12px;
  &:hover {
    i {
      color: white;
    }
  }
`
const NewFood = styled.div`
  position: relative;
  background: black;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => p.selected ? 'rgb(70, 0, 0)' : 'rgb(169, 77, 72)'};
  font-size: 12px;
  .ItemInput {
    background: transparent;
    width: 100%;
    padding: 5px;
    color: white;
    border: none;
    outline: none;
  }
  &:hover {
    i {
      color: white;
    }
  }
`
const ToggleContainer = styled.div `
  position: absolute;
  right: 0;
  top: -7px;
  * {
    fill: white !important;
  }
`
const BinContainer = styled.div `
  position: absolute;
  right: 30px;
  top: -7px;
  * {
    fill: white !important;
  }
`

const NewFoodButton = styled.button `
  position: absolute;
  top: 0px;
  right: 5px;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`

let CreateItemForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component="input"
        type="text"
        placeholder="Add a new dish"
        className="ItemInput"
      />
      <NewFoodButton>
        <i className="material-icons">add</i>
      </NewFoodButton>
    </form>
  )
}
CreateItemForm = reduxForm({
  form: 'menu/createItem'
})(CreateItemForm)

const SortableItem = SortableElement(({ item, selectedFoodId, selectFood, updateItem, deleteItem }) =>
  <FoodItem
    selected={item.id === selectedFoodId}
    disabled={!item.published}
    onClick={() => selectFood({foodId: item.id})}
  >
    <span>{item.name}</span>
    <BinContainer>
      {!item.published ?
        <Tooltip placement="left" title="Delete">
          <IconButton
            aria-label="Delete"
            onClick={() => deleteItem({ id: item.id })}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      : ''}
    </BinContainer>
    <ToggleContainer item>
      <Tooltip placement="left" title={item.published ? 'Published' : 'Unpublished'}>
        <Checkbox
          checkedIcon={<Visibility />}
          icon={<VisibilityOff />}
          color="primary"
          defaultChecked={item.published}
          onChange={(o, checked) => updateItem({ id: item.id, published: checked })}
        />
      </Tooltip>
    </ToggleContainer>
  </FoodItem>
);

const SortableList = SortableContainer(({ items, deps }) => {
  return (
    <div>
      {items.map((item, index) => (
        <SortableItem
          key={`menuitem-${index}-${item.id}`}
          index={index}
          item={item}
          {...deps}
        />
      ))}
    </div>
  );
});

const ListOfDishes = ({
  selectedFoodId,
  selectedCategoryId,
  selectFood,
  menuItemsMap,
  updateItem,
  createItem,
  deleteItem,
  reorderItems
}) => {
  if (!selectedCategoryId) return (<div />)
  const menuItemsList = R
    .filter((item) => item.menu_category_id === selectedCategoryId, FN.MapToList(menuItemsMap))
    .sort((a,b) => a.precedence - b.precedence)
  return (
    <FoodList>

      <SortableList
        distance={1}
        axis={'y'}
        lockAxis={'y'}
        items={menuItemsList}
        onSortEnd={({oldIndex, newIndex}) => {
          reorderItems(arrayMove(menuItemsList, oldIndex, newIndex))
        }}
        deps={{
          selectedFoodId, selectFood, updateItem, deleteItem
        }}
      />
      <NewFood>
        <CreateItemForm onSubmit={({name}) => {
          createItem({
            name,
            precedence: menuItemsList.length,
            categoryId: selectedCategoryId
          })
        }} />
      </NewFood>
    </FoodList>
  );
}

export default connect(
  state => ({
    menuItemsMap: state.menuItem.all
  }), {
    updateItem: updateMenuitemInitAction,
    createItem: createMenuitemInitAction,
    deleteItem: deleteMenuitemInitAction,
    reorderItems: reorderItemsAction,
    selectFood: selectFoodAction,
  }
)(ListOfDishes);
