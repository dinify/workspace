// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FormBox, FormBoxBody } from '../styled/FormBox'
import ListOfCategories from './ListOfCategories'
import ListOfDishes from './ListOfDishes'
import ItemDetail from './ItemDetail'

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

const DishDetail = styled.div `
  display: inline-block;
  width: 500px;
  vertical-align: top;
`

const SolidContainer = styled.div `
  width: 1100px;
`


class Menucontrol extends React.Component {
  render() {
    const {
      selectedCategoryId,
      selectedFoodId,
      menuItems
    } = this.props;

    return (
      <div>
        <HeadLine>
          <H>Categories</H>
          <H>Dishes</H>
          <H>Dish Detail</H>
        </HeadLine>
        <SolidContainer>

          <ListOfCategories
            selectedCategoryId={selectedCategoryId}
          />

          <ListOfDishes
            selectedFoodId={selectedFoodId}
            selectedCategoryId={selectedCategoryId}
          />

          <DishDetail>
            <ItemDetail
              selectedFoodId={selectedFoodId}
            />
          </DishDetail>

        </SolidContainer>
      </div>);
  }
}

export default connect(
  state => ({
    selectedCategoryId: state.restaurant.selectedCategoryId,
    selectedFoodId: state.restaurant.selectedFoodId,
    menuItems: state.menuItem.all,
  })
)(Menucontrol);
