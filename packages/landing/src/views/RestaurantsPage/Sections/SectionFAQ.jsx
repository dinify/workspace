import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Accordion from "components/Accordion/Accordion.jsx";
import classNames from "classnames";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "styles/productStyle.jsx";

class SectionFAQ extends React.Component {
  render() {
    const { classes, t } = this.props;

    const tKey = 'restaurantsPage.sections.faq';
    return (
      <div
        id="faq"
        className={classNames(classes.section, classes.container)}
        style={{ textAlign: "left" }}
      >
        <Typography variant="h2" align="center" style={{width: '100%'}}>
          {t('restaurantsPage.sections.faq.title')}
        </Typography>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <Accordion
              active={0}
              collapses={['business', 'translation', 'correct', 'devices', 'training', 'trial', 'modify'].map(key => ({
                title: t(`${tKey}.${key}.title`),
                content: t(`${tKey}.${key}.content`)
              }))}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionFAQ);
