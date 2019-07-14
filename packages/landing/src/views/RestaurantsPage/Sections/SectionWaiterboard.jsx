import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Typography from "@material-ui/core/Typography";

import productStyle from "styles/productStyle.jsx";

const SectionWaiterboard = ({t, classes, ...otherProps}) => {
  const key = 'restaurantsPage.sections.waiterboard';
  const features = [
    {
      title: t(`${key}.order.title`),
      description: t(`${key}.order.description`),
      image: 'https://storage.googleapis.com/static.dinify.app/landing/waiterboard-order.png',
      alt: t(`${key}.order.alt`)
    },
    {
      title: t(`${key}.service.title`),
      description: t(`${key}.service.description`),
      image: 'https://storage.googleapis.com/static.dinify.app/landing/waiterboard-service.png',
      alt: t(`${key}.service.alt`)
    },
    {
      title: t(`${key}.pay.title`),
      description: t(`${key}.pay.description`),
      image: 'https://storage.googleapis.com/static.dinify.app/landing/waiterboard-pay.png',
      alt: t(`${key}.pay.alt`)
    }
  ];
  return (
    <div
      id="waiterboard"
      className={classNames(classes.section, classes.container)}
      style={{ textAlign: "left" }}
      {...otherProps}>
      <div style={{ textAlign: "center", marginBottom: 24}}>
        <Typography variant="h3">{t(`${key}.title`)}</Typography>
        <Typography variant="subtitle1">{t(`${key}.subtitle`)}</Typography>
      </div>
      <GridContainer spacing={24}>
        {features.map(feature => (
          <GridItem xs={12} sm={12} md={12} lg={4}>
            <img style={{
              width: '100%',
              marginBottom: 16
            }} src={feature.image} alt={feature.alt}/>
            <Typography variant="h5" style={{marginBottom: 8}}>{feature.title}</Typography>
            <Typography variant="body2">{feature.description}</Typography>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
};

export default withStyles(productStyle)(SectionWaiterboard);
