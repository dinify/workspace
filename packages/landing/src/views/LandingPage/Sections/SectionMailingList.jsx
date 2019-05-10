import React from "react";
// @material-ui/core components
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForwardRounded";
import classNames from "classnames";
import { Form } from "react-form";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomText from "components/CustomText/CustomText.jsx";

import getTheme from "@dinify/common/dist/theme";
import productStyle from "./productStyle.jsx";

const darkTheme = getTheme({ type: "dark" });

class SectionMailingList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.themedBg)}>
        <div
          className={classNames(classes.section, classes.container)}
          style={{ maxWidth: 640 }}
        >
          <Typography variant="h3" align="center" style={{ width: "100%" }}>
            Stay up to date
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ width: "100%", marginTop: 8 }}
          >
            Hey travelers, please make sure to keep in touch with us for updates.
            Don't miss out on anything by entering your email below to get notified of important news.
          </Typography>
          <Form
            onSubmit={submittedValues => {
              console.log(submittedValues);
            }}
          >
            {formApi => (
              <form onSubmit={formApi.submitForm} id="form1">
                <div
                  style={{
                    display: "flex",
                    marginTop: 16,
                    justifyContent: "center"
                  }}
                >
                  <CustomText
                    style={{ minWidth: 320 }}
                    labelText="Email address"
                    field="email"
                    id="email"
                  />

                  <IconButton
                    type="submit"
                    style={{ marginLeft: 32, width: 56, height: 56 }}
                    className={classes.outlinedIconButton}
                  >
                    <ArrowForward />
                  </IconButton>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

const WithStyles = withStyles(productStyle)(SectionMailingList);

const WrappedSection = () => (
  <MuiThemeProvider theme={darkTheme}>
    <WithStyles />
  </MuiThemeProvider>
);

export default WrappedSection;
