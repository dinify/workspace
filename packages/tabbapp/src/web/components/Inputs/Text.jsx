// @flow
import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

let labelRef;
const Text = props => {
  const {
    theme,
    componentProps,
    input: { value, onChange, name },
    meta: { touched, error }
  } = props;
  const isEmpty = (str) => (!str || str.length === 0);

  let other = componentProps;
  if (typeof componentProps === 'function') other = componentProps({value, error});
  return (
    <TextField
      key={theme.palette.type} // Rerender on theme change
      name={name}
      error={!isEmpty(error)}
      onChange={onChange}
      value={value}
      helperText={error}
      {...other}
    />
  );
};

const NewText = ({componentProps,
input: { value, onChange, name },
meta: { touched, error }}) => {
  const { variant, label } = componentProps;
  return variant !== 'outlined' ? <FormControl
    variant={variant}
    error={error ? true : false}
    aria-describedby="text-component-helper">
    <InputLabel htmlFor="text-component">{label}</InputLabel>
    <Input
      id="text-component"
      name={name}
      value={value}
      onChange={onChange}
      {...componentProps}
    />
    <FormHelperText id="text-component-helper">{error}</FormHelperText>
  </FormControl> :
  <FormControl
    error={error ? true : false}
    variant="outlined"
    aria-describedby="text-component-helper">
      <InputLabel
        ref={node => {labelRef = ReactDOM.findDOMNode(node)}}
        htmlFor="text-component-outlined">
        {label}
      </InputLabel>
      <OutlinedInput
        id="text-component-outlined"
        name={name}
        value={value}
        onChange={onChange}
        labelWidth={labelRef ? labelRef.offsetWidth : 0}
        {...componentProps}
      />
      <FormHelperText id="text-component-helper">{error}</FormHelperText>
  </FormControl>;
}

export default withTheme()(Text);
