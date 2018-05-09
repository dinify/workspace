// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import { lighten } from 'polished'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import * as FN from '../../../lib/FN'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Checkbox from 'material-ui/Checkbox'
import Tooltip from 'material-ui/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from 'material-ui/IconButton';

import {
  updateMenucategoryInitAction,
  createMenucategoryInitAction,
  deleteMenucategoryInitAction,
  selectCategoryAction,
  reorderCategoriesAction
} from '../../../ducks/restaurantLegacy'

const CategoriesList = styled.ul `
  list-style: none;
  margin: 0 10px;
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

const NewCategory = styled.li `
  position: relative;
  background: black;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => p.selected ? 'rgb(0, 20, 50)' : 'rgb(53, 75, 92)'};
  font-size: 12px;
  .CategoryInput {
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

const CategoryItem = styled.div `
  position: relative;
  background: black;
  color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => {
    if (p.disabled) return p.selected ? 'rgb(30, 30, 50)' : lighten(0.3, 'rgb(53, 75, 92)');
    return p.selected ? 'rgb(0, 20, 50)' : 'rgb(53, 75, 92)';
  }};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    i {
      color: white;
    }
  }
`

let CreateCategoryForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        className="CategoryInput"
        component="input"
        type="text"
        placeholder="Add a new category"
      />
      <NewFoodButton>
        <i className="material-icons">add</i>
      </NewFoodButton>
    </form>
  )
}
CreateCategoryForm = reduxForm({
  form: 'menu/createCategory'
})(CreateCategoryForm)

const SortableItem = SortableElement(({ category, selectedCategoryId, selectCategory, updateCategory, deleteCategory }) =>
  <CategoryItem
    selected={category.id === selectedCategoryId}
    disabled={!category.published}
    onClick={() => selectCategory({categoryId: category.id})}
  >
    <span>{category.name}</span>
    <BinContainer>
      {!category.published ?
        <Tooltip placement="left" title="Delete">
          <IconButton
            aria-label="Delete"
            onClick={() => deleteCategory({ id: category.id })}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      : ''}
    </BinContainer>
    <ToggleContainer category>
      <Tooltip placement="left" title={category.published ? 'Published' : 'Unpublished'}>
        <Checkbox
          checkedIcon={<Visibility />}
          icon={<VisibilityOff />}
          color="primary"
          defaultChecked={category.published}
          onChange={(o, checked) => updateCategory({ id: category.id, published: checked })}
        />
      </Tooltip>
    </ToggleContainer>
  </CategoryItem>
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
  reorderCategories
}) => {
  const categoriesList = FN.MapToList(categoriesMap).sort((a,b) => a.precedence - b.precedence)
  return (
    <CategoriesList>

      <SortableList
        distance={1}
        axis={'y'}
        lockAxis={'y'}
        categories={categoriesList}
        onSortEnd={({oldIndex, newIndex}) => {
          reorderCategories(arrayMove(categoriesList, oldIndex, newIndex))
        }}
        deps={{
          selectedCategoryId, selectCategory, updateCategory, deleteCategory
        }}
      />

      <NewCategory>
        <CreateCategoryForm onSubmit={({name}) => {
          createCategory({name, precedence: categoriesList.length})
        }} />
      </NewCategory>
    </CategoriesList>
  );
}

export default connect(
  state => ({
    categoriesMap: state.menuCategory.all
  }), {
    updateCategory: updateMenucategoryInitAction,
    createCategory: createMenucategoryInitAction,
    deleteCategory: deleteMenucategoryInitAction,
    reorderCategories: reorderCategoriesAction,
    selectCategory: selectCategoryAction,
  }
)(ListOfCategories);
