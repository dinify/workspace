import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "./productStyle.jsx";
import signupImage from "assets/img/signup.png";

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

                    <CustomInput
                      labelText="Restaurant Name"
                      id="name"
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

                    <Button style={{float: 'left'}}>Request demo</Button>

                    <div style={{display: 'inline-block', margin: '10px 0'}}>- or -</div>

                    <a href="https://dashboard.dinify.app/register">
                      <Button style={{float: 'right'}} color="primary">Register</Button>
                    </a>
                    
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
