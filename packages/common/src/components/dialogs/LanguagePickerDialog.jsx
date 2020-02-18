import React, { useState } from 'react';
import { useTranslation, localeMatcher } from '../../lib/i18n';
import { languageCountries as languageCountriesUnlocalized } from '../../lib';
import defaultLanguages from '../../lib/i18n/default-languages';
import match from 'autosuggest-highlight/umd/match';
import parse from 'autosuggest-highlight/umd/parse';

// material-ui
import { withTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';

const LanguagePickerDialog = ({
  open = false,
  initialSelectedLocale = null,
  onClose = () => { },
  locale,
  theme,
  ...otherProps
}) => {
  const [selectedLocale, setSelectedLocale] = useState(initialSelectedLocale);
  const [filter, setFilter] = useState('');
  const { t, cldr } = useTranslation(locale);

  const languageCountries = languageCountriesUnlocalized
    .filter(l => defaultLanguages.includes(l.code))
    .map(lang => {
      const nameEnglish = lang.name;
      const localizedName = cldr.General.getLanguageDisplayName(lang.code);
      return {
        ...lang,
        nameEnglish,
        name: localizedName || nameEnglish
      }
    });

  const filtered = languageCountries.filter(lang => {
    if (!filter) return true;
    return match(lang.name, filter).length + match(lang.nameNative, filter).length > 0;
  });

  const highlightBold = text => {
    if (!filter) return text;
    return <span>
      {parse(text, match(text, filter)).map((part, i) => {
        return part.highlight ? (<b key={i}>{part.text}</b>) : part.text;
      })}
    </span>;
  }

  return (
    <Dialog fullScreen open={open} onClose={() => {
      setSelectedLocale(null);
      setFilter('');
      onClose(null);
    }} style={{ height: '100vh', overflow: 'hidden', ...otherProps.style }} {...otherProps}>
      <DialogTitle>
        {t('selectLanguage')}
      </DialogTitle>
      <div style={{
        height: 'calc(100vh - 118px)',
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
            value={filter}
            onChange={event => setFilter(event.target.value)} />
        </div>
        <Divider style={{ marginTop: 16 }} />
        <div style={{
          overflowY: 'scroll',
          paddingTop: 8,
          paddingBottom: 8,
          flex: 1
        }}>
          {filtered.map((lang, i) => {
            let primary = highlightBold(lang.nameNative);
            let secondary = highlightBold(lang.name);

            let selected = false;
            if (selectedLocale) selected = selectedLocale.tag.expanded() === localeMatcher.match(lang.code).locale.tag.expanded();
            return (
              <ListItem
                key={i} dense button selected={selected}
                style={{ paddingLeft: 24, paddingRight: 24 }}
                onClick={() => setSelectedLocale(localeMatcher.match(lang.code).locale)}>
                <ListItemText primary={primary} secondary={secondary} />
                {selected && <ListItemIcon>
                  <CheckCircle style={{ color: theme.palette.background.paper }} />
                </ListItemIcon>}
              </ListItem>
            );
          })}
        </div>
      </div>
      <Divider />
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            setSelectedLocale(null);
            setFilter('');
            onClose(null)
          }}>
          {t('cancel')}
        </Button>
        <Button
          color="primary"
          disabled={!selectedLocale}
          onClick={() => {
            setFilter('');
            onClose(selectedLocale)
          }}>
          {t('select')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTheme(LanguagePickerDialog);
