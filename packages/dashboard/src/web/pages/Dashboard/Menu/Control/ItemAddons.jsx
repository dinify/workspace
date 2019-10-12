import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Label } from 'web/components/styled/FormBox';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';

import { assignAddon, unassignAddon } from 'ducks/menuItem/actions';
import { fetchAddonsAsync } from 'ducks/addon/actions';
import { listOfAddons } from 'ducks/addon/selectors';

import ListOfCustomizations from './ListOfCustomizations';

const ItemAddons = ({
  addonsList,
  fetchAddons,
  addonsLoaded,
  menuItems,
  assignAddon,
  unassignAddon,
  selectedFoodId,
  t
}) => {
  const shouldLoad = addonsList.length < 1 && !addonsLoaded;
  useEffect(() => {
    if (shouldLoad) fetchAddons()
  }, []);
  const selectedFood = menuItems[selectedFoodId];
  if (!selectedFood) {
    return <div />;
  }
  const assignedAddons = selectedFood.addons || [];
  const assignedAddonsIds = assignedAddons.map(o => o.id);

  const dataSource = addonsList
    .filter(o => !assignedAddonsIds.includes(o.id))
    .map(o => ({ value: o.id, label: o.name }));

  return (
    <div>
      <Label>{t('menu.addons')}</Label>
      {selectedFood.addons ? (
        <ListOfCustomizations
          list={selectedFood.addons}
          rmButtonFunction={addon =>
            unassignAddon({
              menuItemId: selectedFoodId,
              addonId: addon.id
            })
          }
        />
      ) : (
        t('menu.noAddons')
      )}
      <AutoComplete
        dataSource={dataSource}
        placeholder={(t('menu.selectAddons'))}
        onChange={addon =>
          assignAddon({
            menuItemId: selectedFoodId,
            addonId: addon.value
          })
        }
      />
    </div>
  );
};

export default connect(
  state => ({
    addonsList: listOfAddons(state),
    addonsLoaded: state.addon.loaded,
    menuItems: state.menuItem.all,
  }),
  {
    fetchAddons: fetchAddonsAsync.request,
    assignAddon,
    unassignAddon,
  },
)(ItemAddons);
