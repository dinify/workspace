import React from "react";
// @material-ui/core components
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PhoneRestaurantMenu from "../Components/PhoneRestaurantMenu.jsx";

import productStyle from "./productStyle.jsx";
import presentationiPhone from "assets/img/appscreen1.jpg";
import "flag-icon-css/css/flag-icon.min.css";
import CountryLanguage from 'country-language';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Flag from "@dinify/common/dist/components/Flag";

const countryCodes = [
  "us",
  "es",
  "ru",
  "de",
  "pt",
  "no",
  "se",
  "fr",
  "nl",
  "it",
  "gb",
  "fi",
  "cz",
  "kr",
  "tw",
  "th",
  "cn",
  "tr",
  "gr",
  "jp",
  "id",
  "hu",
  "sa",
  "in",
  "ca",
  "ir",
  "vn",
  "lv",
  "et",
  "lt",
  "pl",
  "co",
  "ua",
  "ml",
  "my",
  "is"
];

const flagStyle = (selected) => ({
  cursor: 'pointer'
})

const functionsEndpoint = 'https://us-central1-tabb-global.cloudfunctions.net';

const getLangOfCountry = country => {
  console.log(country);
  return new Promise((resolve) => {
    CountryLanguage.getCountryLanguages(country, (err, langs) => {
      console.log(langs);
      resolve(langs[0].iso639_1);
    })
  })
}

// const getTranslation = async ({ text, to }) => {
//   const response = await fetch(`${functionsEndpoint}/translate`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({from: 'en', to, text})
//   });
//   const body = await response.json();
//   return body;
// }

class SectionProduct extends React.Component {
  state = {
    selectedIndex: 0,
    //translations: {}
  }
  componentDidMount() {
    const intervalTrigger = () => {
      return setInterval(() => {
        if (this.state.selectedIndex+1 >= countryCodes.length) {
          this.setState({selectedIndex: 0})
        } else {
          this.setState({selectedIndex: this.state.selectedIndex+1})
        }
      }, 1000);
    }
    window.dnfTranslationsIntervalId = intervalTrigger();
  }
  selectLanguage = index => {
    clearInterval(window.dnfTranslationsIntervalId)
    this.setState({ selectedIndex: index });
    // if (!this.state.translations[code]) {
    //   const langCode = await getLangOfCountry(code);
    //   const translation = await getTranslation({ text: descriptionEn, to: langCode });
    //   let translations = this.state.translations;
    //   console.log(translation);
    //   translations[code] = translation ? translation.result : 'nope';
    //   console.log(JSON.stringify(translations));
    //   this.setState({ translations });
    // }
  }
  render() {
    const { classes, width } = this.props;
    const { selectedIndex } = this.state;

    const selected = countryCodes[selectedIndex];
    const isLarge = isWidthUp("lg", width);
    const clipped = isLarge
      ? countryCodes.filter((code, i) => i < countryCodes.length - 1)
      : countryCodes;
    return (
      <div
        id="features"
        className={classNames(classes.section, classes.themedBg)}
        style={{ paddingBottom: 0 }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={8}>
              <Typography variant="h4">Digital menu in 77 languages</Typography>
              <Typography
                variant="subtitle1"
                style={{ marginTop: 8, marginBottom: 24 }}
              >
                We strive to support as many languages as we can, so everybody
                can have a seamless culinary experience. Understand how much you
                spend by showing prices in your local currency, along with the
                original.
              </Typography>
            </GridItem>
          </GridContainer>
        <GridContainer>
          <GridItem md={6} style={{ alignSelf: "center" }}>
            <Grid container spacing={16} justify="center">
              {clipped.map((code, i) => (
                <Grid item key={code}>
                  <IconButton
                    key={code}
                      onClick={() => this.selectLanguage(i)}
                      className={
                      classes.flag +
                      " " +
                        (code === selected ? classes.flagSelected : "")
                      }
                    >
                    <Flag country={code.toUpperCase()} />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Typography
              style={{ marginTop: 16, marginBottom: 16 }}
              variant="caption"
              color="textSecondary"
            >
              <i>Note:</i> Not all languages are listed here.
              <a href="#" style={{ marginLeft: 8 }}>
                Learn More
              </a>
            </Typography>
          </GridItem>
          <GridItem md={5} className={classes.mlAuto}>
            <PhoneRestaurantMenu selected={selected} />
          </GridItem>
        </GridContainer>
      </div>
      </div>
    );
  }
}

export default withWidth()(withStyles(productStyle)(SectionProduct));
