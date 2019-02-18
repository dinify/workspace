import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import Camera from "@material-ui/icons/CameraAlt";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import ViewList from "@material-ui/icons/ViewList";

import Restaurant from "@material-ui/icons/Restaurant";

import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.jsx";
import presentationiPhone from "assets/img/appscreen1.jpg";
import 'flag-icon-css/css/flag-icon.min.css';

const countryCodes = [
  "us",
  "es",
  "ru",
  "de",
  "pt",
  "no",
  "se",
  "fr",
  "nl",
  "it",
  "fi",
  "cz",
  "kr",
  "tw",
  "th",
  "cn",
  "tr",
  "gr",
  "jp",
  "id",
  "hu",
  "sa",
  "in",
  "ir",
  "vn",
  "lv",
  "et",
  "lt",
  "pl",
  "ua",
  "ml",
  "my",
  "is"
]

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2 className={classes.title}>So, we built multilingual menu</h2>
            <h5 className={classes.description}>
              in order for you to order in your language anywhere.
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem md={5} className={classes.mlAuto}>
            <div className={classes.imageContainer}>
              <img
                className={classes.iphoneImg}
                src={presentationiPhone}
                alt="iPad"
              />
            </div>
          </GridItem>
          <GridItem md={6}>
            <div className={classes.sectionDescription}>
              <div style={{width: '280px', margin: '20px auto', textAlign: 'left'}}>
                {countryCodes.map((code) =>
                  <span style={{width: '50px', height: '38px', marginLeft: '20px', marginBottom: '16px', borderRadius: '3px', filter: 'brightness(95%)'}} className={`flag-icon flag-icon-${code}`} />
                )}
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
