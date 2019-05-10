import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Form } from "react-form";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomText from "components/CustomText/CustomText.jsx";

import workStyle from "./productStyle.jsx";
import signupImage from "assets/img/signup.png";

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
      <div
        id="restaurants"
        className={[classes.wrapper, classes.themedBg].join(" ")}
      >
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem cs={12} sm={8} md={8}>
                <Typography variant="h4">Are you a restaurant?</Typography>
                <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                  Show your interest by contacting us.
                  We will help you understand the value propositions better.
                </Typography>
                <form>
                  <GridContainer style={{ marginTop: 16 }}>
                    <GridItem xs={12} sm={6} md={6}>
                      <img
                        style={{width: "100%"}}
                        src={signupImage}
                        alt="Signup"
                      />                </GridItem>
                    <GridItem style={{ marginTop: 16 }} xs={12} sm={6} md={6}>
                      <Form onSubmit={submittedValues => registerRedirect(submittedValues)}>
                        {formApi => (
                          <form onSubmit={formApi.submitForm} id="form2">

                            <CustomText
                              style={{ marginBottom: 8 }}
                              labelText="Restaurant name"
                              field="restaurantName"
                              id="restaurantName"
                            />

                            <CustomText
                              style={{ marginBottom: 8 }}
                              labelText="Email address"
                              field="email"
                              id="email"
                            />

                            <Button
                              type="submit"
                              variant="outlined"
                              style={{ float: "right", height: 40 }}
                              color="primary"
                            >
                              Next
                            </Button>
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
      </div>
    );
  }
}

export default withStyles(workStyle)(SectionWork);
