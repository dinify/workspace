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
import AutoComplete from 'material-ui/AutoComplete'

const ItemOptions = ({
  optionsMap,
  selectedFood,
  selectedFoodId,
  assignOption,
  unassignOption
}) => {
  const optionsList = FN.MapToList(optionsMap)
  const dataSource = optionsList.map((o) => ({value: o.id, text: o.name}))
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
        hintText="e.g. Type of bread"
        dataSource={dataSource}
        onUpdateInput={() => {}}
        floatingLabelText="Assign option"
        fullWidth={true}
        filter={(searchText, key) => {
           return key.toLowerCase().startsWith(searchText.toLowerCase())
        }}
        onNewRequest={(selected) => assignOption({
          foodId: selectedFoodId,
          optionId: selected.value,
          option: {
            ...R.find(R.propEq('id', selected.value))(optionsList),
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
  state => ({}), {
    assignOption: assignOptionInit,
    unassignOption: unassignOptionInit,
  }
)(ItemOptions);
