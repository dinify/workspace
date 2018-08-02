// @flow
import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import * as FN from 'lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { assignOptionInit, unassignOptionInit } from 'ducks/restaurantLegacy';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import S from 'string';

const choicesEnumText = (choices) => {
  let text = ''
  const choicesList = FN.MapToList(choices)
  choicesList.forEach((choice, i) => {
    text = `${text}${choice.name}${choicesList.length > (i + 1) ? ', ' : ''}`;
  })
  return S(text).truncate(40).s
}

const ItemOptions = ({
  optionsMap,
  selectedFoodId,
  assignOption,
  unassignOption,
  menuItems,
}) => {
  const optionsList = FN.MapToList(optionsMap);
  const dataSource = optionsList.map(o => ({ value: o.id, label: o.name }));
  const selectedFood = menuItems[selectedFoodId];
  console.log(selectedFood.options, 'optionsList');
  return (
    <div style={{ marginBottom: 30 }}>
      <Label>Options</Label>

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
                onDelete={() => unassignOption({
                  foodId: selectedFoodId,
                  optionId: option.id,
                  originalObject: {
                    options: R.mapObjIndexed(o => {
                      if (!o.difference) o.difference = o.pivot.difference;
                      return o;
                    }, selectedFood.options),
                  },
                })}
                label={<div style={{maxWidth: '280px', overflow: 'hidden'}}>
                  {choicesEnumText(option.choices)}
                </div>}
              />
            </div>
          ))}
        </div>
      ) : (
        'No options'
      )}

      <AutoComplete
        label="Options"
        placeholder="Select options here"
        dataSource={dataSource}
        onChange={optionId =>
          assignOption({
            id: selectedFoodId,
            optionId,
            option: {
              ...R.find(R.propEq('id', optionId))(optionsList),
              difference: { amount: '-1.88', currency: 'KWD' },
            },
            originalObject: {
              options: R.mapObjIndexed(o => {
                if (!o.difference) o.difference = o.pivot.difference;
                return o;
              }, selectedFood.options),
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
    assignOption: assignOptionInit,
    unassignOption: unassignOptionInit,
  },
)(ItemOptions);
