// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit, FieldWrapper, Label } from 'web/components/styled/FormBox'
import { lighten } from 'polished'
import SwitchButton from 'react-switch-button'
import * as FN from 'lib/FN'
import Grid from 'material-ui/Grid'

import { Form, Text, Select, Textarea } from 'react-form'

import {
  getCategoriesInitAction,
  createAddonInit,
  updateAddonInit,
  createIngredientInit,
  createOptionInit,
} from 'ducks/restaurantLegacy'

const AddonsList = styled.ul `
  display: inline-block;
  list-style: none;
  margin: 10px;
  width: 250px;
  vertical-align: top;
`
const AddonItem = styled.li `
  position: relative;
  background: black;
  color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => p.bg ? p.bg : 'rgb(204, 161, 41)'};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    i {
      color: white;
    }
  }
  div, form {
    display: inline-block;
  }
`
const NewAddon = styled.li `
  position: relative;
  background: black;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: ${(p) => p.bg ? p.bg : 'rgb(204, 161, 41)'};
  font-size: 12px;
  &:hover {
    i {
      color: white;
    }
  }
`
const OnItemInput = styled(Text)`
  position: relative;
  top: -3px;
  background: rgba(0,0,0,.05);
  text-align: right;
  width: 60px;
  padding: 4px;
  border-radius: 3px;
  color: white;
  border: none;
  outline: none;
  border: 1px solid rgba(0,0,0,.05);
`
const NewAddonInput = styled(Text)`
  background: transparent;
  width: 230px;
  padding: 5px;
  color: white;
  border: none;
  outline: none;
`
const NewAddonButton = styled.button `
  position: absolute;
  top: 11px;
  right: 5px;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`
const SolidContainer = styled.div `
  width: 1100px;
`

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

class Menucontrol extends React.Component {
  render() {
    const {
      loggedRestaurant,
      addons,
      addAddon,
      addIngredient,
      addOption,
      updateAddonPrice,
      ingredients,
      options
    } = this.props;

    return (
      <div>
        <SolidContainer>
          <HeadLine>
            <H>Addons</H>
            <H>Ingredients</H>
            <H>Options</H>
          </HeadLine>
          <AddonsList>

            {FN.MapToList(addons).sort((a,b) => a.name.localeCompare(b.name)).map((addon, i) =>
              <AddonItem key={addon.id} >
                <div style={{verticalAlign: 'middle'}}>
                <span>{addon.name}</span>
                </div>
                <div style={{float: 'right', verticalAlign: 'middle'}}>
                  <Form
                    onSubmit={({ price }) => {
                      updateAddonPrice({ addonId: addon.id, price })
                    }}
                    defaultValues={{
                      price: addon.price.amount
                    }}
                  >
                    {({submitForm}) => {
                      return (
                        <form onSubmit={submitForm}>
                          <OnItemInput
                            field='price'
                            placeholder='Price'
                            type='number'
                          />
                          <span> KD</span>
                        </form>
                      )
                    }}
                  </Form>
                </div>
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
                      <NewAddonInput
                        field='name'
                        placeholder='Name of new addon'
                        style={{borderBottom: '1px solid white', width: '200px'}}
                      />
                      <NewAddonInput field='price' type="number" placeholder='Price of new addon' />
                      <NewAddonButton>
                        <i className="material-icons">add</i>
                      </NewAddonButton>
                    </form>
                  )
                }}
              </Form>
            </NewAddon>
          </AddonsList>
          <AddonsList>
            {FN.MapToList(ingredients).sort((a,b) => a.name.localeCompare(b.name)).map((ingredient, i) =>
              <AddonItem key={ingredient.id} bg={'rgb(169, 77, 72)'}>
                <div style={{verticalAlign: 'middle'}}>
                <span>{ingredient.name}</span>
                </div>
              </AddonItem>
            )}
            <NewAddon bg={'rgb(169, 77, 72)'}>
              <Form
                onSubmit={({ name }) => {
                  addIngredient({ name })
                }}
                validate={({ name }) => {
                  return {
                    name: !name ? 'Addon Name is required' : undefined                  }
                }}
              >
                {({submitForm}) => {
                  return (
                    <form onSubmit={submitForm}>
                      <NewAddonInput
                        field='name'
                        placeholder='Name of new ingredient'
                        style={{borderBottom: '1px solid white', width: '200px'}}
                      />
                      <NewAddonButton>
                        <i className="material-icons">add</i>
                      </NewAddonButton>
                    </form>
                  )
                }}
              </Form>
            </NewAddon>
          </AddonsList>
          <AddonsList>
            {FN.MapToList(options).sort((a,b) => a.name.localeCompare(b.name)).map((option, i) =>
              <AddonItem key={option.id} bg={'rgb(53, 75, 92)'}>
                <div style={{verticalAlign: 'middle'}}>
                  <span>{option.name}</span>
                </div>
              </AddonItem>
            )}
            <NewAddon bg={'rgb(53, 75, 92)'}>
              <Form
                onSubmit={({ name }) => {
                  addOption({ name })
                }}
                validate={({ name}) => {
                  return {
                    name: !name ? 'Addon Name is required' : undefined,
                  }
                }}
              >
                {({submitForm}) => {
                  return (
                    <form onSubmit={submitForm}>
                      <NewAddonInput
                        field='name'
                        placeholder='Name of new option'
                        style={{borderBottom: '1px solid white', width: '200px'}}
                      />
                      <NewAddonButton>
                        <i className="material-icons">add</i>
                      </NewAddonButton>
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
    addons: state.restaurant.loggedRestaurant.addons,
    ingredients: state.restaurant.loggedRestaurant.ingredients,
    options: state.restaurant.loggedRestaurant.options
  }), {
    addAddon: createAddonInit,
    addIngredient: createIngredientInit,
    addOption: createOptionInit,
    updateAddonPrice: updateAddonInit
  },
)(Menucontrol);
