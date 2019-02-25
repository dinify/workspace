import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/workStyle.jsx";
import signupImage from "assets/img/signup.png";

class SectionWork extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
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

                  <CustomInput
                    labelText="Restaurant Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

                  <CustomInput
                    labelText="Country"
                    id="county"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

                  <CustomInput
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

                  <Button color="primary">Submit</Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(SectionWork);
