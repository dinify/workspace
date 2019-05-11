import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Favorite from "@material-ui/icons/FavoriteRounded";
import Explore from "@material-ui/icons/ExploreOutlined";

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
import SectionProduct from "./Sections/SectionProduct.jsx";
import SectionMailingList from "./Sections/SectionMailingList.jsx";

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
              <GridItem
                xs={12}
                sm={12}
                md={8}
                lg={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography variant="h4" color="inherit" align="center">
                  Order at restaurants in your own language, anywhere.
                </Typography>
                <Typography
                  align="center"
                  color="inherit"
                  variant="subtitle1"
                  style={{ marginTop: 8 }}
                >
                  Our mission is to connect travelers with local restaurants by breaking language barriers. No matter where you go or what language you speak, explore new food experiences and cuisines while on the move.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: 48, marginTop: 16 }}
                  href="https://m.dinify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Explore style={{ marginRight: 8 }}/>
                  Explore
                </Button>
              </GridItem>
              <GridItem style={{ flex: 1 }} className={classes.hideSmall}>
                <img
                  alt="Girl standing in front of languages"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
                  style={{
                    height: 400,
                    border: "none",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundImage: `url("https://storage.googleapis.com/static.dinify.app/landing/girl-languages.svg")`
                  }}
                />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainBottomSheet)}>
          <div className={classes.bottomSheetGrip} />
          <SectionMultilingual />
          <SectionFeatures />
          <SectionProduct />
          <SectionMailingList />
          <SectionFAQ />
          <SectionWork />
        </div>
        <Footer
          content={
            <div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite style={{ fontSize: 12 }} /> by{" "}
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
