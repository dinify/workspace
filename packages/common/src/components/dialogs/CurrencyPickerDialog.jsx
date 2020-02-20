import React from 'react';
import * as R from 'ramda';
import { compose } from 'redux';
import { withStateHandlers } from 'recompose';
import { Motion, spring } from 'react-motion';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from '../../lib/i18n';

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
import Typography from '@material-ui/core/Typography';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import ChevronLeft from '@material-ui/icons/ChevronLeftRounded';

import Flag from '../Flag';
import { currencies as currencyCodes, defaultCurrencies } from '../../lib';

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
    selectedCurrency,
    setSelectedCurrency,
    open = false,
    onClose,
    resetState,
    initialSelectedCurrency,
    locale,
    ...other
  } = props;

  const { t, cldr } = useTranslation(locale);

  const localizeMap = (list) => list.map(code => ({
    code, name: cldr.Numbers.getCurrencyDisplayName(code)
  }));

  const searchFilter = (list) => R.filter(currency => {
    if (!filter) return true;
    return match(currency.name, filter).length + match(currency.code, filter).length > 0;
  }, list);

  const highlightBold = text => {
    if (!filter) return text;
    return <span>
      {parse(text, match(text, filter)).map((part, i) => {
        return part.highlight ? (<b key={i}>{part.text}</b>) : part.text;
      })}
    </span>;
  }

  const currencyClickHandler = (currencyCode) => {
    setSelectedCurrency(currencyCode);
  }

  const sections = [];
  let suggestedCodes = [cldr.Numbers.getCurrencyForRegion(cldr.General.locale().tag.region())];
  if (suggestedCodes && suggestedCodes.length > 0) {
    const items = searchFilter(localizeMap(suggestedCodes));
    if (items.length > 0) {
      sections.push({
        title: 'suggested',
        items
      })
    }

    const remaining = searchFilter(localizeMap(R.filter(currencyCode => {
      return !suggestedCodes.includes(currencyCode);
    }, currencyCodes)));

    if (remaining.length > 0) {
      sections.push({
        title: 'other',
        items: remaining
      })
    }
  }
  else {
    sections.push({
      items: searchFilter(localizeMap(currencyCodes))
    })
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
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '0px 24px' }}>
            <TextField
              fullWidth
              name={t('search')}
              label={t('search')}
              hint={t('search')}
              variant="filled"
              value={filter || ''}
              onChange={event => setFilter(event.target.value)} />
          </div>
          <Divider style={{ marginTop: 16 }} />
          <div className={classes.scrollingList} style={{ flex: 1 }}>
            {sections.map((section, sectionsIndex) => {
              return (
                <div key={section.title}>
                  {sectionsIndex > 0 && section.title && <Divider style={{ marginBottom: 8 }} />}
                  {section.title && (
                    <Typography
                      variant="overline"
                      color="textSecondary"
                      style={{ marginLeft: 24, marginRight: 24 }}>
                      {t(section.title)}
                    </Typography>
                  )}
                  {section.items.map(currency => {
                    const primary = highlightBold(currency.name)
                    const secondary = highlightBold(currency.code);
                    let selected = selectedCurrency === currency.code;
                    return (
                      <ListItem
                        key={currency.code} dense button selected={selected}
                        style={{ paddingLeft: 24, paddingRight: 24 }}
                        onClick={() => { currencyClickHandler(currency.code) }}>
                        <ListItemText
                          primaryTypographyProps={{
                            style: {
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis'
                            }
                          }}
                          primary={primary}
                          secondary={secondary} />
                      </ListItem>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Divider />
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            resetState();
            onClose({ clear: true })
          }}>
          {t('clear')}
        </Button>
        <Button
          color="primary"
          disabled={!selectedCurrency}
          onClick={() => {
            resetState();
            onClose(selectedCurrency)
          }}>
          {t('select')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const enhance = compose(
  withStateHandlers(
    ({ initialSelectedCurrency }) => ({
      selectedCurrency: initialSelectedCurrency,
      filter: ''
    }),
    {
      setFilter: () => (value) => ({
        filter: value,
      }),
      setSelectedCurrency: () => (value) => ({
        selectedCurrency: value,
      }),
      resetState: () => (value) => ({
        selectedCurrency: null,
        filter: ''
      })
    }
  ),
  withStyles(styles)
);

export default enhance(CurrencyPickerDialog);
