import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core mkit-components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core mkit-components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "./landingPageStyle.jsx";

// Sections for this page
import SectionProduct from "./Sections/SectionProduct.jsx";
import SectionMultilingual from "./Sections/SectionMultilingual.jsx";
import SectionFAQ from "./Sections/SectionFAQ.jsx";

import SectionWork from "./Sections/SectionWork.jsx";

import "assets/scss/material-kit-pro-react.css";


class LandingPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          brand="Dinify"
          subBrand="for restaurants"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          changeColorOnScroll={{
            height: 300,
            color: "primary"
          }}
          {...rest}
        />
        <Parallax image={require("assets/img/restaurantHero.jpg")} filter="dark">
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>Dining made seamless</h1>
                <h4>
                  We break barriers on your way to explore new cuisines.
                </h4>
                <br />
                <Button
                  color="primary"
                  style={{background: "linear-gradient(60deg, #c13939, #ff005e)"}}
                  size="lg"
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TRY IT OUT
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <SectionMultilingual />
            <SectionProduct />
            <SectionWork />
            <SectionFAQ />
          </div>
        </div>
        <Footer
          content={
            <div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a href="https://www.dinify.app">Dinify</a>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
