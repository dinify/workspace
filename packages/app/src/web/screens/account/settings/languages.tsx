import React from 'react';
import remove from 'ramda/es/remove';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import ArrowUpward from '@material-ui/icons/ArrowUpwardRounded';
import Delete from '@material-ui/icons/DeleteRounded';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { setLocaleAction, openDialogAction } from '../../../../ducks/ui/actions';
import { useStore } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { RootState } from 'typesafe-actions';
import { LanguageIdType } from '@phensley/cldr';
import { Profile } from '../../../../store/root-reducer';
import localizedLanguages from '@dinify/common/src/lib/i18n/localized-languages.json';

export default () => {
  const { t } = useTranslation();
  const store = useStore();
  const firebase = useFirebase();
  const state: RootState = store.getState();
  const profile = state.firebase.profile as Profile;
  const isLanguageSet = profile ? !!profile.language : false;
  const language = profile.language as Profile['language'];
  const isPrimarySet = isLanguageSet && !!language.primary;
  const isOtherSet = isLanguageSet && !!language.other;

  const handlePrimary = (langtag: LanguageIdType|null) => {
    if (langtag) {
      store.dispatch(setLocaleAction(langtag));
      firebase.updateProfile({
        language: {
          ...profile.language,
          primary: langtag,
        }
      });
    }
  };
  const handleOther = (langtag: LanguageIdType|null) => {
    if (langtag) {
      firebase.updateProfile({
        language: {
          ...language,
          other: [...language.other, langtag]
        }
      });
    }
  };
  const getSwapHandler = (i: number) => () => {
    const other = profile.language.other;
    const tmp = other[i];
    other[i] = profile.language.primary;
    firebase.updateProfile({
      language: {
        primary: tmp,
        other
      }
    });
  };
  const getRemoveHandler = (i: number) => () => {
    firebase.updateProfile({
      language: {
        ...profile.language,
        other: remove(i, 1, profile.language.other)
      }
    });
  };
  const getClickHandler = (primary = true) => () => {
    store.dispatch(openDialogAction({
      type: 'currency',
      handler: primary ? handlePrimary : handleOther
    }));
  };
  const getLocalName = (language: string) => {
    const result = (localizedLanguages as any)[language];
    console.log('Local name for ', language, result);
    return result;
  };

  // TODO className={classes.button2}
  return <>
    <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
      {t('language.default')}
    </Typography>
    {isPrimarySet 
    ? <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={getClickHandler()}>
        <ListItemText primary={getLocalName(language.primary)} />
        <ChevronRight color="action"/>
      </ListItem>
    : <div style={{padding: '16px 24px'}}>
        <Button onClick={getClickHandler()} variant="text" color="primary">
          {t('language.setPrimary')}
        </Button>
      </div>
    }
    <Divider />
    <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
      {t('language.other')}
    </Typography>
    {isOtherSet && language.other.map((lang, i) => (
      <ListItem key={lang} style={{paddingLeft: 24, paddingRight: 24}}>
        <ListItemText primary={getLocalName(lang)} />
        <IconButton onClick={getRemoveHandler(i)}>
          <Delete />
        </IconButton>
        <IconButton onClick={getSwapHandler(i)}>
          <ArrowUpward />
        </IconButton>
      </ListItem>
    ))}
    <div style={{padding: '16px 24px'}}>
      <Button onClick={getClickHandler(false)} variant="text" color="primary">
        {t('language.addOther')}
      </Button>
    </div>
  </>;
};