// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as FN from 'lib/FN'
import { Label } from 'web/components/styled/FormBox'
import {
  assignAddonInit,
  unassignAddonInit
} from 'ducks/restaurantLegacy'
import ListOfCustomizations from './ListOfCustomizations'
import AutoComplete from 'web/components/MaterialInputs/AutoComplete'

const ItemAddons = ({
  addonsMap,
  menuItems,
  selectedFoodId,
  assignAddon,
  unassignAddon
}) => {
  const addonsList = FN.MapToList(addonsMap)
  const dataSource = addonsList.map((o) => ({value: o.id, label: o.name}))
  const selectedFood = menuItems[selectedFoodId]
  return (
    <div>
      <Label>Addons</Label>
      {selectedFood.addons ?
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.addons)}
          rmButtonFunction={(addon) => unassignAddon({
            id: selectedFoodId,
            addonId: addon.id,
            originalObject: {addons: selectedFood.addons}
          })}
        />
      : 'No addon'}
      <AutoComplete
        dataSource={dataSource}
        placeholder="Select addons here"
        onChange={(addonId) => assignAddon({
          id: selectedFoodId,
          addonId,
          addon: addonsMap[addonId],
          originalObject: {addons: selectedFood.addons}
        })}
      />
    </div>
  );
}

export default connect(
  state => ({
    addonsMap: state.addon.all,
    menuItems: state.menuItem.all
  }), {
    assignAddon: assignAddonInit,
    unassignAddon: unassignAddonInit,
  }
)(ItemAddons);
