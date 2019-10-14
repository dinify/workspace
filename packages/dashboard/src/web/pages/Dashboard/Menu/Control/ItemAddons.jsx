import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Label } from 'web/components/styled/FormBox';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';

import { assignAddon, unassignAddon } from 'ducks/menuItem/actions';
import { fetchAddonsAsync } from 'ducks/addon/actions';
import { listOfAddons } from 'ducks/addon/selectors';

import ListOfCustomizations from './ListOfCustomizations';
import { getT } from '@dinify/common/src/lib/translation.ts';


const ItemAddons = ({
  addonsList,
  addonsMap,
  fetchAddons,
  addonsLoaded,
  assignAddon,
  unassignAddon,
  selectedFood,
  defaultLang,
  t
}) => {
  const shouldLoad = addonsList.length < 1 && !addonsLoaded;
  useEffect(() => {
    if (shouldLoad) fetchAddons()
  }, []);
  if (!selectedFood) {
    return <div />;
  }
  let assignedAddons = [];

  if (selectedFood.menuAddons) {
    
    assignedAddons = selectedFood.menuAddons.map((compoundId) => {
      const addonId = compoundId.split('.')[1];
      return addonsMap[addonId];
    });
  }

  console.log(assignedAddons);

  const assignedAddonsIds = assignedAddons.map(o => o.id);

  const dataSource = addonsList
    .filter(o => !assignedAddonsIds.includes(o.id))
    .map(o => ({ value: o.id, label: getT(o.translations, defaultLang)}));

  return (
    <div>
      <Label>{t('menu.addons')}</Label>
      {assignedAddons ? (
        <ListOfCustomizations
          list={assignedAddons}
          rmButtonFunction={addon =>
            unassignAddon({
              menuItemId: selectedFood.id,
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
            menuItemId: selectedFood.id,
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
    addonsMap: state.addon.all,
    addonsLoaded: state.addon.loaded,
    defaultLang: state.restaurant.defaultLanguage
  }),
  {
    fetchAddons: fetchAddonsAsync.request,
    assignAddon,
    unassignAddon,
  },
)(ItemAddons);
