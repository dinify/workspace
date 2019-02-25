import React from "react";
// @material-ui/core components
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "./productStyle.jsx";
import presentationiPhone from "assets/img/appscreen1.jpg";
import "flag-icon-css/css/flag-icon.min.css";
import CountryLanguage from 'country-language';

import translations from './translations.json';

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
  borderRadius: '6px',
  border: selected ? '3px solid #777' : '3px solid white',
  cursor: 'pointer',
  filter: 'brightness(132%) saturate(60%) contrast(90%)'
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
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    const selected = countryCodes[selectedIndex];
    return (
      <div className={classNames(classes.section)} style={{paddingBottom: 0}}>
        <div className={classes.container}>

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
                alt="Multilingual menu"
              />
              <div className={classes.demoDescription}>
                {translations[selected] || descriptionEn}
              </div>
            </div>
          </GridItem>
          <GridItem md={6}>
            <div className={classes.sectionDescription}>
              <div style={{width: '345px', margin: '20px auto', textAlign: 'left'}}>
                {countryCodes.map((code, i) =>
                  <span
                    onClick={() => this.selectLanguage(i)}
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
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
