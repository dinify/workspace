import React from "react";
import { Field } from "react-form";
import TextField from "@material-ui/core/TextField";

const CustomText = props => (
  <Field field={props.field}>
    {fieldApi => {
      const { onChange, onBlur, field, labelText, helperText, ...rest } = props
      const { value, error, warning, success, setValue, setTouched } = fieldApi
      return (
        <div>
          <TextField
            variant="filled"
            fullWidth={true}
            label={labelText}
            helperText={helperText}
            InputProps={{
              onChange: e => {
                setValue(e.target.value)
                if (onChange) {
                  onChange(e.target.value, e)
                }
              },
              onBlur: e => {
                setTouched()
                if (onBlur) {
                  onBlur(e)
                }
              },
              value: value || "",
              ...rest
            }}
            {...rest}
          />
          {/*error ? <Message color="red" message={error} /> : null}
          {!error && warning ? <Message color="orange" message={warning} /> : null}
          {!error && !warning && success ? <Message color="green" message={success} /> : null*/}
        </div>
      )
    }}
  </Field>
)

export default CustomText;
