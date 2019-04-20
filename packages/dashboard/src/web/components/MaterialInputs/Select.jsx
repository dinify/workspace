// @flow
import React from 'react';
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const Select = props => {
  const { options, input, componentProps } = props;
  const { value, onChange, name } = input;

  return (
    <FormControl {...componentProps}>
      <InputLabel shrink>
        {componentProps.label}
      </InputLabel>
      <SelectField
        name={name}
        value={value}
        onChange={newValue => {
          onChange(newValue);
        }}
        {...componentProps}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectField>
    </FormControl>
  );
};

export default Select;
