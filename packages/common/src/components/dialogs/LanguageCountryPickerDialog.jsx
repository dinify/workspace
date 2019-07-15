import React from 'react';
import * as R from 'ramda';
import { compose } from 'redux';
import { withStateHandlers } from 'recompose';
import { Motion, spring } from 'react-motion';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import match from 'autosuggest-highlight/umd/match';
import parse from 'autosuggest-highlight/umd/parse';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import ChevronLeft from '@material-ui/icons/ChevronLeftRounded';

import Flag from '../Flag';
import { languages as unLocalizedLanguages, countries } from '../../lib';

const styles = theme => ({
  scrollingList: {
    overflowY: 'scroll',
    paddingTop: 8,
    paddingBottom: 8
  }
})

const availableLocales = [
    "af",
    "af-NA",
    "am",
    "ar",
    "ar-AE",
    "ar-BH",
    "ar-DJ",
    "ar-DZ",
    "ar-EG",
    "ar-EH",
    "ar-ER",
    "ar-IL",
    "ar-IQ",
    "ar-JO",
    "ar-KM",
    "ar-KW",
    "ar-LB",
    "ar-LY",
    "ar-MA",
    "ar-MR",
    "ar-OM",
    "ar-PS",
    "ar-QA",
    "ar-SA",
    "ar-SD",
    "ar-SO",
    "ar-SS",
    "ar-SY",
    "ar-TD",
    "ar-TN",
    "ar-YE",
    "as",
    "az",
    "az-Latn",
    "be",
    "bg",
    "bn",
    "bn-IN",
    "bs",
    "bs-Latn",
    "ca",
    "ca-AD",
    "ca-ES-VALENCIA",
    "ca-FR",
    "ca-IT",
    "cs",
    "cy",
    "da",
    "da-GL",
    "de",
    "de-AT",
    "de-BE",
    "de-CH",
    "de-IT",
    "de-LI",
    "de-LU",
    "el",
    "el-CY",
    "en",
    "en-001",
    "en-150",
    "en-AG",
    "en-AI",
    "en-AS",
    "en-AT",
    "en-AU",
    "en-BB",
    "en-BE",
    "en-BI",
    "en-BM",
    "en-BS",
    "en-BW",
    "en-BZ",
    "en-CA",
    "en-CC",
    "en-CH",
    "en-CK",
    "en-CM",
    "en-CX",
    "en-CY",
    "en-DE",
    "en-DG",
    "en-DK",
    "en-DM",
    "en-ER",
    "en-FI",
    "en-FJ",
    "en-FK",
    "en-FM",
    "en-GB",
    "en-GD",
    "en-GG",
    "en-GH",
    "en-GI",
    "en-GM",
    "en-GU",
    "en-GY",
    "en-HK",
    "en-IE",
    "en-IL",
    "en-IM",
    "en-IN",
    "en-IO",
    "en-JE",
    "en-JM",
    "en-KE",
    "en-KI",
    "en-KN",
    "en-KY",
    "en-LC",
    "en-LR",
    "en-LS",
    "en-MG",
    "en-MH",
    "en-MO",
    "en-MP",
    "en-MS",
    "en-MT",
    "en-MU",
    "en-MW",
    "en-MY",
    "en-NA",
    "en-NF",
    "en-NG",
    "en-NL",
    "en-NR",
    "en-NU",
    "en-NZ",
    "en-PG",
    "en-PH",
    "en-PK",
    "en-PN",
    "en-PR",
    "en-PW",
    "en-RW",
    "en-SB",
    "en-SC",
    "en-SD",
    "en-SE",
    "en-SG",
    "en-SH",
    "en-SI",
    "en-SL",
    "en-SS",
    "en-SX",
    "en-SZ",
    "en-TC",
    "en-TK",
    "en-TO",
    "en-TT",
    "en-TV",
    "en-TZ",
    "en-UG",
    "en-UM",
    "en-US-POSIX",
    "en-VC",
    "en-VG",
    "en-VI",
    "en-VU",
    "en-WS",
    "en-ZA",
    "en-ZM",
    "en-ZW",
    "es",
    "es-419",
    "es-AR",
    "es-BO",
    "es-BR",
    "es-BZ",
    "es-CL",
    "es-CO",
    "es-CR",
    "es-CU",
    "es-DO",
    "es-EA",
    "es-EC",
    "es-GQ",
    "es-GT",
    "es-HN",
    "es-IC",
    "es-MX",
    "es-NI",
    "es-PA",
    "es-PE",
    "es-PH",
    "es-PR",
    "es-PY",
    "es-SV",
    "es-US",
    "es-UY",
    "es-VE",
    "et",
    "eu",
    "fa",
    "fa-AF",
    "fi",
    "fil",
    "fo",
    "fo-DK",
    "fr",
    "fr-BE",
    "fr-BF",
    "fr-BI",
    "fr-BJ",
    "fr-BL",
    "fr-CA",
    "fr-CD",
    "fr-CF",
    "fr-CG",
    "fr-CH",
    "fr-CI",
    "fr-CM",
    "fr-DJ",
    "fr-DZ",
    "fr-GA",
    "fr-GF",
    "fr-GN",
    "fr-GP",
    "fr-GQ",
    "fr-HT",
    "fr-KM",
    "fr-LU",
    "fr-MA",
    "fr-MC",
    "fr-MF",
    "fr-MG",
    "fr-ML",
    "fr-MQ",
    "fr-MR",
    "fr-MU",
    "fr-NC",
    "fr-NE",
    "fr-PF",
    "fr-PM",
    "fr-RE",
    "fr-RW",
    "fr-SC",
    "fr-SN",
    "fr-SY",
    "fr-TD",
    "fr-TG",
    "fr-TN",
    "fr-VU",
    "fr-WF",
    "fr-YT",
    "ga",
    "gl",
    "gu",
    "he",
    "hi",
    "hr",
    "hr-BA",
    "hu",
    "hy",
    "id",
    "is",
    "it",
    "it-CH",
    "it-SM",
    "it-VA",
    "ja",
    "ka",
    "kk",
    "km",
    "kn",
    "ko",
    "ko-KP",
    "ky",
    "lo",
    "lt",
    "lv",
    "mk",
    "ml",
    "mn",
    "mr",
    "ms",
    "ms-BN",
    "ms-SG",
    "my",
    "nb",
    "nb-SJ",
    "ne",
    "ne-IN",
    "nl",
    "nl-AW",
    "nl-BE",
    "nl-BQ",
    "nl-CW",
    "nl-SR",
    "nl-SX",
    "or",
    "pa",
    "pa-Guru",
    "pl",
    "ps",
    "pt",
    "pt-AO",
    "pt-CH",
    "pt-CV",
    "pt-GQ",
    "pt-GW",
    "pt-LU",
    "pt-MO",
    "pt-MZ",
    "pt-PT",
    "pt-ST",
    "pt-TL",
    "ro",
    "ro-MD",
    "root",
    "ru",
    "ru-BY",
    "ru-KG",
    "ru-KZ",
    "ru-MD",
    "ru-UA",
    "sd",
    "si",
    "sk",
    "sl",
    "sq",
    "sq-MK",
    "sq-XK",
    "sr",
    "sr-Cyrl",
    "sr-Cyrl-BA",
    "sr-Cyrl-ME",
    "sr-Cyrl-XK",
    "sr-Latn",
    "sr-Latn-BA",
    "sr-Latn-ME",
    "sr-Latn-XK",
    "sv",
    "sv-AX",
    "sv-FI",
    "sw",
    "sw-CD",
    "sw-KE",
    "sw-UG",
    "ta",
    "ta-LK",
    "ta-MY",
    "ta-SG",
    "te",
    "th",
    "tk",
    "tr",
    "tr-CY",
    "uk",
    "ur",
    "ur-IN",
    "uz",
    "uz-Latn",
    "vi",
    "yue",
    "yue-Hant",
    "zh",
    "zh-Hans",
    "zh-Hans-HK",
    "zh-Hans-MO",
    "zh-Hans-SG",
    "zh-Hant",
    "zh-Hant-HK",
    "zh-Hant-MO",
    "zu"
  ];

const LanguageCountryPickerDialog = (props) => {
  const {
    classes,
    filter,
    setFilter,
    selectedLang,
    setSelectedLang,
    page,
    prevPage,
    setPage,
    open = false,
    onClose,
    resetState,
    initialSelectedLanguage,
    ...other
  } = props;

  const { t, i18n } = useTranslation();

  const languages = unLocalizedLanguages.map(lang => {
    const nameEnglish = lang.name;
    const localizedName = i18n.format(lang.code, 'languageName');
    return {
      ...lang,
      nameEnglish,
      name: localizedName || nameEnglish
    }
  })

  const filtered = R.filter(lang => {
    if (!filter) return true;
    return match(lang.name, filter).length + match(lang.nameNative, filter).length > 0;
  }, languages);

  const languageClickHandler = lang => {
    const solo = lang.countries.length === 1;
    if (solo) setSelectedLang(lang.countries[0].langtag);
    else setPage(lang);
  };

  const countryClickHandler = country => {
    setSelectedLang(country.langtag);
  }

  const highlightBold = text => {
    if (!filter) return text;
    return <span>
      {parse(text, match(text, filter)).map((part, i) => {
        return part.highlight ? (<b key={i}>{part.text}</b>) : part.text;
      })}
    </span>;
  }

  const animConfig = { stiffness: 480, damping: 48 };

  const mainPage = (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{padding: '0px 24px'}}>
        <TextField
          fullWidth
          name={t('search')}
          label={t('search')}
          hint={t('search')}
          variant="filled"
          value={filter || ''}
          onChange={event => setFilter(event.target.value)}/>
      </div>
      <Divider style={{marginTop: 16}}/>
      <div className={classes.scrollingList} style={{flex: 1}}>
        {filtered.map((lang, i) => {
          const solo = lang.countries.length === 1;
          let primary = highlightBold(lang.nameNative);
          let secondary = highlightBold(lang.name);
          if (lang.name.toLowerCase() === lang.nameNative.toLowerCase()) {
            if (solo) secondary = (<i>{lang.countries[0].nameNative}</i>);
            else secondary = '';
          }

          let selected = false;
          if (selectedLang) selected = selectedLang.split('-')[0] === lang.code;
          return (
            <ListItem
              disabled={!availableLocales.includes(lang.code)}
              key={i} dense button selected={selected}
              style={{paddingLeft: 24, paddingRight: 24}}
              onClick={() => languageClickHandler(lang)}>
              <ListItemText primary={primary} secondary={secondary}/>
              {solo ? <Flag country={lang.countries[0].regionCode}/> : <ChevronRight style={{opacity: 0.54}}/>}
            </ListItem>
          );
        })}
      </div>
    </div>
  );
  let dialogContent;
  let currentPage = page || prevPage;
  if (currentPage) {
    dialogContent = (<div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div>
        <Button style={{margin: '0px 24px'}} onClick={() => setPage(null)}>
          <ChevronLeft />
          {t('back')}
        </Button>
      </div>
      <Divider style={{marginTop: 16}}/>
      <div className={classes.scrollingList} style={{flex: 1}}>
        {currentPage.countries.map((country, i) => {
          const name = i18n.format(country.regionCode, 'territoryName');
          let secondary;
          if (name !== country.nameNative) secondary = name;
          return (
            <ListItem key={i} dense button
              selected={country.langtag === selectedLang}
              style={{paddingLeft: 24, paddingRight: 24}}
              onClick={() => countryClickHandler(country)}>
              <ListItemText primary={country.nameNative} secondary={secondary}/>
              <Flag country={country.regionCode}/>
            </ListItem>
          );
        })}
      </div>
    </div>);
  }

  return (
    <Dialog open={open} onClose={() => {
      resetState();
      onClose(null);
    }} {...other}>
      <DialogTitle>
        {page ? t('selectCountry') : t('selectLanguage')}
      </DialogTitle>
      <div style={{
        height: 312,
        width: 240,
        overflow: 'hidden'
      }}>
        <Motion
          defaultStyle={{x: 0}}
          style={{x: spring(page ? 1 : 0, animConfig)}}>
          {style => {
            return (
              <div style={{
                height: '100%',
                display: 'flex',
                transform: `translate3d(${-240 * style.x}px, 0, 0)`
              }}>
                <div style={{minWidth: 240}}>
                  {mainPage}
                </div>
                <div style={{minWidth: 240}}>
                  {dialogContent}
                </div>
              </div>
            );
          }}
        </Motion>
      </div>
      <Divider />
      <DialogActions>
        <Button
          color="primary"
          disabled={!selectedLang}
          onClick={() => {
            resetState();
            onClose(selectedLang)
          }}>
          {t('select')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const enhance = compose(
  withStateHandlers(
    ({ initialSelectedLanguage }) => ({
      selectedLang: initialSelectedLanguage,
      page: null,
      prevPage: null,
      filter: ''
    }),
    {
      setFilter: () => (value) => ({
        filter: value,
      }),
      setPage: () => (value) => {
        if (value == null) return { page: value };
        else return { page: value, prevPage: value };
      },
      setSelectedLang: () => (value) => ({
        selectedLang: value,
      }),
      resetState: () => (value) => ({
        selectedLang: null,
        page: null,
        filter: ''
      })
    }
  ),
  withStyles(styles)
);

export default enhance(LanguageCountryPickerDialog);
