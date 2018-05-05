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
  selectedFood,
  selectedFoodId,
  assignOption,
  unassignOption
}) => {
  const optionsList = FN.MapToList(optionsMap)
  const dataSource = optionsList.map((o) => ({value: o.id, label: o.name}))
  return (
    <div>
      <Label>Options</Label>
      {selectedFood.options ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.options)}
          rmButtonFunction={(option) => unassignOption({
            foodId: selectedFoodId,
            optionId: option.id,
            originalObject: {options: R.mapObjIndexed((o) => {
              if(!o.difference) o.difference = o.pivot.difference
              return o
            }, selectedFood.options)}
          })}
        />
      : 'No options'}
      <AutoComplete
        dataSource={dataSource}
      />
    </div>
  );
}

export default connect(
  state => ({}), {
    assignOption: assignOptionInit,
    unassignOption: unassignOptionInit,
  }
)(ItemOptions);
