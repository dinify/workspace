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
import { currencies, defaultCurrencies } from '../../lib';

const styles = theme => ({
  scrollingList: {
    overflowY: 'scroll',
    paddingTop: 8,
    paddingBottom: 8
  }
})

const CurrencyPickerDialog = (props) => {
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

  const filtered = R.filter(currencyCode => {
    if (!filter) return true;
    return match(currencyCode, filter).length > 0;
  }, currencies);

  const highlightBold = text => {
    if (!filter) return text;
    return <span>
      {parse(text, match(text, filter)).map((part, i) => {
        return part.highlight ? (<b key={i}>{part.text}</b>) : part.text;
      })}
    </span>;
  }

  return (
    <Dialog open={open} onClose={() => {
      resetState();
      onClose(null);
    }} {...other}>
      <DialogTitle>
        {t('selectCurrency')}
      </DialogTitle>
      <div style={{
        height: 312,
        width: 240,
        overflow: 'hidden'
      }}>
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
            {filtered.map((currencyCode, i) => {
              const primary = i18n.format(currencyCode, 'currencyName');
              const secondary = highlightBold(currencyCode);
              let selected = false;
              return (
                <ListItem
                  key={i} dense button selected={selected}
                  style={{paddingLeft: 24, paddingRight: 24}}
                  onClick={() => {}}>
                  <ListItemText primary={primary} secondary={secondary}/>
                </ListItem>
              );
            })}
          </div>
        </div>
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

export default enhance(CurrencyPickerDialog);
