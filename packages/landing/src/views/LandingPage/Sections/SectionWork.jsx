import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Form, Text, Field, TextArea, Radio, RadioGroup, Select, Checkbox } from 'react-form';

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "./productStyle.jsx";
import signupImage from "assets/img/signup.png";

const CustomText = props => (
  <Field field={props.field}>
    { fieldApi => {
      const { onChange, onBlur, field, ...rest } = props
      const { value, error, warning, success, setValue, setTouched } = fieldApi
      return (
        <div>

          <CustomInput
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: e => {
                console.log('ssx')
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
              value: value || '',
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

const registerRedirect = (obj) => {
  const params = Object.keys(obj)
    .map(key => key + "=" + obj[key])
    .join("&");
  window.location.href = "https://dashboard.dinify.app/register?" + params;
}

class SectionWork extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem cs={12} sm={8} md={8}>
              <h2 className={classes.title}>Are you a restaurant?</h2>
              <h4 className={classes.description}>
                Show your interest by contacting us.
                We will help you understand the value propositions better.
              </h4>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <img
                      style={{width: "100%"}}
                      src={signupImage}
                      alt="Signup"
                    />                </GridItem>
                  <GridItem xs={12} sm={6} md={6}>

                    <Form onSubmit={submittedValues => registerRedirect(submittedValues)}>
                      {formApi => (
                        <form onSubmit={formApi.submitForm} id="form2">

                          <CustomText
                            labelText="Restaurant name"
                            field="restaurantName"
                            id="restaurantName"
                          />

                          <CustomText
                            labelText="Email address"
                            field="email"
                            id="email"
                          />

                          <Button type="submit" style={{float: 'right'}} color="primary">Register</Button>
                        </form>
                      )}
                    </Form>
                    
                  </GridItem>
                </GridContainer>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(workStyle)(SectionWork);
