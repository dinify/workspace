import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Parallax from "components/Parallax/Parallax.jsx";
import landingPageStyle from "./landingPageStyle.jsx";
import LogoText from "@dinify/common/dist/icons/LogoText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Sections for this page
import SectionFeatures from "./Sections/SectionFeatures.jsx";
import SectionMultilingual from "./Sections/SectionMultilingual.jsx";
import SectionFAQ from "./Sections/SectionFAQ.jsx";
import SectionWork from "./Sections/SectionWork.jsx";

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
          brand={props => (
            <LogoText className={classes.contrastText} {...props} />
          )}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "primary"
          }}
          {...rest}
        />
        <Parallax
          image={require("assets/img/restaurantHero.jpg")}
          filter="dark"
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <Typography variant="h4" style={{ color: "inherit" }}>
                  Order at restaurants in your own language, anywhere.
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ color: "inherit", marginTop: 8 }}
                >
                  We break barriers on your way to explore new cuisines. No matter where you go or what language you speak, you will never stop exploring new food experiences only because you don't speak a foreign language while traveling.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: 40, marginTop: 16 }}
                  href="https://m.dinify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Experience
                </Button>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <img src="https://storage.googleapis.com/static.dinify.app/landing/girl-languages.svg"/>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionMultilingual />
          <SectionFeatures />
          <SectionWork />
          <SectionFAQ />
        </div>
        <Footer
          content={
            <div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a href="https://www.dinify.app/s">Dinify</a>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
