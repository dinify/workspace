// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import SwitchButton from 'react-switch-button'
import { lighten } from 'polished'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import * as FN from '../../../lib/FN'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

import {
  rmCategoryInitAction,
  addCategoryInitAction,
  selectCategoryAction,
  reorderCategoriesAction
} from '../../../ducks/restaurant'

const CategoriesList = styled.ul `
  display: inline-block;
  list-style: none;
  margin: 10px;
  width: 250px;
  vertical-align: top;
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
    width: 230px;
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
  top: -5px;
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
        name="categoryName"
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

const SortableItem = SortableElement(({ category, selectedCategoryId, selectCategory, rmCategory }) =>
  <CategoryItem
    selected={category.id === selectedCategoryId}
    disabled={!category.published}
    onClick={() => selectCategory({categoryId: category.id})}
  >
    <span>{category.name} {category.published ? 'P' : 'n'}</span>
    <ToggleContainer category>
      <Tooltip placement="left" title={category.published ? 'Published' : 'Unpublished'}>
        <Checkbox
          checkedIcon={<Visibility />}
          icon={<VisibilityOff />}
          color="white"
          defaultChecked={category.published}
          onChange={(o, checked) => rmCategory({ categoryId: category.id, enabled: checked })}
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
          key={`menucategory-${index}`}
          index={index}
          category={category}
          {...deps}
        />
      ))}
    </div>
  );
});

const ListOfCategories = ({
  categories,
  selectedCategoryId,
  addCategory,
  rmCategory,
  selectCategory,
  reorderCategories
}) => {
  if (!categories) return (<div />)
  const categoriesList = FN.MapToList(categories).sort((a,b) => a.precedence - b.precedence)
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
          selectedCategoryId, selectCategory, rmCategory
        }}
      />

      <NewCategory>
        <CreateCategoryForm onSubmit={addCategory} />
      </NewCategory>
    </CategoriesList>
  );
}

export default connect(
  state => ({}), {
    rmCategory: rmCategoryInitAction,
    addCategory: addCategoryInitAction,
    selectCategory: selectCategoryAction,
    reorderCategories: reorderCategoriesAction
  }
)(ListOfCategories);
