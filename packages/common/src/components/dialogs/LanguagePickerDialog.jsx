import React from 'react';
import R from 'ramda';
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
import { languages, countries } from '../../lib';

const styles = theme => ({
  scrollingList: {
    overflowY: 'scroll',
    paddingTop: 8,
    paddingBottom: 8
  }
})

const LanguagePickerDialog = (props) => {
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

  const { t } = useTranslation();

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
          name="Search"
          label="Search"
          hint="Search"
          variant="filled"
          value={filter || ''}
          onChange={event => setFilter(event.target.value)}/>
      </div>
      <Divider style={{marginTop: 16}}/>
      <div className={classes.scrollingList} style={{flex: 1}}>
        {filtered.map((lang, i) => {
          const solo = lang.countries.length === 1;

          let secondary = highlightBold(lang.nameNative);
          if (lang.name.toLowerCase() === lang.nameNative.toLowerCase()) {
            if (solo) secondary = (<i>{lang.countries[0].nameNative}</i>);
            else secondary = '';
          }

          let selected = false;
          if (selectedLang) selected = selectedLang.split('-')[0] === lang.code;
          return (
            <ListItem
              key={i} dense button selected={selected}
              style={{paddingLeft: 24, paddingRight: 24}}
              onClick={() => languageClickHandler(lang)}>
              <ListItemText primary={highlightBold(lang.name)} secondary={secondary}/>
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
          const name = countries[country.regionCode];
          return (
            <ListItem key={i} dense button
              selected={country.langtag === selectedLang}
              style={{paddingLeft: 24, paddingRight: 24}}
              onClick={() => countryClickHandler(country)}>
              <ListItemText primary={name} secondary={country.nameNative}/>
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

export default enhance(LanguagePickerDialog);
