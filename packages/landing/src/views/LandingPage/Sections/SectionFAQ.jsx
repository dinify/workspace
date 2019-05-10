import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Accordion from "components/Accordion/Accordion.jsx";
import classNames from "classnames";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "./productStyle.jsx";

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        id="faq"
        className={classNames(classes.section, classes.container)}
        style={{ textAlign: "left" }}
      >
        <Typography variant="h2" align="center" style={{width: '100%'}}>
          FAQ
        </Typography>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <Accordion
              active={0}
              collapses={[
                {
                  title: "Where can I download the app?",
                  content: "You don't have to download or install anything. Our app runs in your browser with a native user experience. You can add the app icon to your homescreen to use it offline."
                },
                {
                  title: "How do I get started?",
                  content: "Every table in our partnering venues has a unique QR code for you to scan and open the menu in the language set default in your account settings. The selected menu is always available in English, but some languages may not be."
                },
                {
                  title: "Do I need an internet connection?",
                  content: "Only if the app icon is not added to your homescreen. To get connected in case you don’t have mobile data, simply scan the WiFi QR code on the table you’re seated at."
                },
                {
                  title: "How do I scan the QR code?",
                  content: (
                    <span>
                      {
                        "On iOS, the camera app does it out of the box. On Android, the Google Lens app or any other scanner app will do. Or you can simply visit the "
                      }
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://m.dinify.app/checkin"
                      >
                        checkin page
                      </a>
                      {" to scan the code from your browser."}
                    </span>
                  )
                },
                {
                  title: "Why is this useful exactly?",
                  content: `The whole idea behind Dinify is that no one should have trouble exploring new food experiences
                  while they travel overseas simply because they cannot speak either the local language or English. You can
                  read and order from local restaurant menus in your preferred language anywhere in the world.
                  Enjoy a seamless dining experience without having to say a word in foreign languages.`
                },
                {
                  title: "Is this free?",
                  content: "Yes, everything is free while we are in beta. We are making sure everything fits together, and encourage you to experience the whole new way of dining in restaurants abroad."
                },
                {
                  title: "What locations are available?",
                  content: `We are a startup based in Prague, Czech Republic. We are currently only available in selected restaurants in Prague
                  but we are expanding fast. Please make sure to keep in touch with us for updates.`
                },

              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
