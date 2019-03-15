// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { lighten } from 'polished';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import * as FN from 'lib/FN';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Text from 'web/components/MaterialInputs/Text';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {
  updateMenucategoryInitAction,
  createMenucategoryInitAction,
  deleteMenucategoryInitAction,
  selectCategoryAction,
  reorderCategoriesAction,
} from 'ducks/restaurant/actions';

const CategoriesList = styled.ul`
  list-style: none;
  margin: 0 10px;
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

const CategoryItem = styled.div`
  position: relative;
  background: black;
  color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: 300;
  background-color: ${p => {
    if (p.disabled)
      return p.selected ? 'rgb(30, 30, 50)' : lighten(0.3, 'rgb(53, 75, 92)');
    return p.selected ? 'rgb(0, 20, 50)' : 'rgb(53, 75, 92)';
  }};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    i {
      color: white;
    }
  }
`;

let CreateCategoryForm = ({ handleSubmit, progress, errorMessage }) => {
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
                label: 'Name of new category',
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
                placeholder: 'e.g. Appetizers'
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip placement="top" title="Add category">
              <IconButton type="submit" aria-label="Add category">
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
CreateCategoryForm = reduxForm({
  form: 'menu/createCategory',
})(CreateCategoryForm);

const SortableItem = SortableElement(
  ({
    category,
    selectedCategoryId,
    selectCategory,
    updateCategory,
    deleteCategory,
  }) => (
    <CategoryItem
      selected={category.id === selectedCategoryId}
      disabled={!category.published}
      onClick={() => selectCategory({ categoryId: category.id })}
    >
      <span>{category.name}</span>
      <BinContainer>
        {!category.published ? (
          <Tooltip placement="left" title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => deleteCategory({ id: category.id })}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
      </BinContainer>
      <ToggleContainer category>
        <Tooltip
          placement="left"
          title={category.published ? 'Published' : 'Unpublished'}
        >
          <Checkbox
            checkedIcon={<Visibility />}
            icon={<VisibilityOff />}
            color="primary"
            defaultChecked={category.published}
            onChange={(o, checked) =>
              updateCategory({ id: category.id, published: checked })
            }
          />
        </Tooltip>
      </ToggleContainer>
    </CategoryItem>
  ),
);

const SortableList = SortableContainer(({ categories, deps }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <SortableItem
          key={`menucategory-${index}-${category.id}`}
          index={index}
          category={category}
          {...deps}
        />
      ))}
    </div>
  );
});

const ListOfCategories = ({
  categoriesMap,
  selectedCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
  selectCategory,
  reorderCategories,
  progressMap,
  errorsMap,
}) => {
  const categoriesList = FN.MapToList(categoriesMap).sort(
    (a, b) => a.precedence - b.precedence,
  );
  return (
    <CategoriesList>
      <Card>
        <CardContent>
          <CreateCategoryForm
            progress={progressMap['CREATE_MENUCATEGORY']}
            errorMessage={errorsMap['CREATE_MENUCATEGORY']}
            onSubmit={({ name }) => {
              createCategory({
                name,
                precedence: categoriesList.length,
                form: 'menu/createCategory'
              });
            }}
          />
        </CardContent>
      </Card>
      <SortableList
        distance={1}
        axis={'y'}
        lockAxis={'y'}
        categories={categoriesList}
        onSortEnd={({ oldIndex, newIndex }) => {
          reorderCategories(arrayMove(categoriesList, oldIndex, newIndex));
        }}
        deps={{
          selectedCategoryId,
          selectCategory,
          updateCategory,
          deleteCategory,
        }}
      />
    </CategoriesList>
  );
};

export default connect(
  state => ({
    categoriesMap: state.menuCategory.all,
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
  }),
  {
    updateCategory: updateMenucategoryInitAction,
    createCategory: createMenucategoryInitAction,
    deleteCategory: deleteMenucategoryInitAction,
    reorderCategories: reorderCategoriesAction,
    selectCategory: selectCategoryAction,
  },
)(ListOfCategories);
