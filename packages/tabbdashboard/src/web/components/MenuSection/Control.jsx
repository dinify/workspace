// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FormBox, FormBoxBody } from '../styled/FormBox'
import ListOfCategories from './ListOfCategories'
import ListOfDishes from './ListOfDishes'
import ItemIngredients from './ItemIngredients'
import ItemAddons from './ItemAddons'
import ItemOptions from './ItemOptions'
import ItemNutrition from './ItemNutrition'
import ItemDetail from './ItemDetail'

import {
  getCategoriesInitAction, getAddonsInit
} from '../../../ducks/restaurant'

const HeadLine = styled.div `
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
`

const H = styled.div `
  display: inline-block;
  width: 250px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  margin-right: 20px;
`

const MealDetail = styled.div `
  display: inline-block;
  width: 250px;
  vertical-align: top;
`

const SolidContainer = styled.div `
  width: 1100px;
`


class Menucontrol extends React.Component {
  componentDidMount() {
    const {
      getCategories,
      getAddons
    } = this.props;
    getCategories();
    getAddons();
  }
  render() {
    const {
      categories,
      selectedCategoryId,
      selectedFoodId,
      addons,
      loggedRestaurant
    } = this.props;

    let selectedCategory = null
    if (selectedCategoryId) {
      selectedCategory = R.find(R.propEq('id', selectedCategoryId))(categories)
    }
    let selectedFood = null
    if (selectedCategory) selectedFood = selectedCategory.items[selectedFoodId]

    return (
      <div>
        <HeadLine>
          <H>Categories</H>
          <H>Dishes</H>
          <H>Dish Detail</H>
        </HeadLine>
        <SolidContainer>

          <ListOfCategories
            categories={categories}
            selectedCategoryId={selectedCategoryId}
          />

          <ListOfDishes
            selectedCategory={selectedCategory}
            selectedFoodId={selectedFoodId}
            selectedCategoryId={selectedCategoryId}
          />

          <MealDetail>
            <ItemDetail
              selectedFood={selectedFood}
              selectedFoodId={selectedFoodId}
            />
          </MealDetail>

          <MealDetail>
            {selectedFood ? <FormBox style={{width: '230px'}}>
              <FormBoxBody>
                <ItemNutrition
                  selectedFood={selectedFood}
                  selectedFoodId={selectedFoodId}
                />

                <ItemOptions
                  selectedFood={selectedFood}
                  selectedFoodId={selectedFoodId}
                />

                <ItemIngredients
                  selectedFood={selectedFood}
                  selectedFoodId={selectedFoodId}
                  ingredients={loggedRestaurant.ingredients}
                />

                <ItemAddons
                  addons={addons}
                  selectedFood={selectedFood}
                  selectedFoodId={selectedFoodId}
                />
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
    selectedFoodId: state.restaurant.selectedFoodId,
    foodOptions: state.restaurant.foodOptions,
    foodIngredients: state.restaurant.foodIngredients,
    foodAddons: state.restaurant.foodAddons,
    addons: state.restaurant.addons
  }), {
    getCategories: getCategoriesInitAction,
    getAddons: getAddonsInit
  },
)(Menucontrol);
