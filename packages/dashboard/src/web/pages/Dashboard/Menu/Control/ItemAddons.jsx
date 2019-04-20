// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { updateCusomizationsInit } from 'ducks/menuItem/actions';
import ListOfCustomizations from './ListOfCustomizations';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';

const ItemAddons = ({
  addonsMap,
  menuItems,
  selectedFoodId,
  updateCusomizations,
  t
}) => {
  const addonsList = FN.MapToList(addonsMap);
  const dataSource = addonsList.map(o => ({ value: o.id, label: o.name }));
  const selectedFood = menuItems[selectedFoodId];
  return (
    <div>
      <Label>{t('menu.addons')}</Label>
      {selectedFood.addons ? (
        <ListOfCustomizations
          list={FN.MapToList(selectedFood.addons)}
          rmButtonFunction={addon =>
            updateCusomizations({
              menuItemId: selectedFoodId,
              actionKind: 'REMOVE',
              custKey: 'addons',
              custId: addon.id
            })
          }
        />
      ) : (
        'No addon'
      )}
      <AutoComplete
        dataSource={dataSource}
        placeholder="Select addons here"
        onChange={addonId =>
          updateCusomizations({
            menuItemId: selectedFoodId,
            actionKind: 'ADD',
            custKey: 'addons',
            custId: addonId,
            cust: addonsMap[addonId],
          })
        }
      />
    </div>
  );
};

export default connect(
  state => ({
    addonsMap: state.addon.all,
    menuItems: state.menuItem.all,
  }),
  {
    updateCusomizations: updateCusomizationsInit
  },
)(ItemAddons);
