import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "./productStyle.jsx";
import presentationiPhone from "assets/img/appscreen1.jpg";
import "flag-icon-css/css/flag-icon.min.css";
import CountryLanguage from 'country-language';

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
  "ir",
  "vn",
  "lv",
  "et",
  "lt",
  "pl",
  "ua",
  "ml",
  "my",
  "is"
]

const descriptionEn = "Rolled seasoned rice in thin sea sweed sheet with a variety of inserts - yellow radish, egg, cucumber, carrots, sesame oil and sesame seeds. There are three varieties depending on the main ingredients : beef, tuna or kimchi. 2 Rolls per order.";

const flagStyle = (selected) => ({
  width: '49px',
  height: '38px',
  marginLeft: '20px',
  marginBottom: '16px',
  borderRadius: '3px',
  border: selected ? '3px solid black' : '3px solid transparent',
  cursor: 'pointer',
  filter: 'brightness(95%)'
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

const getTranslation = async ({ text, to }) => {
  const response = await fetch(`${functionsEndpoint}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({from: 'en', to, text})
  });
  const body = await response.json();
  return body;
}

class SectionProduct extends React.Component {
  state = {
    selected: "us",
    translations: {}
  }
  selectLanguage = async code => {
    this.setState({ selected: code });
    if (!this.state.translations[code]) {
      const langCode = await getLangOfCountry(code);
      const translation = await getTranslation({ text: descriptionEn, to: langCode });
      let translations = this.state.translations;
      console.log(translation);
      translations[code] = translation ? translation.result : 'nope';
      console.log(translations);
      this.setState({ translations });
    }
  }
  render() {
    const { classes } = this.props;
    const { translations, selected } = this.state;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2 className={classes.title}>So, we built multilingual menu</h2>
            <h5 className={classes.description}>
              in order for you to order in your language anywhere.
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem md={5} className={classes.mlAuto}>
            <div className={classes.demoContainer}>
              <img
                className={classes.iphoneImg}
                src={presentationiPhone}
                alt="iPad"
              />
              <div className={classes.demoDescription}>
                {translations[selected] || descriptionEn}
              </div>
            </div>
          </GridItem>
          <GridItem md={6}>
            <div className={classes.sectionDescription}>
              <div style={{width: '280px', margin: '20px auto', textAlign: 'left'}}>
                {countryCodes.map((code) =>
                  <span
                    onClick={() => this.selectLanguage(code)}
                    key={code}
                    style={flagStyle(code === selected)}
                    className={`flag-icon flag-icon-${code}`}
                  />
                )}
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
