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
      getAddons
    } = this.props;
    getAddons();
  }
  render() {
    const {
      categories,
      menuItemsMap,
      selectedCategoryId,
      selectedFoodId,
      addonsMap,
      ingredientsMap,
      optionsMap
    } = this.props;

    let selectedCategory = null
    if (selectedCategoryId) {
      selectedCategory = categories[selectedCategoryId]
    }
    let selectedFood = null
    if (selectedCategory) selectedFood = menuItemsMap[selectedFoodId]

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
                  optionsMap={optionsMap}
                />

                <ItemIngredients
                  selectedFood={selectedFood}
                  selectedFoodId={selectedFoodId}
                  ingredientsMap={ingredientsMap}
                />

                <ItemAddons
                  addonsMap={addonsMap}
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
    categories: state.restaurant.categories,
    menuItemsMap: state.restaurant.menuItems,
    ingredientsMap: state.restaurant.loggedRestaurant.ingredients,
    optionsMap: state.restaurant.loggedRestaurant.options,
    selectedCategoryId: state.restaurant.selectedCategoryId,
    selectedFoodId: state.restaurant.selectedFoodId
  }), {
    getAddons: getAddonsInit
  },
)(Menucontrol);
