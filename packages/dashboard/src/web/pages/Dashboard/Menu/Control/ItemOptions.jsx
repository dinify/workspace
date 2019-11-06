import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as FN from '@dinify/common/src/lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { fetchOptionsAsync } from 'features/option/actions.ts';
import { listOfOptions } from 'features/option/selectors';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import S from 'string';
import { assignOptionAsync, unassignOptionAsync } from 'features/menuItem/actions';
import { getT } from '@dinify/common/src/lib/translation.ts';
import assoc from 'ramda/es/assoc';

const choicesEnumText = (choicesList, defaultLang) => {
  let text = ''
  choicesList.forEach((choice, i) => {
    text = `${text}${getT(choice.translations, defaultLang)}${choicesList.length > (i + 1) ? ' | ' : ''}`;
  })
  return S(text).truncate(40).s
}

const ItemOptions = ({
  optionsList,
  optionsMap,
  choicesMap,
  fetchOptions,
  optionsLoaded,
  selectedFood,
  assignOption,
  unassignOption,
  t,
  defaultLang
}) => {
  const shouldLoad = optionsList.length < 1 && !optionsLoaded;
  
  useEffect(() => {
    if (shouldLoad) fetchOptions();
  }, []);

  if (!selectedFood) {
    return <div />;
  }

  let assignedOptions = [];

  if (selectedFood.menuOptions) {
    assignedOptions = selectedFood.menuOptions.map((compoundId) => {
      const optionId = compoundId.split('.')[1];
      const option = optionsMap[optionId];
      const choices = option.choices.map((chId) => choicesMap[chId]);
      return assoc('choices', choices)(option);
    });
  }

  const assignedOptionsIds = assignedOptions.map(o => o.id);

  const dataSource = optionsList
    .filter(o => !assignedOptionsIds.includes(o.id))
    .map(o => ({ value: o.id, label: getT(o.translations, defaultLang) }));

  return (
    <div style={{ marginBottom: 30 }}>
      <Label>{t('menu.optionGroups')}</Label>

      {selectedFood.menuOptions ? (
        <div>
          {assignedOptions.map((option, i) => (
            <div key={i}>
              <Chip
                style={{marginTop: '10px', maxWidth: '100%'}}
                avatar={
                  <Avatar style={{width: 'auto', borderRadius: '32px', padding: '0 10px'}}>
                    {getT(option.translations, defaultLang)}
                  </Avatar>
                }
                onDelete={() =>
                  unassignOption({
                    menuItemId: selectedFood.id,
                    optionId: option.id
                  })
                }
                label={<div style={{maxWidth: '280px', overflow: 'hidden'}}>
                  {choicesEnumText(option.choices, defaultLang)}
                </div>}
              />
            </div>
          ))}
        </div>
      ) : (
        t('menu.noOptionGroups')
      )}

      <AutoComplete
        label="Options"
        placeholder={(t('menu.selectOptionGroups'))}
        dataSource={dataSource}
        onChange={option =>
          assignOption({
            menuItemId: selectedFood.id,
            optionId: option.value
          })
        }
      />
    </div>
  );
};

export default connect(
  state => ({
    optionsList: listOfOptions(state),
    optionsMap: state.option.all,
    choicesMap: state.option.choices,
    optionsLoaded: state.option.loaded,
    defaultLang: state.restaurant.defaultLanguage
  }),
  {
    fetchOptions: fetchOptionsAsync.request,
    assignOption: assignOptionAsync.request,
    unassignOption: unassignOptionAsync.request,
  },
)(ItemOptions);
