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

import productStyle from "./productStyle.jsx";
import featuresImage from "assets/img/features.jpg";

class SectionFeatures extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className={classNames(classes.section, classes.sectionDark)}
        style={{background: 'rgb(251,251,251)', paddingBottom: 0}}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={8}>
              <h2 className={classes.title}>and something beyond</h2>
              <h5 className={classes.description}>
                Self-order, service call, payment with clicks to avoid having to converse
                with your waiter in awkward foreign language as well as wait times in crowd.
              </h5>
            </GridItem>
          </GridContainer>
          <div>
            <GridContainer>
              <GridItem md={12} className={classes.mlAuto}>
                  <img
                    className={classes.featuresImg}
                    src={featuresImage}
                    alt="Features"
                  />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionFeatures);
