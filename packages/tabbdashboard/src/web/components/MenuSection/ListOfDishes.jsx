// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SwitchButton from 'react-switch-button'
import { lighten } from 'polished'
import R from 'ramda'
import {
  addFoodInitAction,
  rmFoodInitAction,
  selectFoodAction
} from '../../../ducks/restaurant'
import { Form, Text } from 'react-form'
import * as FN from '../../../lib/FN'

const FoodList = styled.ul `
  display: inline-block;
  list-style: none;
  margin: 10px;
  width: 250px;
  vertical-align: top;
`
const FoodItem = styled.li `
  position: relative;
  background: black;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => {
    if (p.disabled) return p.selected ? 'rgb(60, 50, 50)' : lighten(0.3, 'rgb(169, 77, 72)');
    return p.selected ? 'rgb(70, 0, 0)' : 'rgb(169, 77, 72)';
  }};
  font-size: 12px;
  &:hover {
    i {
      color: white;
    }
  }
`
const NewFood = styled.li `
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
const NewFoodInput = styled(Text)`
  background: transparent;
  width: 230px;
  padding: 5px;
  color: white;
  border: none;
  outline: none;
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
const ListOfDishes = ({
  selectedCategory,
  selectedFoodId,
  selectedCategoryId,
  rmFood,
  addFood,
  selectFood,
  menuItemsMap
}) => {
  if (!selectedCategory) return (<div />)
  const menuItemsList = R.filter((item) => item.menu_category_id === selectedCategoryId, FN.MapToList(menuItemsMap))
  return (
    <FoodList>
      {menuItemsList.map((food, i) =>
        <FoodItem key={food.id} selected={food.id === selectedFoodId} disabled={!food.published} onClick={() => selectFood({foodId: food.id})}>
          <span>{food.name}</span>
          <ToggleContainer food>
            <SwitchButton
              name={`switch-food-${food.id}`}
              type="switch"
              defaultChecked={food.published}
              onChange={() => {
                if(food.published) {
                  rmFood({ foodId: food.id, enabled: false })
                } else rmFood({ foodId: food.id, enabled: true })
              }}
            />
          </ToggleContainer>
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
                  <i className="material-icons">add</i>
                </NewFoodButton>
              </form>
            )
          }}
        </Form>
      </NewFood>
    </FoodList>
  );
}

export default connect(
  state => ({
    menuItemsMap: state.restaurant.menuItems
  }), {
    addFood: addFoodInitAction,
    rmFood: rmFoodInitAction,
    selectFood: selectFoodAction
  }
)(ListOfDishes);
