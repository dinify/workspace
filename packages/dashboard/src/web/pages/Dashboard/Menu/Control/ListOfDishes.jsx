import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import { useTranslation } from '@dinify/common/src/lib/i18n';
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

import { getT } from '@dinify/common/src/lib/translation.ts';

import {
  createMenuItemAsync,
  updateMenuItemAsync,
  removeMenuItemAsync,
  reorderItemsAsync
} from 'features/menuItem/actions';
import {
  selectFoodAction,
} from 'features/restaurant/actions';
import { selectedMenuItems } from 'features/menuItem/selectors';
import { getDefaultCurrency } from 'features/restaurant/selectors';

import Typography from '@material-ui/core/Typography';
import Translation from 'web/components/Translation';

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
  ({ t, item, selectedFoodId, selectFood, updateItem, removeItem }) => (
    <FoodItem
      selected={item.id === selectedFoodId}
      disabled={!item.published}
      onClick={() => selectFood({ foodId: item.id })}
    >
      <Translation object={item} />
      <BinContainer>
        {!item.published ? (
          <Tooltip placement="left" title={t('delete')}>
            <IconButton
              aria-label={t('delete')}
              onClick={() => removeItem({ menuItemId: item.id })}
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
            checked={item.published}
            onChange={(o, checked) =>
              updateItem({ menuItemId: item.id, published: checked })
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
  menuItemsList,
  updateItem,
  createItem,
  removeItem,
  reorderItems,
  progressMap,
  errorsMap,
  lang,
  currency
}) => {
  if (!selectedCategoryId || !categoriesMap[selectedCategoryId]) {
    return <div />;
  }

  const categoryName = getT(categoriesMap[selectedCategoryId].translations, lang);
  const { t } = useTranslation();
  return (
    <div>
      <Card>
        <CardContent>
          <CreateItemForm
            progress={progressMap.CREATE_MENUITEM}
            errorMessage={errorsMap.CREATE_MENUITEM}
            categoryName={categoryName}
            onSubmit={({ name }) => {
              createItem({
                name,
                precedence: menuItemsList.length,
                menuCategoryId: selectedCategoryId,
                price: {
                  amount: currency === 'CZK' ? 100 : 5,
                  currency
                },
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
          removeItem,
          t
        }}
      />
    </div>
  );
};

export default connect(
  (state, props) => ({
    menuItemsList: selectedMenuItems(state.menuItem, props),
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
    lang: state.restaurant.defaultLanguage,
    currency: getDefaultCurrency(state)
  }), {
    updateItem: updateMenuItemAsync.request,
    createItem: createMenuItemAsync.request,
    removeItem: removeMenuItemAsync.request,
    reorderItems: reorderItemsAsync.request,
    selectFood: selectFoodAction,
  },
)(ListOfDishes);
