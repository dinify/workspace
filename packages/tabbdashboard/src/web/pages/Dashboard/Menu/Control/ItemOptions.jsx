// @flow
import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import * as FN from 'lib/FN';
import { Label } from 'web/components/styled/FormBox';
import { assignOptionInit, unassignOptionInit } from 'ducks/restaurantLegacy';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';

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
    <div>
      <Label>Options</Label>

      {selectedFood.options ? (
        <div>
          {FN.MapToList(selectedFood.options).map((option, i) => (
            <div key={i}>{option.name}</div>
          ))}
        </div>
      ) : (
        'No options'
      )}

      {
        //  <ListOfCustomizations
        //    list={FN.MapToList(selectedFood.options)}
        //    rmButtonFunction={(option) => unassignOption({
        //      id: selectedFoodId,
        //      optionId: option.id,
        //      originalObject: {options: R.mapObjIndexed((o) => {
        //        if(!o.difference) o.difference = o.pivot.difference
        //        return o
        //      }, selectedFood.options)}
        //    })}
        //  />
      }

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
