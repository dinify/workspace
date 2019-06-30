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

import productStyle from "styles/productStyle.jsx";


class SectionStatement extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div id="statement" className={classNames(classes.themedBg, classes.wrapper)}>
        <div className={classNames(classes.section, classes.container)}>
          <Typography variant="h6" align="center" style={{ width: "100%" }}>

          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionStatement);
