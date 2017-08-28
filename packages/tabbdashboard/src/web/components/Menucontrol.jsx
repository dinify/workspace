// @flow
import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';
import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit, FieldWrapper, Label } from './styled/FormBox';
import { Form, Text, Select, Textarea } from 'react-form';

import {
  getCategoriesInitAction,
  rmCategoryInitAction,
  addCategoryInitAction,
  selectCategoryAction,
  selectFoodAction,
  rmFoodInitAction
} from '../../ducks/restaurant'

const Header = styled.div`
  position: fixed;
  left: 240px;
  top: 0;
  height: 60px;
  width: calc(100% - 240px);
  background: #FFF;
  line-height: 60px;
  padding-left: 30px;
`;


const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  margin: 20px 0;
`;
const TableHead = styled.thead`
  background: #F2F4F7;
  border-radius: 5px 5px 0 0;
  padding: 10px;
  font-size: 14px;
  text-align: left;
`;
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0,0,0,0.07);
  }
`;
const TH = styled.th`
  border-bottom: 1px solid rgba(0,0,0,0.07);
  padding: 10px;
`;
const TD = styled.td`
  font-size: 12px;
  padding: 10px;
`;

type LoginProps = {
  lastError: Error,
};

const CategoriesList = styled.ul`
  list-style: none;
  margin: 10px;
  width: 250px;
  width: 280px;
`

const CategoryItem = styled.li`
  position: relative;
  background: black;
  color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => p.selected ? 'rgb(0, 20, 50)' : 'rgb(53, 75, 92)'};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    i {
      color: white;
    }
  }
`

const FoodList = styled.ul`
  list-style: none;
  margin: 10px;
  width: 280px;
  position: absolute;
  left: 310px;
  top: 120px;
`

const FoodItem = styled.li`
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
  &:hover {
    i {
      color: white;
    }
  }
`

const RemoveButton = styled.button`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.3);
  font-size: 16px;
  padding: 0 10px;
  cursor: pointer;
  i {
    transition: all 125ms ease-in-out;
  }
`

const HeadLine = styled.div`
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
`

const H = styled.div`
  display: inline-block;
  width: 280px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`

const MealDetail = styled.div`
  position: absolute;
  left: 610px;
  top: 121px;
  border-radius: 5px;
  background: white;
  width: 400px;
  margin-top: 10px;
`

class Menucontrol extends React.Component {
  componentDidMount() {
    const { loggedRestaurant, getCategories } = this.props;
    getCategories();
  }
  render() {
    const { loggedRestaurant, categories, rmCategory, addCategory,
      selectedCategoryId, selectCategory,
      selectedFoodId, selectFood, rmFood
    } = this.props;

    let selectedCategory = null;
    if (selectedCategoryId) {
      selectedCategory = R.find(R.propEq('id', selectedCategoryId))(categories);
    }
    let selectedFood = null;
    if (selectedCategory) {
      selectedFood = R.find(R.propEq('id', selectedFoodId))(selectedCategory.foods);
    }
    return (
      <div>
        <Header>
          Menu Control
        </Header>

        <HeadLine>
          <H>Categories</H>
          <H>Dishes</H>
          <H>Dish Detail</H>
        </HeadLine>

        <CategoriesList>
          {categories.sort((a,b) => a.id - b.id).map((c) =>
            <CategoryItem selected={c.id === selectedCategoryId} onClick={() => selectCategory({categoryId: c.id})}>
              <span>{c.name}</span>
              <RemoveButton onClick={() => rmCategory({categoryId: c.id})}>
                <i className="ion-ios-trash" />
              </RemoveButton>
            </CategoryItem>
          )}
        </CategoriesList>

        {selectedCategory ? <FoodList>
          {selectedCategory.foods.length < 1 ? 'No food in selected category' : ''}
          {selectedCategory.foods.map((food) =>
            <FoodItem selected={food.id === selectedFoodId} onClick={() => selectFood({foodId: food.id})}>
              <span>{food.name}</span>
              <RemoveButton onClick={() => rmFood({foodId: food.id, categoryId: selectedCategoryId})}>
                <i className="ion-ios-trash" />
              </RemoveButton>
            </FoodItem>
          )}
        </FoodList> : ''}

        <MealDetail>
          {selectedFood ? <FormBox>
              <FormBoxBody>
                <Form
                  onSubmit={({ categoryName }) => {
                    console.log('Success!', { categoryName });
                    //addCategory({ categoryName });
                  }}
                  defaultValues={selectedFood}
                  validate={({ categoryName }) => {
                    return {
                      categoryName: !categoryName ? 'Category Name is required' : undefined,
                    }
                  }}
                >
                  {({submitForm}) => {
                    return (
                      <form onSubmit={submitForm}>
                        <Label>Name</Label>
                        <Text field='name' placeholder='Name of food' />
                        <Label>Description</Label>
                        <Textarea field='description' placeholder='Description' />
                        <Label>Price</Label>
                        <Text type="number" field='price' placeholder='Price' />
                        <FormBoxSubmit primary>SAVE</FormBoxSubmit>
                      </form>
                    )
                  }}
                </Form>
              </FormBoxBody>
          </FormBox> : ''}
        </MealDetail>

        <FormBox>
          <FormBoxHead>Create a new category</FormBoxHead>
          <FormBoxBody>
            <Form
              onSubmit={({ categoryName }) => {
                console.log('Success!', { categoryName });
                addCategory({ categoryName });
              }}
              validate={({ categoryName }) => {
                return {
                  categoryName: !categoryName ? 'Category Name is required' : undefined,
                }
              }}
            >
              {({submitForm}) => {
                return (
                  <form onSubmit={submitForm}>
                    <Text field='categoryName' placeholder='Name of category' />
                    <FormBoxSubmit>ADD</FormBoxSubmit>
                  </form>
                )
              }}
            </Form>
          </FormBoxBody>
        </FormBox>

      </div>);
    }
  }

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    categories: state.restaurant.categories,
    selectedCategoryId: state.restaurant.selectedCategoryId,
    selectedFoodId: state.restaurant.selectedFoodId
  }),
  {
    getCategories: getCategoriesInitAction,
    rmCategory: rmCategoryInitAction,
    addCategory: addCategoryInitAction,
    selectCategory: selectCategoryAction,
    selectFood: selectFoodAction,
    rmFood: rmFoodInitAction,
  },
)(Menucontrol);
