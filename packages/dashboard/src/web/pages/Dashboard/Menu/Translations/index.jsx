import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import { ListToMap, MapToList } from  '@dinify/common/src/lib/FN';
import { connect } from 'react-redux';
import mergeAll from 'ramda/es/mergeAll';
import merge from 'ramda/es/merge';
import mapObjIndexed from 'ramda/es/mapObjIndexed';

import { languageCountries as languagesArray } from '@dinify/common/src/lib'
import Typography from '@material-ui/core/Typography';
// import ArrowForward from '@material-ui/icons/KeyboardArrowRight';
import { getDefaultLanguage } from 'features/restaurant/selectors';

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {
  addLanguage,
  selectLanguage,
  confirmPreferredLanguages,
  translateAll
} from 'features/translation/actions';
import { withStateHandlers } from 'recompose';
import diff from 'object-diff'
import types from './types';
import Editor from './Editor';

const languages = mergeAll(
  languagesArray.map((el) => {
    const key = el.code;
    return {[key]: {
      code: el.code,
      langEn: el.name,
      langLoc: el.nameNative,
      locales: el.countries
    }
  }})
);

// const brackets = (str) => `(${str})`;

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

const makeInitalValues = (translationsMap) => {
  const names = mapObjIndexed((t) => t.name, translationsMap);
  const descriptions = {};
  mapObjIndexed((t) => {
    if (t.description) descriptions[`${t.id}_description`] = t.description;
    return t.id;
  }, translationsMap);
  return merge(names, descriptions);
}

const getCoverage = (t, o) => {
  const oCount = o ? o.length : 0;
  const tCount = t ? t.length : 0;
  if (!oCount) return '';
  return `(${tCount}/${oCount})`;
}

const tNameToi18Key = (str) => {
  let name = str.toLowerCase();
  if (name === 'options') name = 'optionGroups';
  if (name === 'menu items') name = 'dishes';

  if (name === 'services') name = 'nav.services';
  else {
    name = `menu.${name}`;
  }
  return name;
}

const Translations = ({
  trans: {
    translations
  },
  classes,
  selectLang,
  selectedLang,
  pushTranslations,
  activeTab,
  switchTab,
  defaultLanguage,
  fetchTranslations,
  langs
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    fetchTranslations();
  }, []);

  return (
    <Paper style={{borderRadius: '2px', margin: '14px 10px'}}>
      <CardContent>
          {/*
            <div style={{textAlign: 'right'}}>
            <Button variant="contained" color="primary" onClick={() => translateAll()}>Translate all</Button>
            </div>
            */}
          <Typography color="textSecondary" gutterBottom>
            {t('selectLanguage')}
          </Typography>
          <div>
            {langs.map((l) => 
              <Chip
                key={l}
                className={classes.chip}
                avatar={<Avatar>{l.substring(0,2).toUpperCase()}</Avatar>}
                label={languages[l] && languages[l].langEn}
                onClick={() => selectLang(l)}
                color={selectedLang === l ? 'primary' : 'default'}
              />
            )}
          </div>
          <Divider style={{marginBottom: '10px'}} />
      </CardContent>

      {defaultLanguage !== selectedLang && translations[selectedLang] ?
        <div>
          <Tabs
            value={activeTab}
            onChange={(e, i) => switchTab(i)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {types.map((type) =>
              <Tab
                key={type.name}
                label={`${t(tNameToi18Key(type.name))}`}
              />
            )}
          </Tabs>
          {types.map((type, i) => {
            const translationsMap = ListToMap(translations[selectedLang][type.type] || []);
            const initialValues = makeInitalValues(translationsMap);
            return (activeTab === i &&
                <Editor
                  t={t}
                  key={`${selectedLang}-${type.type}`}
                  originalsList={translations[defaultLanguage][type.type] || []}
                  initialValues={initialValues}
                  onSubmit={(submitValues, dispatch, props) => {
                    const { initialValues } = props;
                    const changedValues = diff(initialValues, submitValues);
                    pushTranslations({
                      changes: changedValues,
                      locale: selectedLang,
                      type: type.type,
                    });
                  }}
                  type={type.type}
                  selectedLocale={selectedLang}
                  defaultLocale={defaultLanguage}
                  languageName={languages[selectedLang] && languages[selectedLang].langLoc}
                />
              )
          })}
        </div>
      :
      <div style={{padding: '20px 0 40px 0', textAlign: 'center'}}>
        <Typography component="h3" variant="display1" gutterBottom>
          {languages[selectedLang].langLoc} is your default language
        </Typography>
        <Typography variant="caption">
          Select any other language
        </Typography>
      </div>
    }
    </Paper>
  );
}

const enhance = compose(
  withStyles(styles),
  withStateHandlers(
    () => ({
      languagesSetupShown: false
    }),
    {
      toggleLanguagesSetup: () => (languagesSetupShown) => ({
        languagesSetupShown: !languagesSetupShown
      }),
    }
  ),
  connect(
    state => ({
      menuLanguages: state.restaurant.menuLanguages,
      preferredLanguages: state.restaurant.preferredLanguages,
      preSelectedLanguages: state.restaurant.preferredLanguagesInitial,
      defaultLanguage: getDefaultLanguage(state),
      langs: state.trans.langs,
      selectedLang: state.trans.selectedLang,
      activeTab: state.trans.activeTab,
      trans: state.trans
    }),
    ({ trans: { fetchTranslations, selectLang, switchTab, pushTranslations } }) => ({
      addLanguage,
      selectLang,
      pushTranslations,
      switchTab,
      selectLanguage,
      confirmPreferredLanguages,
      translateAll,
      fetchTranslations
    })
  )
);

export default enhance(Translations);
