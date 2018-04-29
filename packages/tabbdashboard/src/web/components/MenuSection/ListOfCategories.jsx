// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import SwitchButton from 'react-switch-button'
import { lighten } from 'polished'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'


import {
  rmCategoryInitAction,
  addCategoryInitAction,
  selectCategoryAction
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
  right: 7px;
  top: 5px;
  .rsbc-switch-button.rsbc-switch-button-flat-round input[type="checkbox"] + label:before {
    background: rgba(255,255,255,0.8);
  }
  .rsbc-switch-button.rsbc-switch-button-flat-round input[type="checkbox"] + label {
    background: transparent;
  }
  .rsbc-switch-button.rsbc-switch-button-flat-round input[type="checkbox"]:checked + label {
    background: transparent;
  }
  .rsbc-switch-button.rsbc-switch-button-flat-round input[type="checkbox"]:checked + label:after {
    background-color: ${p => p.food ? 'rgb(169, 77, 72);' : 'rgb(53, 75, 92)'};
  }
  .rsbc-switch-button.rsbc-switch-button-flat-round input[type="checkbox"] + label:after {
    background-color: ${p => {
      if (p.food) return lighten(0.3, 'rgb(169, 77, 72)')
      else return lighten(0.3, 'rgb(53, 75, 92)')
    }}
  }
`

const CategoryItem = styled.li `
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
    key={category.id}
    selected={category.id === selectedCategoryId}
    disabled={!category.published}
    onClick={() => selectCategory({categoryId: category.id})}
  >
    <span>{category.name}</span>
    <ToggleContainer category>
      <SwitchButton
        name={`switch-category-${category.id}`}
        type="switch"
        defaultChecked={category.published}
        onChange={() => {
          if(category.published) {
            rmCategory({ categoryId: category.id, enabled: false })
          } else rmCategory({ categoryId: category.id, enabled: true })
        }}
      />
    </ToggleContainer>
  </CategoryItem>
);

const SortableList = SortableContainer(({ categories, deps }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <SortableItem
          key={`item-${index}`}
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
  selectCategory
}) => {
  if (!categories) return (<div />)
  return (
    <CategoriesList>

      <SortableList
        distance={1}
        categories={categories.sort((a,b) => a.id - b.id)}
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
  }
)(ListOfCategories);
