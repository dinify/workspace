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
const initialHeight = window.innerHeight;

class LandingPage extends React.Component {
  state = {
    headerScrolled: false,
    parallaxContainerState: null,
    scroll: "inner"
  };
  rafPending = false;

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (!window.location.hash) this.parallaxContainer.scrollTop = 0;
    this.setState({ parallaxContainerState: this.parallaxContainer });
    this.parallaxContainer.addEventListener("scroll", this.onScroll);

    /* this.setState({ parallaxContainerState: document });
    if (document.clientHeight !== window.innerHeight) {
      this.setState({ scroll: "body" });
      document.addEventListener("scroll", this.onScroll);
      document.addEventListener("scroll", this.onBodyScroll);
    }
    else {
      document.addEventListener("scroll", this.onScroll);
      document.addEventListener("scroll", this.onBodyScroll);
    } */
  }
  componentWillUnmount() {
    this.parallaxContainer.removeEventListener("scroll", this.onScroll);
    // document.removeEventListener("scroll", this.onBodyScroll);
  }

  onBodyScroll = e => {
    const { scroll } = this.state;
    if (
      document.body.clientHeight <= window.innerHeight &&
      scroll !== "inner"
    ) {
      e.preventDefault();
      this.setState({ scroll: "inner" }, () => {
        console.log(this.parallaxContainer.scrollTop, document.body.scrollTop);
        // this.parallaxContainer.scrollTop = document.body.scrollTop;
        // document.body.scrollTop = 0;
        this.parallaxContainer.dispatchEvent(e);
        console.log(this.parallaxContainer.scrollTop, document.body.scrollTop);
      });
    } else if (
      document.body.clientHeight !== window.innerHeight &&
      scroll !== "body"
    ) {
      this.setState({ scroll: "body" });
    }
  }

  onScroll = e => {
    if(this.rafPending) {
      return;
    }

    this.rafPending = true;
    requestAnimationFrame(() => {
      if(!this.rafPending) {
        return;
      }
      this.onAnimFrame("self");
      this.rafPending = false;
    });
  }

  onAnimFrame = (type, param) => {
    let offset = this.parallaxContainer.scrollTop; // onScroll e.target
    if (type === "transform") {
      offset = offset + param;
      this.heroSection.style.transform = `translate3d(0, ${-param}px, -1px) scale(2)`;
      this.bottomSheet.style.transform = `translate3d(0, ${-param}px, 0)`;
    } else if (type === "scroll") {
      offset = param;
      this.heroSection.style.transform = `translate3d(0, 0, -1px) scale(2)`;
      this.bottomSheet.style.transform = "none";
      this.parallaxContainer.scrollTop = param;
    }

    const ratio = offset / window.innerHeight;
    const animOffset = 0.1 * window.innerHeight;

    const opacity = Math.max(0, Math.min(1, (1 - ratio) * 4 - 2));
    const position = ratio < 0.25 ? 0 : 4 * Math.pow(ratio - 0.25, 2);
    this.heroContainer.style.opacity = opacity;
    this.heroContainer.style.transform = `translate3d(0, -${position * animOffset}px, 0)`;
    if (
      opacity <= 0.12 &&
      this.heroContainer.style["pointer-events"] !== "none"
    ) {
      this.heroContainer.style["pointer-events"] = "none";
    }
    if (
      opacity > 0.12 &&
      this.heroContainer.style["pointer-events"] !== "auto"
    ) {
      this.heroContainer.style["pointer-events"] = "auto";
    }
    if (
      offset >= this.parallaxContainer.clientHeight - 56 - 24 &&
      this.state.headerScrolled !== true
    ) {
      this.setState({ headerScrolled: true });
    }

    if (
      offset < this.parallaxContainer.clientHeight - 56 - 24 &&
      this.state.headerScrolled !== false
    ) {
      this.setState({ headerScrolled: false });
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const { headerScrolled, parallaxContainerState, scroll } = this.state;
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
          scrollingElement={parallaxContainerState}
          onScrollFrame={this.onAnimFrame}
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
        className={classNames(scroll === "inner" ? classes.overflow : null)}
        style={{
          marginTop: -56
        }}
        >
          <div className={classNames(classes.perspective, classes.preserve)}>
            <div
              ref={node => { this.heroSection = node; }}
              className={classNames(
                classes.heroSection,
                classes.parallaxSpeed1,
                classes.stickyFixA,
                classes.stickyFixB
              )}
              style={{
                marginBottom: "-100vh",
                willChange: "transform"
              }}
            >
              <div
                className={classNames(classes.heroImg, classes.darkScrim)}
                alt="Restaurant atmoshpere"
                style={{
                  backgroundImage: `url("${require("assets/img/restaurantHero.jpg")}")`
                }}
              />
                <div
                  ref={node => {
                    this.heroContainer = node;
                  }}
                  className={classes.container}
                >
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
            <div
              ref={node => { this.bottomSheet = node; }}
              className={classNames(classes.main, classes.mainBottomSheet)}
              style={{
                marginTop: "calc(100vh - 24px)",
                borderRadius: headerScrolled ? 0 : 8,
                willChange: "transform"
              }}
            >
              <div
                className={classes.bottomSheetGrip}
                style={{ opacity: headerScrolled ? 0 : 1 }}
              />
              <SectionMultilingual />
              <SectionProduct />

              { /*
                TODO: uncomment this
                <SectionMailingList />
              */ }

              <SectionFAQ />
            </div>
            <Footer ref={node => { this.footer = node; }} style={{
              marginTop: "calc(100vh - 24px)",
              borderRadius: headerScrolled ? 0 : 8,
              willChange: "transform"
            }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
