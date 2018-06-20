// @flow
import React from 'react';
import SelectField from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core/Menu';

const Select = props => {
  const { value, onChange, name } = props.input;
  return (
    <SelectField
      name={name}
      value={value}
      onChange={newValue => {
        onChange(newValue);
      }}
      {...props.componentProps}
    >
      {props.options.map((option, i) => (
        <MenuItem key={i} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </SelectField>
  );
};

export default Select;
