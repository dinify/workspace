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

class SectionProduct extends React.Component {
  render() {
    const { classes, t } = this.props;
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
                  title: t('sectionFAQ.download.title'),
                  content: t('sectionFAQ.download.content')
                },
                {
                  title: t('sectionFAQ.started.title'),
                  content: t('sectionFAQ.started.content')
                },
                {
                  title: t('sectionFAQ.internet.title'),
                  content: t('sectionFAQ.internet.content')
                },
                {
                  title: t('sectionFAQ.scan.title'),
                  content: (
                    <span>
                      {t('sectionFAQ.scan.start')}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://web.dinify.app/checkin"
                      >
                        {t('sectionFAQ.scan.checkinPage')}
                      </a>
                      {t('sectionFAQ.scan.end')}
                    </span>
                  )
                },
                {
                  title: t('sectionFAQ.useful.title'),
                  content: t('sectionFAQ.useful.content')
                },
                {
                  title: t('sectionFAQ.free.title'),
                  content: t('sectionFAQ.free.content')
                },
                {
                  title: t('sectionFAQ.available.title'),
                  content: t('sectionFAQ.available.content')
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
