// @flow
import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import * as FN from '../../../lib/FN'
import { Label } from '../styled/FormBox'
import {
  assignAddonInit,
  unassignAddonInit
} from '../../../ducks/restaurant'
import ListOfCustomizations from './ListOfCustomizations'
import AutoComplete from '../MaterialInputs/AutoComplete'

const ItemAddons = ({
  addonsMap,
  selectedFood,
  selectedFoodId,
  assignAddon,
  unassignAddon
}) => {
  const addonsList = FN.MapToList(addonsMap)
  const dataSource = addonsList.map((o) => ({value: o.id, label: o.name}))
  console.log(dataSource);
  return (
    <div>
      <Label>Addons</Label>
      {selectedFood.addons ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.addons)}
          rmButtonFunction={(addon) => unassignAddon({
            foodId: selectedFoodId,
            addonId: addon.id,
            originalObject: {addons: selectedFood.addons}
          })}
        />
      : 'No addon'}
      <AutoComplete
        dataSource={dataSource}
      />
    </div>
  );
}

export default connect(
  state => ({}), {
    assignAddon: assignAddonInit,
    unassignAddon: unassignAddonInit,
  }
)(ItemAddons);
