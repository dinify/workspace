// @flow
import React from 'react';
import Input, { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';

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
