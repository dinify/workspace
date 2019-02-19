import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Accordion from "components/Accordion/Accordion.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "./productStyle.jsx";

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.title}>
          <h2 className={classes.title}>FAQ</h2>
        </div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <Accordion
              active={0}
              collapses={[
                {
                  title: "Do I need to download an app?",
                  content: "No. Dinify is built as a Progressive Web App, meaning it runs in your web browser while still giving native app-like user experience.  When you add the app to your home screen, it’s exactly same as you have downloaded and installed a native app."
                },
                {
                  title: "How can I use the app?",
                  content: "Every table in our partnering venues has a unique QR code for you to scan and open the menu in the language set default in your smartphone.  If there is no matching language available, the menu will be in English."
                },
                {
                  title: "Do I need internet connection?",
                  content: "Yes, you do.  If you don’t have mobile data, simply scan the Wifi QR code on the table you’re seated to get the connection."
                },
                {
                  title: "What is mobile ordering?",
                  content: "Mobile ordering is exactly the same as how you order online for delivery, which we believe you’re already familiar with.  So, you can enjoy the contactless ordering even for dine-in for faster, simpler and better experience."
                },
                {
                  title: "How much does it cost for the service?",
                  content: "It won’t cost anything for only reading menus in your native language.  However, if you want to enjoy the maximal convenience and place order through Dinify app, there is a small transaction fee for 1% of your total ordered amount (€0.1 for €10 order).  You can purchase the credit in the app and the transaction fee will be subtracted from your balance upon placing an order."
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
