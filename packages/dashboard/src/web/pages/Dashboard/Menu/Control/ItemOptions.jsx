import React from 'react';
import { connect } from 'react-redux';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import * as FN from '@dinify/common/dist/lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { updateCusomizationsInit } from 'ducks/menuItem/actions';
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
  optionsMap,
  selectedFoodId,
  updateCusomizations,
  menuItems,
  t
}) => {
  const optionsList = FN.MapToList(optionsMap);
  const dataSource = optionsList.map(o => ({ value: o.id, label: o.name }));
  const selectedFood = menuItems[selectedFoodId];
  return (
    <div style={{ marginBottom: 30 }}>
      <Label>{t('menu.optionGroups')}</Label>

      {selectedFood.options ? (
        <div>
          {FN.MapToList(selectedFood.options).map((option, i) => (
            <div key={i}>
              <Chip
                style={{marginTop: '10px', maxWidth: '100%'}}
                avatar={
                  <Avatar style={{width: 'auto', borderRadius: '32px', padding: '0 10px'}}>
                    {option.name}
                  </Avatar>
                }
                onDelete={() =>
                  updateCusomizations({
                    menuItemId: selectedFoodId,
                    actionKind: 'REMOVE',
                    custKey: 'options',
                    custId: option.id
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
          updateCusomizations({
            menuItemId: selectedFoodId,
            actionKind: 'ADD',
            custKey: 'options',
            custId: option.value,
            cust: {
              ...find(propEq('id', option.value))(optionsList),
              difference: { amount: '0', currency: 'CZK' },
            },
          })
        }
      />
    </div>
  );
};

export default connect(
  state => ({
    optionsMap: state.option.all,
    menuItems: state.menuItem.all,
  }),
  {
    updateCusomizations: updateCusomizationsInit
  },
)(ItemOptions);
