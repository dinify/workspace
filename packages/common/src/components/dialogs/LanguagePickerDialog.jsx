import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languageCountries as languageCountriesUnlocalized } from '../../lib';
import defaultLanguages from '../../lib/default-languages.json';
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
import CheckCircle from '@material-ui/icons/CheckCircleRounded';

const LanguagePickerDialog = ({
  open = false,
  initialSelectedLanguage = '',
  onClose = () => {},
  theme,
  ...otherProps
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(initialSelectedLanguage);
  const [filter, setFilter] = useState('');
  const { t, i18n } = useTranslation();

  const languageCountries = languageCountriesUnlocalized
    .filter(l => defaultLanguages.includes(l.code))
    .map(lang => {
      const nameEnglish = lang.name;
      const localizedName = i18n.format(lang.code, 'languageName');
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
      setSelectedLanguage('');
      setFilter('');
      onClose(null);
    }} {...otherProps}>
      <DialogTitle>
        {t('selectLanguage')}
      </DialogTitle>
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
            value={filter}
            onChange={event => setFilter(event.target.value)}/>
        </div>
        <Divider style={{marginTop: 16}}/>
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
            if (selectedLanguage) selected = selectedLanguage.split('-')[0] === lang.code;
            return (
              <ListItem
                key={i} dense button selected={selected}
                style={{paddingLeft: 24, paddingRight: 24}}
                onClick={() => setSelectedLanguage(lang.code)}>
                <ListItemText primary={primary} secondary={secondary}/>
                {selected && <CheckCircle style={{color: theme.palette.background.paper}}/>}
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
            setSelectedLanguage('');
            setFilter('');
            onClose(null)
          }}>
          {t('cancel')}
        </Button>
        <Button
          color="primary"
          disabled={!selectedLanguage}
          onClick={() => {
            setFilter('');
            onClose(selectedLanguage)
          }}>
          {t('select')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTheme()(LanguagePickerDialog);
