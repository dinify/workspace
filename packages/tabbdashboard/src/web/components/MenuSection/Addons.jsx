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
  addAddonInit,
  updateAddonPriceInit
} from '../../../ducks/restaurant'

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
  background-color: rgb(204, 161, 41);
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
class Menucontrol extends React.Component {
  componentDidMount() {
    const {
      loggedRestaurant,
      getAddons
    } = this.props;
    getAddons();
  }
  render() {
    const {
      loggedRestaurant,
      addons,
      addAddon,
      updateAddonPrice
    } = this.props;

    return (
      <div>
        <SolidContainer>
          <AddonsList>
            {addons.sort((a,b) => a.id - b.id).map((addon, i) =>
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
                          <span> KWD</span>
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
        </SolidContainer>
      </div>);
  }
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    addons: state.restaurant.addons
  }), {
    getAddons: getAddonsInit,
    addAddon: addAddonInit,
    updateAddonPrice: updateAddonPriceInit
  },
)(Menucontrol);
