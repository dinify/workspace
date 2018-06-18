// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Field, reduxForm } from 'redux-form';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import * as FN from 'lib/FN';
import R from 'ramda';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Text from 'web/components/MaterialInputs/Text';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import IconButton from '@material-ui/core/IconButton';


import {
  updateMenuitemInitAction,
  createMenuitemInitAction,
  deleteMenuitemInitAction,
  reorderItemsAction,
  selectFoodAction,
} from 'ducks/restaurantLegacy';

const FoodList = styled.div`
  margin: 0 10px;
`;
const FoodItem = styled.div`
  position: relative;
  background: black;
  width: 100%;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: 300;
  background-color: ${p => {
    if (p.disabled)
      return p.selected ? 'rgb(60, 50, 50)' : lighten(0.3, 'rgb(169, 77, 72)');
    return p.selected ? 'rgb(70, 0, 0)' : 'rgb(169, 77, 72)';
  }};
  font-size: 12px;
  &:hover {
    i {
      color: white;
    }
  }
`;
const NewFood = styled.div`
  position: relative;
  background: black;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${p => (p.selected ? 'rgb(70, 0, 0)' : 'rgb(169, 77, 72)')};
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
`;
const ToggleContainer = styled.div`
  position: absolute;
  right: 0;
  top: -7px;
  * {
    fill: white !important;
  }
`;
const BinContainer = styled.div`
  position: absolute;
  right: 30px;
  top: -7px;
  * {
    fill: white !important;
  }
`;

const NewFoodButton = styled.button`
  position: absolute;
  top: 0px;
  right: 5px;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`;

let CreateItemForm = ({ handleSubmit, categoryName, progress, errorMessage }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl
        error={progress === 'ERROR'}
        aria-describedby="name-error-text"
        fullWidth
      >
        <Grid container spacing={0} alignItems="flex-end" justify="center">
          <Grid item xs={10}>
            <Field
              name="name"
              component={Text}
              componentProps={{
                style: {whiteSpace: 'nowrap'},
                label: `A dish of ${categoryName}`,
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
                placeholder: 'e.g. Fried chicken'
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip placement="top" title="Add dish">
              <IconButton type="submit" aria-label="Add dish">
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
CreateItemForm = reduxForm({
  form: 'menu/createItem',
})(CreateItemForm);

const SortableItem = SortableElement(
  ({ item, selectedFoodId, selectFood, updateItem, deleteItem }) => (
    <FoodItem
      selected={item.id === selectedFoodId}
      disabled={!item.published}
      onClick={() => selectFood({ foodId: item.id })}
    >
      <span>{item.name}</span>
      <BinContainer>
        {!item.published ? (
          <Tooltip placement="left" title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => deleteItem({ id: item.id })}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
      </BinContainer>
      <ToggleContainer item>
        <Tooltip
          placement="left"
          title={item.published ? 'Published' : 'Unpublished'}
        >
          <Checkbox
            checkedIcon={<Visibility />}
            icon={<VisibilityOff />}
            color="primary"
            defaultChecked={item.published}
            onChange={(o, checked) =>
              updateItem({ id: item.id, published: checked })
            }
          />
        </Tooltip>
      </ToggleContainer>
    </FoodItem>
  ),
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
  categoriesMap,
  selectedFoodId,
  selectedCategoryId,
  selectFood,
  menuItemsMap,
  updateItem,
  createItem,
  deleteItem,
  reorderItems,
  progressMap,
  errorsMap,
}) => {
  if (!selectedCategoryId || !categoriesMap[selectedCategoryId]) return <div />;
  const menuItemsList = R.filter(
    item => item.menu_category_id === selectedCategoryId,
    FN.MapToList(menuItemsMap),
  ).sort((a, b) => a.precedence - b.precedence);
  const categoryName = categoriesMap[selectedCategoryId].name;
  return (
    <FoodList>
      <Card>
        <CardContent>
          <CreateItemForm
            progress={progressMap['CREATE_MENUITEM']}
            errorMessage={errorsMap['CREATE_MENUITEM']}
            categoryName={categoryName}
            onSubmit={({ name }) => {
              createItem({
                name,
                precedence: menuItemsList.length,
                categoryId: selectedCategoryId,
                form: 'menu/createItem'
              });
            }}
          />
        </CardContent>
      </Card>
      <SortableList
        distance={1}
        axis={'y'}
        lockAxis={'y'}
        items={menuItemsList}
        onSortEnd={({ oldIndex, newIndex }) => {
          reorderItems(arrayMove(menuItemsList, oldIndex, newIndex));
        }}
        deps={{
          selectedFoodId,
          selectFood,
          updateItem,
          deleteItem,
        }}
      />
    </FoodList>
  );
};

export default connect(
  state => ({
    menuItemsMap: state.menuItem.all,
    categoriesMap: state.menuCategory.all,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
  }),
  {
    updateItem: updateMenuitemInitAction,
    createItem: createMenuitemInitAction,
    deleteItem: deleteMenuitemInitAction,
    reorderItems: reorderItemsAction,
    selectFood: selectFoodAction,
  },
)(ListOfDishes);