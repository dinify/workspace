import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import OpenInNew from "@material-ui/icons/OpenInNewRounded";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import SectionFAQ from "./Sections/SectionFAQ.jsx";
import restaurantsPageStyle from "./restaurantsPageStyle.jsx";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import queryString from "query-string";

class RestaurantsPage extends React.Component {
  render() {
    const { classes, t, location } = this.props;

    const parsed = queryString.parse(location.search);
    const email = parsed.email;

    const registrationURL = `https://dashboard.dinify.app/signup${location.search}`

    const menuItems = [
      {
        name: 'Test',
        anchor: 'test',
      }
    ];
    return (
      <div>
        <Header
          menuItems={menuItems}
          color="transparent"
        />
        <div className={classNames(classes.section, classes.container)}>
          <GridContainer>
            <GridItem style={{color: 'white'}}>
              <Typography variant="h4" color="inherit">
                {t('restaurantsPage.hero.title')}
              </Typography>
              <Typography variant="h6" style={{color: 'rgba(255, 255, 255, 0.76)', marginBottom: 16}}>
                {t('restaurantsPage.hero.subtitle')}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                style={{ height: 48, marginTop: 24 }}
                href={registrationURL}
                target="_blank"
                rel="noopener noreferrer"
                id="getStartedButton"
              >
                <OpenInNew style={{ marginRight: 8 }}/>
                {t('restaurantsPage.hero.cta')}
              </Button>
              {email && (
                <Typography variant="body2" style={{color: 'rgba(255, 255, 255, 0.76)', marginTop: 8}}>
                  {t('restaurantsPage.hero.continueWith', {email})}
                </Typography>
              )}
            </GridItem>
          </GridContainer>
        </div>
        <div className={classes.lightBg}>
          <SectionFAQ t={t}/>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const Wrapper = ({ ...rest }) => {
  const { t } = useTranslation();
  return <RestaurantsPage t={t} {...rest} />;
}

export default withStyles(restaurantsPageStyle)(Wrapper);
