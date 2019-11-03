import React from 'react';
import { createSelector } from 'reselect'
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import { MapToList, ListToMap } from  '@dinify/common/src/lib/FN';
import { connect } from 'react-redux';
import mergeAll from 'ramda/es/mergeAll';
import merge from 'ramda/es/merge';
import groupBy from 'ramda/es/groupBy';
import mapObjIndexed from 'ramda/es/mapObjIndexed';

import { languageCountries as languagesArray } from '@dinify/common/src/lib'
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import ArrowForward from '@material-ui/icons/KeyboardArrowRight';

import Avatar from '@material-ui/core/Avatar';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Divider from '@material-ui/core/Divider';
import {
  addLanguage,
  selectLocale,
  pushTranslation,
  selectLanguage,
  confirmPreferredLanguages,
  translateAll
} from 'ducks/translation/actions';
import { switchTranslationsTab as switchTab } from 'ducks/ui/actions';
import { withStateHandlers } from 'recompose';
import diff from 'object-diff'
import types from './types';
import Editor from './Editor';

const PRE = 'PRE';
const OTHER = 'OTHER';

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

const brackets = (str) => `(${str})`;

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
  translations: {
    byType,
    defaultByType
  },
  classes,
  addLanguage,
  selectLocale,
  selectedLocale,
  pushTranslation,
  supportedLanguages,
  menuLanguages,
  tabIndex,
  switchTab,
  preferredLanguages,
  languagesSetupShown,
  toggleLanguagesSetup,
  selectLanguage,
  preSelectedLanguages,
  confirmPreferredLanguages,
  translateAll,
  defaultLanguage
}) => {
  const { t } = useTranslation();
  let menuLanguagesList = menuLanguages.map((l) => l.language);
  const autocompleteData = supportedLanguages
  .map(o => {
    const l = languages[o];
    if (!l) return {};
    return {
      value: o,
      langEn: l.langEn,
      langLoc: l.langLoc,
      label: `${l.langEn} ${l.langLoc !== l.langEn ? brackets(l.langLoc) : ''}`
    }
  })
  .filter((o) => o.value && !menuLanguagesList.includes(o.value))
  .sort((a, b) => a.label.localeCompare(b.label));

  menuLanguagesList = menuLanguagesList
    .filter((l) => l !== defaultLanguage)
    .sort((a, b) => a.localeCompare(b));

  if (menuLanguagesList.length < 1) {
    let selectFrom = autocompleteData.map((o) => ({...o, preferred: preferredLanguages.includes(o.value) }));
    selectFrom = groupBy((o) => preSelectedLanguages.includes(o.value) ? PRE : OTHER)(selectFrom);
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{margin: '20px 0'}}>
          <Typography variant="h5" gutterBottom>
            Select languages you want to support
          </Typography>
          <Typography variant="caption">
            We pre-selected some languages for you based on tourists statistics. You can keep them or select more.
          </Typography>
        </div>
        <Collapse in={languagesSetupShown} collapsedHeight={122}>
          {selectFrom[PRE] && selectFrom[PRE].map((o) =>
            <Chip
              key={o.value}
              className={classes.chip}
              avatar={<Avatar>{o.value.substring(0,2).toUpperCase()}</Avatar>}
              label={o.langEn}
              onClick={() => selectLanguage({ language: o.value })}
              color={o.preferred ? 'primary' : 'default'}
            />
          )}
          {selectFrom[OTHER] && selectFrom[OTHER].map((o) =>
            <Chip
              key={o.value}
              className={classes.chip}
              avatar={<Avatar>{o.value.substring(0,2).toUpperCase()}</Avatar>}
              label={o.langEn}
              onClick={() => selectLanguage({ language: o.value })}
              color={o.preferred ? 'primary' : 'default'}
            />
          )}
        </Collapse>
        {!languagesSetupShown && <Button onClick={() => toggleLanguagesSetup(languagesSetupShown)} fullWidth>
          Show more <ExpandMore />
        </Button>}
        <Button
          color="primary"
          variant="contained"
          onClick={() => confirmPreferredLanguages()}
          style={{margin: '16px 0'}}
          size="large"
        >
          Continue
        </Button>
      </div>
    )
  }

  return (
    <Paper style={{borderRadius: '2px', margin: '14px 10px'}}>
      <CardContent>
          <div style={{textAlign: 'right'}}>
            <Button variant="contained" color="primary" onClick={() => translateAll()}>Translate all</Button>
          </div>
          <Typography color="textSecondary" gutterBottom>
            {t('selectLanguage')}
          </Typography>
          <div>
            {menuLanguagesList.map((l) => 
              <Chip
                key={l}
                className={classes.chip}
                avatar={<Avatar>{l.substring(0,2).toUpperCase()}</Avatar>}
                label={languages[l] && languages[l].langEn}
                onClick={() => selectLocale({ selectedLocale: l })}
                color={selectedLocale === l ? 'primary' : 'default'}
              />
            )}
          </div>
          <Divider style={{marginBottom: '10px'}} />

          {/*
              <Typography color="textSecondary" gutterBottom>
                {t('addLanguage')}
              </Typography>
              <div style={{maxWidth: '300px'}} className={classes.chip}>
                <AutoComplete
                  dataSource={autocompleteData}
                  placeholder={t('selectLanguagePlaceholder')}
                  outlined
                  onChange={l =>
                    l && addLanguage({language: l.value})
                  }
                />
              </div>
            
            <Divider style={{marginBottom: '10px'}} />
            */}
      </CardContent>

      {defaultLanguage !== selectedLocale ?
        <div>
          <Tabs
            value={tabIndex}
            onChange={(e, i) => switchTab(i)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {types.map((type) =>
              <Tab key={type.name} label={`${t(tNameToi18Key(type.name))} ${ getCoverage(byType[type.type],defaultByType[type.type])}`} />
            )}
          </Tabs>
          {types.map((type, i) => {
            const translationsMap = ListToMap(byType[type.type] || []);
            const initialValues = makeInitalValues(translationsMap);
            return (tabIndex === i &&
                <Editor
                  t={t}
                  key={`${selectedLocale}-${type.type}`}
                  originalsList={defaultByType[type.type] || []}
                  initialValues={initialValues}
                  onSubmit={(submitValues, dispatch, props) => {
                    const { initialValues } = props
                    const changedValues = diff(initialValues, submitValues)
                    pushTranslation({
                      changes: changedValues,
                      locale: selectedLocale,
                      type: type.type,
                    });
                  }}
                  type={type.type}
                  selectedLocale={selectedLocale}
                  defaultLocale={defaultLanguage}
                  languageName={languages[selectedLocale] && languages[selectedLocale].langLoc}
                />
              )
          })}
        </div>
      :
      <div style={{padding: '20px 0 40px 0', textAlign: 'center'}}>
        <Typography component="h3" variant="display1" gutterBottom>
          {languages[selectedLocale].langLoc} is your default language
        </Typography>
        <Typography variant="caption">
          Select any other language
        </Typography>
      </div>
    }
    </Paper>
  );
}

const translationsSelector = createSelector(
  [
    (state) => state.translation.all,
    (state) => state.translation.selectedLocale,
    (state) => state.restaurant.defaultLanguage
  ],
  (translations, selectedLocale, defaultLanguage) => {
    const locales = Object.keys(translations).filter((l) => l !== defaultLanguage);

    const ofLocale = MapToList(translations[selectedLocale]);
    const ofDefaultLanguage = MapToList(translations[defaultLanguage]);

    const byType = groupBy((o) => o.type)(ofLocale);
    const defaultByType = groupBy((o) => o.type)(ofDefaultLanguage);
    return {
      locales,
      ofLocale,
      ofDefaultLanguage,
      byType,
      defaultByType
    }
  }
)

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
      translations: translationsSelector(state),
      selectedLocale: state.translation.selectedLocale,
      supportedLanguages: state.restaurant.languages,
      menuLanguages: state.restaurant.menuLanguages,
      tabIndex: state.ui.translationsTabIndex,
      preferredLanguages: state.restaurant.preferredLanguages,
      preSelectedLanguages: state.restaurant.preferredLanguagesInitial,
      defaultLanguage: state.restaurant.defaultLanguage
    }),
    {
      addLanguage,
      selectLocale,
      pushTranslation,
      switchTab,
      selectLanguage,
      confirmPreferredLanguages,
      translateAll
    }
  )
);

export default enhance(Translations);
