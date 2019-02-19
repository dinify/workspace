import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// @material-ui/icons
import Camera from "@material-ui/icons/CameraAlt";
import ViewList from "@material-ui/icons/ViewList";

import Restaurant from "@material-ui/icons/Restaurant";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.jsx";

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.section, classes.sectionDark)}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2 className={classes.title}>It's easy as 1 2 3</h2>
            <h5 className={classes.description}>
              We simplified the process to its max for you. No installation. No registration.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Scan code"
                description="Instead of guessing what should you order from a menu you don't understand, just scan a code at the table to see menu in your native language."
                icon={Camera}
                iconColor="primary"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Browse menu"
                description="Don't ever get negatively suprprised by meal you'll get. With Dinify you can always see what you're ordering and you can even customize your dish to fit your dietary needs."
                icon={ViewList}
                iconColor="primary"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Enjoy your meal"
                description="After choosing your desired dish, just tap on 'Order' and your meal is on its way. Easy as that."
                icon={Restaurant}
                iconColor="primary"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
