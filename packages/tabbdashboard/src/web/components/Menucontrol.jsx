// @flow
import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';
import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit, FieldWrapper, Label } from './styled/FormBox';
import { Header } from './styled/Header';

import { Form, Text, Select, Textarea } from 'react-form';

import {
  getCategoriesInitAction,
  rmCategoryInitAction,
  addCategoryInitAction,
  selectCategoryAction,
  selectFoodAction,
  rmFoodInitAction,
  updateFoodInitAction,
  addFoodInitAction
} from '../../ducks/restaurant'

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
  display: inline-block;
  list-style: none;
  margin: 10px;
  width: 250px;
  width: 280px;
  vertical-align: top;
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
  display: inline-block;
  list-style: none;
  margin: 10px;
  width: 280px;
  vertical-align: top;
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
  right: 7px;
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
  display: inline-block;
  width: 300px;
  vertical-align: top;
`

const TableTag = styled.table`
  width: 100%;
  border-spacing: 0;
`;
const Td = styled.td`
  color: ${props => props.color};
  font-weight: 300;
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #666;
  &:first-child {
    text-align: left;
  }
`;

const NewCategory = styled.li`
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
  &:hover {
    i {
      color: white;
    }
  }
`

const NewFood = styled.li`
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

const NewFoodInput = styled(Text)`
  background: transparent;
  width: 230px;
  padding: 5px;
  color: white;
  border: none;
  outline: none;
`
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
`
const SolidContainer = styled.div`
  width: 1000px;
`

const FoodImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(p) => p.imageURL});
  background-size: cover;
`

class Menucontrol extends React.Component {
  componentDidMount() {
    const { loggedRestaurant, getCategories } = this.props;
    getCategories();
  }
  render() {
    const { loggedRestaurant, categories, rmCategory, addCategory,
      selectedCategoryId, selectCategory,
      selectedFoodId, selectFood, rmFood, updateFood, addFood
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

        <SolidContainer>

                  <CategoriesList>
                    {categories.sort((a,b) => a.id - b.id).map((c) =>
                      <CategoryItem selected={c.id === selectedCategoryId} onClick={() => selectCategory({categoryId: c.id})}>
                        <span>{c.name}</span>
                        <RemoveButton onClick={() => rmCategory({categoryId: c.id})}>
                          <i className="ion-ios-trash" />
                        </RemoveButton>
                      </CategoryItem>
                    )}
                    <NewCategory>
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
                              <NewFoodInput field='categoryName' placeholder='Add a new category' />
                              <NewFoodButton>
                                <i className="ion-plus" />
                              </NewFoodButton>
                            </form>
                          )
                        }}
                      </Form>

                    </NewCategory>
                  </CategoriesList>

                  {selectedCategory ? <FoodList>
                    {selectedCategory.foods.sort((a,b) => a.id - b.id).map((food) =>
                      <FoodItem selected={food.id === selectedFoodId} onClick={() => selectFood({foodId: food.id})}>
                        <span>{food.name}</span>
                        <RemoveButton onClick={() => rmFood({foodId: food.id, categoryId: selectedCategoryId})}>
                          <i className="ion-ios-trash" />
                        </RemoveButton>
                      </FoodItem>
                    )}
                    <NewFood>
                      <Form
                        onSubmit={({name}) => {
                          console.log(name);
                          addFood({ categoryId: selectedCategoryId, foodName: name });
                        }}
                        validate={({ name }) => {
                          return {
                            name: !name ? 'Name is required' : undefined,
                          }
                        }}
                      >
                        {({submitForm}) => {
                          return (
                            <form onSubmit={submitForm}>
                              <NewFoodInput field='name' placeholder='Add a new dish' />
                              <NewFoodButton>
                                <i className="ion-plus" />
                              </NewFoodButton>
                            </form>
                          )
                        }}
                      </Form>
                    </NewFood>
                  </FoodList> : ''}

                  <MealDetail>
                    {selectedFood ? <FormBox>
                      <FoodImage imageURL={`https://s3.eu-central-1.amazonaws.com/tabb-images/food/FOOD_${selectedFood.id}.jpg`} />
                        <FormBoxBody>
                          <Form
                            onSubmit={(fields) => {
                              fields.foodId = selectedFood.id
                              fields.categoryId = selectedCategoryId
                              updateFood(fields)
                            }}
                            defaultValues={selectedFood}
                            validate={({ name, description, price }) => {
                              return {
                                name: !name ? 'Name is required' : undefined,
                                description: !description ? 'Description is required' : undefined,
                                price: !price ? 'Price is required' : undefined,
                              }
                            }}
                          >
                            {({submitForm}) => {
                              return (
                                <form onSubmit={submitForm}>
                                  <Label>Name</Label>
                                  <Text field='name' placeholder='Name of food' />
                                  <Label>Description</Label>
                                  <Textarea style={{height: '100px'}} field='description' placeholder='Description' />
                                  <Label>Price</Label>
                                  <Text type="number" field='price' placeholder='Price' />

                                  <Label>Nutrition</Label>
                                  <TableTag>
                                    {selectedFood.nutrition.map((nutr) =>
                                      <tr>
                                        <Td>{nutr.nutrient}</Td>
                                        <Td>{nutr.content}</Td>
                                      </tr>
                                    )}
                                  </TableTag>
                                  {/*
                                    <Label>Ingredients</Label>
                                    <TableTag>
                                      {selectedFood.ingredients.map((ingredient) =>
                                        <tr>
                                          <Td>{ingredient.name}</Td>
                                        </tr>
                                      )}
                                    </TableTag>
                                  */}


                                  <FormBoxSubmit primary>SAVE</FormBoxSubmit>
                                </form>
                              )
                            }}
                          </Form>

                        </FormBoxBody>
                    </FormBox> : ''}
                  </MealDetail>
        </SolidContainer>


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
    updateFood: updateFoodInitAction,
    addFood: addFoodInitAction,
  },
)(Menucontrol);
