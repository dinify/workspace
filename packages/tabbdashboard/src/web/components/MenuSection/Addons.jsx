// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { Error } from '../../../flow'
import { Link } from 'react-router-dom'
import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit, FieldWrapper, Label } from '../styled/FormBox'
import { Header } from '../styled/Header'
import { lighten } from 'polished'
import SwitchButton from 'react-switch-button'

import { Form, Text, Select, Textarea } from 'react-form'

import {
  getCategoriesInitAction,
  getAddonsInit,
  addAddonInit
} from '../../../ducks/restaurant'

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

const AddonsList = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 10px;
  width: 250px;
  vertical-align: top;
`

const AddonItem = styled.li`
  position: relative;
  background: black;
  color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => {
    return 'rgb(204, 161, 41)';
  }};
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
  width: 250px;
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

const ToggleContainer = styled.div`
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

const HeadLine = styled.div`
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
`

const H = styled.div`
  display: inline-block;
  width: 250px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  margin-right: 20px;
`

const MealDetail = styled.div`
  display: inline-block;
  width: 250px;
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

const NewAddon = styled.li`
  position: relative;
  background: black;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: rgb(204, 161, 41);
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
  width: 1100px;
`

const FoodImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(p) => p.imageURL});
  background-size: cover;
  background-position: center;
`

const customItemColors = [
  '#ef5350',
  '#7E57C2',
  '#29B6F6',
  '#9CCC65',
  '#FFCA28',
  '#8D6E63',
  '#ef5350',
  '#7E57C2',
  '#29B6F6',
  '#9CCC65',
  '#FFCA28',
  '#8D6E63'
]

export const Customizations = styled.div`
  margin-top: 10px;
`

export const CustomItem = styled.div`
  display: inline-block;
  background: ${p => customItemColors[p.bgIndex] ? customItemColors[p.bgIndex] : 'black'};
  margin: 3px;
  border-radius: 40px;
  color: white;
  padding: 3px 12px;
  letter-spacing: 0.3px;
  font-weight: 400;
  font-size: 12px;
  button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    color: rgba(255,255,255,0.6);
    margin-left: 5px;
    &:hover {
      color: white;
    }
  }
`

const ListOfCustomizations =  ({ list, rmButtonFunction }) => {
	if (list && list.length > 0) {
		return (
			<Customizations>
				{list.map((customization, i) =>
          <CustomItem key={i} bgIndex={i}>
            <span style={{whiteSpace: 'nowrap'}}>{customization.name}</span>
            <button onClick={() => rmButtonFunction(customization)}>
              <i className="ion-close" />
            </button>
          </CustomItem>
				)}
			</Customizations>
		)
	}
	return null
}

class Menucontrol extends React.Component {
  componentDidMount() {
    const { loggedRestaurant, getAddons } = this.props;
    getAddons();
  }
  render() {
    const { loggedRestaurant, addons, addAddon } = this.props;

    return (
      <div>
        <SolidContainer>
          <AddonsList>
            {addons.sort((a,b) => a.id - b.id).map((addon, i) =>
              <AddonItem key={addon.id} >
                <span>{addon.name}</span>
              </AddonItem>
            )}
            <NewAddon>
              <Form
                onSubmit={({ name, price }) => {
                  addAddon({ name, price })
                }}
                validate={({ name, price }) => {
                  return {
                    name: !name ? 'Addon Name is required' : undefined,
                    price: !price ? 'Addon Price is required' : undefined,
                  }
                }}
              >
                {({submitForm}) => {
                  return (
                    <form onSubmit={submitForm}>
                      <NewFoodInput field='name' placeholder='Name of new addon' />
                      <NewFoodInput field='price' type="number" placeholder='Price of new addon' />
                      <NewFoodButton>
                        <i className="material-icons">add</i>
                      </NewFoodButton>
                    </form>
                  )
                }}
              </Form>
            </NewAddon>
          </AddonsList>
        </SolidContainer>
      </div>);
    }
  }

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    addons: state.restaurant.addons
  }),
  {
    getAddons: getAddonsInit,
    addAddon: addAddonInit,
  },
)(Menucontrol);
