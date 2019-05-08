// @flow
import React from 'react';
import { createSelector } from 'reselect'
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import { MapToList, ListToMap } from 'lib/FN';
import { connect } from 'react-redux';
import * as R from 'ramda';
import types from './types';
import Editor from './Editor';
import languagesArray from '@dinify/common/dist/lib/languages.json'
import Typography from '@dinify/common/dist/components/Typography';

import Avatar from '@material-ui/core/Avatar';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Divider from '@material-ui/core/Divider';
import { addLanguage, selectLocale, pushTranslation,  } from 'ducks/translation/actions';
import { switchTranslationsTab as switchTab } from 'ducks/ui/actions';

import diff from 'object-diff'

const languages = R.mergeAll(
  languagesArray.map((el) => {
    let key = el[0];
    return {[key]: {
      code: el[0],
      langEn: el[1],
      langLoc: el[2],
      locales: el[3]
    }
  }})
);

const brackets = (str) => `(${str})`

const SolidContainer = styled.div`
  min-width: 800px;
  padding-bottom: 50px;
`;

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

const defaultLocale = 'en';

const makeInitalValues = (translationsMap) => {
  const names = R.mapObjIndexed((t) => t.name, translationsMap);
  const descriptions = {};
  R.mapObjIndexed((t) => {
    if (t.description) descriptions[t.id+'_description'] = t.description;
    return t.id;
  }, translationsMap);
  return R.merge(names, descriptions);
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
  }, classes, addLanguage, selectLocale, selectedLocale, pushTranslation, supportedLanguages, menuLanguages,
  tabIndex,
  switchTab
}) => {
  const defaultLanguage = 'en';
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
  .sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });

  menuLanguagesList = menuLanguagesList.filter((l) => l !== defaultLanguage);

  return (
    <SolidContainer>

      <Paper style={{borderRadius: '2px', margin: '14px 10px'}}>
        <CardContent>

            <Typography color="textSecondary" gutterBottom>
              {t('selectLanguage')}
            </Typography>
            <div>
              {menuLanguagesList.map((l) =>
                <Chip
                  key={l}
                  className={classes.chip}
                  avatar={<Avatar>{l.toUpperCase()}</Avatar>}
                  label={languages[l.toLowerCase()] && languages[l.toLowerCase()].langEn}
                  onClick={() => selectLocale({ selectedLocale: l })}
                  color={selectedLocale === l ? 'primary' : 'default'}
                />
              )}
            </div>
            <Divider style={{marginBottom: '10px'}} />
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
          </CardContent>
          <Divider style={{marginBottom: '10px'}} />
        {defaultLocale !== selectedLocale ?
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
                    defaultLocale={defaultLocale}
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
    </SolidContainer>
  );
}

const translationsSelector = createSelector(
  [
    (state) => state.translation.all,
    (state) => state.translation.selectedLocale
  ],
  (translations, selectedLocale) => {
    const locales = Object.keys(translations).filter((l) => l !== defaultLocale);

    const ofLocale = MapToList(translations[selectedLocale]);
    const ofDefaultLocale = MapToList(translations[defaultLocale]);

    const byType = R.groupBy((o) => o.type)(ofLocale);
    const defaultByType = R.groupBy((o) => o.type)(ofDefaultLocale);
    return {
      locales,
      ofLocale,
      ofDefaultLocale,
      byType,
      defaultByType
    }
  }
)

export default connect(
  state => ({
    translations: translationsSelector(state),
    selectedLocale: state.translation.selectedLocale,
    supportedLanguages: state.restaurant.languages,
    menuLanguages: state.restaurant.menuLanguages,
    tabIndex: state.ui.translationsTabIndex
  }),
  {
    addLanguage,
    selectLocale,
    pushTranslation,
    switchTab
  }
)(withStyles(styles)(Translations));
