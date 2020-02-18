import React, { useState } from 'react';
import { AppBar, AppBarAction, AppBarTitle } from 'web/components/app-bar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';
import { useTranslation, defaultLanguages, getNativeName } from '@dinify/common/src/lib/i18n';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useTheme } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { useNavigation } from '@dinify/common/src/lib/navigation';
import * as routes from 'web/routes';
import { AppTheme } from '@dinify/common/src/theme';

export default () => {
  const navigation = useNavigation();
  let initialSelectedLanguage;
  if (navigation.state && navigation.state.selectedLanguage) {
    initialSelectedLanguage = navigation.state.selectedLanguage;
  }
  const [selectedLanguage, setSelectedLanguage] = useState(initialSelectedLanguage);
  const disabled = !selectedLanguage || (selectedLanguage === initialSelectedLanguage);
  const [filter, setFilter] = useState('');
  const { t, cldr } = useTranslation();
  const theme = useTheme<AppTheme>();
  const history = useHistory();

  const languageCountries = defaultLanguages.map(id => {
    const nameNative = getNativeName(id);
    const name = cldr.General.getLanguageDisplayName(id);
    return {
      id,
      name,
      nameNative
    }
  });

  const handleSelect = () => {
    if (navigation.state && navigation.state.onSelect) {
      navigation.state.onSelect(selectedLanguage as string);
    }
    else {
      // TODO implement this
      // empty navigation state, page loaded on its own
    }
    history.replace(routes.ACCOUNT);
  };
  const handleBack = () => {
    history.goBack();
  };

  const filtered = languageCountries.filter(lang => {
    if (!filter) return true;
    return match(lang.name, filter).length + match(lang.nameNative, filter).length > 0;
  });

  const highlightBold = (text: string): any => {
    if (!filter) return text;
    return <span>
      {parse(text, match(text, filter)).map((part, i) => {
        return part.highlight ? (<b key={i}>{part.text}</b>) : part.text;
      })}
    </span>;
  }

  return <>
    <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0, borderBottom: 'none' }}>
      <AppBarAction type="back" onClick={handleBack} />
      <AppBarTitle
        title={t('selectLanguage')}
      />
    </AppBar>
    <div style={{ padding: '72px 24px 0 24px' }}>
      <TextField
        fullWidth
        name={t('search')}
        label={t('search')}
        variant="filled"
        value={filter}
        onChange={event => setFilter(event.target.value)} />
    </div>
    <Divider className="sticky" style={{ top: 56, marginTop: 16 }} />
    <List>
      {filtered.map((lang, i) => {
        let primary = highlightBold(lang.nameNative);
        let secondary = highlightBold(lang.name);

        let selected = false;
        if (selectedLanguage) selected = selectedLanguage === lang.id;
        return (
          <ListItem
            key={i} dense button selected={selected}
            style={{ paddingLeft: 24, paddingRight: 24 }}
            onClick={() => setSelectedLanguage(lang.id)}>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        );
      })}
    </List>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 48,
      padding: '0 8px',
      borderTop: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper
    }}>
      <Button
        color="primary"
        style={{ marginRight: 8 }}
        onClick={handleBack}>
        {t('cancel')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={handleSelect}>
        <CheckCircle style={{ marginRight: 8 }} />
        {t('select')}
      </Button>
    </div>
  </>;
};