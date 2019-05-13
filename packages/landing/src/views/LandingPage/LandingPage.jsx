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
import SectionProduct from "./Sections/SectionProduct.jsx";
import SectionMailingList from "./Sections/SectionMailingList.jsx";

const headerToggleOffset = 100;

class LandingPage extends React.Component {
  state = {
    headerScrolled: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    this.parallaxContainer.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    this.parallaxContainer.removeEventListener("scroll", this.onScroll);
  }

  onScroll = (e) => {
    const newVal = e.target.scrollTop > headerToggleOffset;
    if (this.state.headerScrolled !== newVal)
      this.setState({ headerScrolled: newVal });
  }

  render() {
    const { classes, ...rest } = this.props;
    const { headerScrolled } = this.state;
    return (
      <div>
        <div style={{
            position: "fixed",
            top: "0px",
            width: "1px",
            height: "1px",
            zIndex: 1
          }}
        />
      <div>
        <Header
          scrolled={headerScrolled}
          color="transparent"
          brand={props => (
            <LogoText className={classes.contrastText} {...props} />
          )}
          changeColorOnScroll={{
            height: 100,
            color: "primary"
          }}
          {...rest}
        />
      </div>
      <div
        ref={node => {
          this.parallaxContainer = node;
        }}
        className={classNames(classes.perspective, classes.overflow)}
        style={{
          marginTop: -56
        }}>
        <div className={classNames(classes.perspective, classes.preserve)}>
        <div className={classNames(classes.heroSection, classes.parallaxSpeed1, classes.stickyFix)}>
          <div
            className={classNames(classes.heroImg, classes.darkScrim)}
            alt="Restaurant atmoshpere"
            style={{
              backgroundImage: `url("${require("assets/img/restaurantHero.jpg")}")`
            }}
          />
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
        </div>
        <div className={classNames(classes.main, classes.mainBottomSheet, classes.stickyFix)}>
          <div className={classes.bottomSheetGrip} />
          <SectionMultilingual />
          <SectionFeatures />
          <SectionProduct />
          <SectionMailingList />
          <SectionFAQ />
        </div>
        <Footer
          className={classes.stickyFix}
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
      </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
