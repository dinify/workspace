import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import queryString from "query-string";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Explore from "@material-ui/icons/ExploreOutlined";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLink from "components/Header/HeaderLink.jsx";
import HeaderDivider from "components/Header/HeaderDivider.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { FooterView } from "views/FooterView";
import landingPageStyle from "./landingPageStyle.jsx";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
import Flag from "@dinify/common/dist/components/Flag";
// Sections for this page
// import SectionFeatures from "./Sections/SectionFeatures.jsx";
import SignInLink from "components/Links/SignInLink.jsx";
import SectionMultilingual from "./Sections/SectionMultilingual.jsx";
import SectionFAQ from "./Sections/SectionFAQ.jsx";
import SectionProduct from "./Sections/SectionProduct.jsx";
// import SectionMailingList from "./Sections/SectionMailingList.jsx";
import { useTranslation } from 'react-i18next';
import { ReportCampaignAction } from '@dinify/common/dist/api/restaurant';

class LandingPage extends React.Component {
  state = {
    headerScrolled: false,
    parallaxContainerState: null,
    scroll: "inner"
  };
  rafPending = false;

  componentDidMount() {
    //window.scrollTo(0, 0);
    //document.body.scrollTop = 0;
    window.addEventListener('scroll', this.handleScroll, true);
    const { location } = this.props;
    const parsed = queryString.parse(location.search);
    const token = parsed.t;
    if (token) {
      ReportCampaignAction({
        token,
        status: 'landed:landing'
      })
      .then(() => console.log('status updated'))
      .catch(() => console.log('status update failed'));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll = () => {
    if (!this.state.headerScrolled) {
      this.setState({ headerScrolled: true });
    }
  }

  render() {
    const { classes, t, location, ...rest } = this.props;
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
          color="transparent"
          changeColorOnScroll={{
            height: 100,
            color: "primary"
          }} {...rest}>
          <HeaderLink name={t('features')} anchor="features" />
          <HeaderLink name={t('sectionProduct.header')} anchor="howitworks" />
          <HeaderLink name="FAQ" anchor="faq" />
          <HeaderDivider />
          <SignInLink className={classes.headerListItem}/>
        </Header>
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
                  backgroundImage: `url("https://lh3.googleusercontent.com/Q-z3FZKwwlkjCCaeyROIxyRYkJDLkUhRPuFhGwS_hDijdqycFI49FcmcJ9Woke-HB_nKeLmH5onbyLqwRg=s0")`
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
                      {t('hero.header')}
                    </Typography>
                    <Typography
                      align="center"
                      color="inherit"
                      variant="subtitle1"
                      style={{ marginTop: 8 }}
                    >
                      {t('hero.subtitle')}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ height: 48, marginTop: 16 }}
                      href="https://web.dinify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="exploreButton"
                    >
                      <Explore style={{ marginRight: 8 }}/>
                      {t('hero.cta')}
                    </Button>
                    <Link
                      href="/restaurants?source=hero"
                      variant="caption"
                      style={{color: "rgba(255, 255, 255, 0.87)", marginTop: 8}}>
                      {t('hero.restaurants')}
                    </Link>
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
              <SectionMultilingual t={t} />
              <SectionProduct t={t} />
              {/*<SectionMailingList t={t} />*/}
              <SectionFAQ t={t} />
            </div>

            <FooterView />
          </div>
        </div>
      </div>
    );
  }
}

const Wrapper = ({ ...rest }) => {
  const { t } = useTranslation();
  return <LandingPage t={t} {...rest} />;
}

export default withStyles(landingPageStyle)(Wrapper);
