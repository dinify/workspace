import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Typography from "@material-ui/core/Typography";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import SectionFAQ from "./Sections/SectionFAQ.jsx";
import restaurantsPageStyle from "./restaurantsPageStyle.jsx";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

class RestaurantsPage extends React.Component {
  render() {
    const { classes, t } = this.props;

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
              <Typography variant="h4" color="inherit" style={{marginBottom: 8}}>
                {t('restaurantsPage.title')}
              </Typography>
              <Typography variant="h6" style={{color: 'rgba(255, 255, 255, 0.76)'}}>
                {t('restaurantsPage.subtitle')}
              </Typography>
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
