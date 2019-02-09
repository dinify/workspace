// @flow
import React from 'react';
import { createSelector } from 'reselect'
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { MapToList, ListToMap } from 'lib/FN';
import { connect } from 'react-redux';
import R from 'ramda';
import types from './types';
import Editor from './Editor';
import languagesArray from '@dinify/common/dist/lib/languages.json'
import Avatar from '@material-ui/core/Avatar';
import AutoComplete from 'web/components/MaterialInputs/AutoComplete';
import Divider from '@material-ui/core/Divider';
import { addLocale, selectLocale, pushTranslation } from 'ducks/translation/actions';
import diff from 'object-diff'

const languages = R.mergeAll(languagesArray.map(function(el) {
  return {
    [el[0]]: {
      code: el[0],
      langEn: el[1],
      langLoc: el[2],
      locales: el[3]
    }
  }
}))

const brackets = (str) => `(${str})`

const autocompleteData = MapToList(languages)
  .map(o => ({
    value: o.code,
    label: `${o.langEn} ${o.langLoc !== o.langEn ? brackets(o.langLoc) : ''}`
  }))
  .sort((a, b) => {
    if(a.label < b.label) { return -1; }
    if(a.label > b.label) { return 1; }
    return 0;
  });

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

class Translations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  render() {
    const { translations: {
      locales,
      ofLocale,
      ofDefaultLocale,
      byType,
      defaultByType
    }, classes, addLocale, selectLocale, selectedLocale, pushTranslation } = this.props;
    const { tabIndex } = this.state;


    return (
      <SolidContainer>
        <Paper>
          <Card style={{overflow: 'visible'}}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Select one of defined languages
              </Typography>
              <div>
                {locales.map((locale) =>
                  <Chip
                    key={locale}
                    className={classes.chip}
                    avatar={<Avatar>{locale.toUpperCase()}</Avatar>}
                    label={languages[locale].langEn}
                    onClick={() => selectLocale({ selectedLocale: locale })}
                    color={selectedLocale === locale ? 'primary' : 'default'}
                  />
                )}
              </div>
              <Divider style={{marginBottom: '10px'}} />
              <Typography color="textSecondary" gutterBottom>
                Add language
              </Typography>
              <div style={{maxWidth: '300px'}} className={classes.chip}>
                <AutoComplete
                  dataSource={autocompleteData}
                  placeholder="Select language"
                  onChange={locale =>
                    addLocale({locale})
                  }
                />
              </div>
            </CardContent>
          </Card>
          <Tabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {types.map((type) =>
              <Tab label={type.name} />
            )}
          </Tabs>
          {types.map((type, i) => {
            const translationsMap = ListToMap(byType[type.type] || []);
            const initialValues = makeInitalValues(translationsMap);
            //console.log(initialValues,'ss');
            return (tabIndex === i &&
              <Typography component="div" style={{ padding: 8 * 3 }} key={`${selectedLocale}-${type.type}`}>
                <Editor
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
                />
              </Typography>)
          })}
        </Paper>
      </SolidContainer>
    );
  }
}

const translationsSelector = createSelector(
  [
    (state) => state.translation.all,
    (state) => state.translation.selectedLocale
  ],
  (translations, selectedLocale) => {
    const locales = Object.keys(translations);

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
    selectedLocale: state.translation.selectedLocale
  }),
  {
    addLocale,
    selectLocale,
    pushTranslation
  }
)(withStyles(styles)(Translations));
