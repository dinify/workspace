// @flow
import React from 'react'
import TextField from 'material-ui/TextField';

const Text = (props) => {
  const { value, onChange, name } = props.input
  return (
    <TextField
      name={name}
      value={value}
      onChange={(e, newValue) => {
        onChange(newValue)
      }}
      {...props.componentProps}
    />
  )
}

export default Text
