// @flow
import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import * as FN from '../../../lib/FN'
import { Label } from '../styled/FormBox'
import {
  assignOptionInit,
  unassignOptionInit
} from '../../../ducks/restaurant'
import ListOfCustomizations from './ListOfCustomizations'
import AutoComplete from '../MaterialInputs/AutoComplete'

const ItemOptions = ({
  optionsMap,
  selectedFoodId,
  assignOption,
  unassignOption,
  menuItems
}) => {
  const optionsList = FN.MapToList(optionsMap)
  const dataSource = optionsList.map((o) => ({value: o.id, label: o.name}))
  const selectedFood = menuItems[selectedFoodId]
  return (
    <div>
      {selectedFood.options ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.options)}
          rmButtonFunction={(option) => unassignOption({
            id: selectedFoodId,
            optionId: option.id,
            originalObject: {options: R.mapObjIndexed((o) => {
              if(!o.difference) o.difference = o.pivot.difference
              return o
            }, selectedFood.options)}
          })}
        />
      : 'No options'}
      <AutoComplete
        label="Options"
        placeholder="Select options here"
        dataSource={dataSource}
        onChange={(optionId) => assignOption({
          id: selectedFoodId,
          optionId,
          option: {
            ...R.find(R.propEq('id', optionId))(optionsList),
            difference: {amount: "-1.88", currency: "KWD"}
          },
          originalObject: {options: R.mapObjIndexed((o) => {
            if(!o.difference) o.difference= o.pivot.difference
            return o
          }, selectedFood.options)}
        })}
      />
    </div>
  );
}

export default connect(
  state => ({
    optionsMap: state.restaurant.loggedRestaurant.options,
    menuItems: state.menuItem.all
  }), {
    assignOption: assignOptionInit,
    unassignOption: unassignOptionInit,
  }
)(ItemOptions);
