import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// @material-ui/icons
import Camera from "@material-ui/icons/CameraAlt";
import ViewList from "@material-ui/icons/ViewList";

import Restaurant from "@material-ui/icons/Restaurant";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "./productStyle.jsx";
import featuresImage from "assets/img/features.jpg";

const features = [
  {
    image: "feature-browse",
    alt: "Browse feature on phone",
    title: "Browse menu items",
    details: "Make perfect choices with images, descriptions, list of ingredients and nutrition facts. Customize any dish to your liking."
  },
  {
    image: "feature-order",
    alt: "Order feature on phone",
    title: "Order with confidence",
    details: "It is as simple as tapping a button. No more waiting around for your server to take your orders. No need to try explaining your orders in an awkward foreign language."
  },
  {
    image: "feature-svc",
    alt: "Service call feature on phone",
    title: "Call for services",
    details: "Need an extra fork? In busy hours, it's a frustrating experience to pause your meal and try to get your server's attention. Select a service you need in the app to get it to your table right away."
  },
  {
    image: "feature-pay",
    alt: "Payment feature on phone",
    title: "Pay effortlessly",
    details: "When it comes to paying for your meal, your bill will be ready right within the app. After selecting one of the payment methods, your server right next to you will be ready to assist you with your payment."
  }
];

const carouselSpeed = 6000; // ms
const pauseSpeed = 8000; // ms

class SectionFeatures extends React.Component {
  state = {
    currentFeature: 0,
    currentTimeout: 0,
    playing: true
  };

  componentDidMount() {
    this.nextFeature = () => {
      let updated = this.state.currentFeature + 1;
      if (updated >= features.length) updated = 0;
      this.setState({ currentFeature: updated });
    };
    this.timeout = () => {
      this.nextFeature();
      if (this.state.playing) {
        const timeoutId = setTimeout(() => {
          this.timeout();
        }, carouselSpeed);
        this.setState({ currentTimeout: timeoutId });
      }
    };
    this.timeout();
  }

  handleOnChange = (e, i) => {
    const { currentTimeout } = this.state;
    clearTimeout(currentTimeout);
    this.setState({ playing: false, currentFeature: i });
    const timeoutId = setTimeout(() => {
      this.setState({ playing: true });
      this.timeout();
    }, pauseSpeed);
    this.setState({ currentTimeout: timeoutId });
  };

  render() {
    const { classes } = this.props;
    const { currentFeature } = this.state;
    return (
      <div
        className={classNames(classes.section, classes.themedBg)}
        style={{ marginTop: 24 }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={8}>
              <Typography variant="h5">
                Forget about awkward conversations
              </Typography>
              <Typography
                style={{ marginTop: 8, marginBottom: 16 }}
                variant="subtitle1"
              >
                Avoid having to talk to your server in a foreign language, and skip wait times in busy hours.
              </Typography>
            </GridItem>
          </GridContainer>
          <GridContainer justify="left">
            <GridItem xs={12} sm={6} md={6}>
              <img
                key={features[currentFeature].image}
                className={classes.featureImg}
                src={`https://storage.googleapis.com/static.dinify.app/landing/en/${features[currentFeature].image}.webp`}
                alt={features[currentFeature].alt}
              />
            </GridItem>
            <GridItem xs={12} sm={6} md={6} style={{ marginTop: 32 }}>

              {features.map((feature, i) => {
                const selected = currentFeature === i;
                return (
                  <ExpansionPanel
                    key={feature.id}
                    elevation={0}
                    style={{ background: "transparent" }}
                    expanded={selected}
                    onChange={e => {
                      this.handleOnChange(e, i);
                    }}
                  >
                    <ExpansionPanelSummary
                      style={{ padding: 0, margin: 0 }}
                      expandIcon={() => {}}
                    >
                      <Typography
                        style={{
                          padding: 0,
                          margin: 0,
                          borderLeft: selected ? "2px solid #c13939" : "2px solid transparent",
                          paddingLeft: 14
                        }}
                        variant="h6"
                        className={classes.heading}
                      >
                        {feature.title}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ padding: 0, margin: 0 }}>
                      <Typography
                        variant="subtitle2"
                        align="left"
                        style={{
                          padding: 0,
                          margin: 0,
                          paddingLeft: 16
                        }}
                      >
                        {feature.details}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionFeatures);
