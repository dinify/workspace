import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as FN from '@dinify/common/dist/lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { assignOption, unassignOption } from 'ducks/menuItem/actions';
import { fetchOptions } from 'ducks/option/actions';
import { listOfOptions } from 'ducks/option/selectors';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import S from 'string';

const choicesEnumText = (choices) => {
  let text = ''
  const choicesList = FN.MapToList(choices)
  choicesList.forEach((choice, i) => {
    text = `${text}${choice.name}${choicesList.length > (i + 1) ? ' | ' : ''}`;
  })
  return S(text).truncate(40).s
}

const ItemOptions = ({
  optionsList,
  fetchOptions,
  optionsLoaded,
  selectedFoodId,
  assignOption,
  unassignOption,
  menuItems,
  t
}) => {
  const shouldLoad = optionsList.length < 1 && !optionsLoaded;
  useEffect(() => {
    if (shouldLoad) fetchOptions()
  }, []);
  const selectedFood = menuItems[selectedFoodId];
  if (!selectedFood) {
    return <div />;
  }
  const assignedOptions = selectedFood.options || [];
  const assignedOptionsIds = assignedOptions.map(o => o.id);

  const dataSource = optionsList
    .filter(o => !assignedOptionsIds.includes(o.id))
    .map(o => ({ value: o.id, label: o.name }));

  return (
    <div style={{ marginBottom: 30 }}>
      <Label>{t('menu.optionGroups')}</Label>

      {selectedFood.options ? (
        <div>
          {assignedOptions.map((option, i) => (
            <div key={i}>
              <Chip
                style={{marginTop: '10px', maxWidth: '100%'}}
                avatar={
                  <Avatar style={{width: 'auto', borderRadius: '32px', padding: '0 10px'}}>
                    {option.name}
                  </Avatar>
                }
                onDelete={() =>
                  unassignOption({
                    menuItemId: selectedFoodId,
                    optionId: option.id
                  })
                }
                label={<div style={{maxWidth: '280px', overflow: 'hidden'}}>
                  {choicesEnumText(option.choices)}
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
            menuItemId: selectedFoodId,
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
    optionsLoaded: state.option.loaded,
    menuItems: state.menuItem.all,
  }),
  {
    fetchOptions,
    assignOption,
    unassignOption,
  },
)(ItemOptions);
