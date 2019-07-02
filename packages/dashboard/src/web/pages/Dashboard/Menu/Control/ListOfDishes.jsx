import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import { useTranslation } from 'react-i18next';
import * as FN from '@dinify/common/dist/lib/FN';
import filter from 'ramda/src/filter';
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
} from 'ducks/restaurant/actions';
import Typography from '@dinify/common/dist/components/Typography';

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
      return p.selected ? 'rgb(60, 50, 50)' : '#dcb0ae';
    return p.selected ? 'rgb(70, 0, 0)' : 'rgb(169, 77, 72)';
  }};
  font-size: 12px;
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
    color: white !important;
  }
`;
const BinContainer = styled.div`
  position: absolute;
  right: 30px;
  top: -7px;
  * {
    color: white !important;
  }
`;

let CreateItemForm = ({ handleSubmit, categoryName, progress, errorMessage }) => {
  const { t } = useTranslation();
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
                label: `${t('menu.dishOf')} ${categoryName}`,
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
                placeholder: t('menu.newDishPlaceholder')
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip placement="top" title={t('menu.addDish')}>
              <IconButton type="submit" aria-label={t('menu.addDish')}>
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
  ({ t, item, selectedFoodId, selectFood, updateItem, deleteItem }) => (
    <FoodItem
      selected={item.id === selectedFoodId}
      disabled={!item.published}
      onClick={() => selectFood({ foodId: item.id })}
    >
      <span>{item.name}</span>
      <BinContainer>
        {!item.published ? (
          <Tooltip placement="left" title={t('delete')}>
            <IconButton
              aria-label={t('delete')}
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
          title={item.published ? t('published') : t('unpublished')}
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
  if (!selectedCategoryId || !categoriesMap[selectedCategoryId]) {
    return <div />;
  }
  const menuItemsList = filter(
    item => item.menu_category_id === selectedCategoryId,
    FN.MapToList(menuItemsMap),
  ).sort((a, b) => a.precedence - b.precedence);
  const categoryName = categoriesMap[selectedCategoryId].name;
  const { t } = useTranslation();
  return (
    <div>
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
      {menuItemsList.length < 1 && <div style={{margin: '10px 0'}}>
        <Typography variant="caption">{t('menu.categoryEmpty')}</Typography>
      </div>}
      <SortableList
        distance={1}
        axis="y"
        lockAxis="y"
        items={menuItemsList}
        onSortEnd={({ oldIndex, newIndex }) => {
          reorderItems(arrayMove(menuItemsList, oldIndex, newIndex));
        }}
        deps={{
          selectedFoodId,
          selectFood,
          updateItem,
          deleteItem,
          t
        }}
      />
    </div>
  );
};

export default connect(
  state => ({
    menuItemsMap: state.menuItem.all,
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
