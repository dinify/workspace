// @flow
import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';

const InputAndButton = props => {
  const { value, onChange, name } = props.input;
  return (
    <Input
      type="text"
      name={name}
      value={value}
      onChange={newValue => {
        onChange(newValue);
      }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton type="submit" aria-label="Add option">
            {props.buttonIcon}
          </IconButton>
        </InputAdornment>
      }
      {...props.componentProps}
    />
  );
};

export default InputAndButton;
