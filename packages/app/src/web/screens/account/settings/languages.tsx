import React from 'react';
import remove from 'ramda/es/remove';
import {
  useIntl,
  useTranslation,
  localizedLanguages,
  localeMatcher,
} from '@dinify/common/src/lib/i18n';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import ArrowUpward from '@material-ui/icons/ArrowUpwardRounded';
import Delete from '@material-ui/icons/DeleteRounded';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { openDialogAction } from '../../../../features/ui/actions';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { RootState } from 'typesafe-actions';
import { Locale } from '@phensley/cldr';
import { Profile } from '../../../../store/root-reducer';
import { useAction } from '@dinify/common/src/lib/util';

export default () => {
  const { t } = useTranslation();
  const { setLocale } = useIntl();
  const openDialog = useAction(openDialogAction);
  const firebase = useFirebase();
  const profile = useSelector((state: RootState) => state.firebase.profile);
  const isLanguageSet = profile ? !!profile.language : false;
  const language = profile.language as Profile['language'];
  const isPrimarySet = isLanguageSet && !!language.primary;
  const isOtherSet = isLanguageSet && !!language.other;
  const handlePrimary = (locale: Locale | null) => {
    if (locale) {
      setLocale(locale);
      firebase.updateProfile({
        language: {
          ...language,
          primary: locale.tag.compact(),
        },
      });
    }
  };
  const handleOther = (locale: Locale | null) => {
    if (locale) {
      const compact = locale.tag.compact();
      firebase.updateProfile({
        language: {
          ...language,
          other: [...(language.other || []), compact],
        },
      });
    }
  };
  const getSwapHandler = (i: number) => () => {
    const other = language.other;
    const tmp = other[i];
    other[i] = language.primary;
    setLocale(tmp);
    firebase.updateProfile({
      language: {
        primary: tmp,
        other,
      },
    });
  };
  const getRemoveHandler = (i: number) => () => {
    firebase.updateProfile({
      language: {
        ...language,
        other: remove(i, 1, language.other),
      },
    });
  };
  const getClickHandler = (
    handler: (langtag: Locale | null) => any,
  ) => () => {
    openDialog({
      type: 'language',
      handler,
    });
  };
  const getLocalName = (languageId: string) => {
    const tag = localeMatcher.match(languageId).locale.tag;
    const id = tag.language() === 'zh' ? `zh-${tag.script()}` : tag.language();
    return (localizedLanguages as any)[id];
  };

  // TODO className={classes.button2}
  const primaryClickHandler = getClickHandler(handlePrimary);
  const otherClickHandler = getClickHandler(handleOther);
  return (
    <>
      <Typography
        style={{ padding: '16px 24px' }}
        variant="subtitle2"
        color="textSecondary"
      >
        {t('language.default')}
      </Typography>
      {isPrimarySet ? (
        <ListItem
          style={{ paddingLeft: 24, paddingRight: 24 }}
          button
          onClick={primaryClickHandler}
        >
          <ListItemText primary={getLocalName(language.primary)} />
          <ChevronRight color="action" />
        </ListItem>
      ) : (
          <div style={{ padding: '16px 24px' }}>
            <Button onClick={primaryClickHandler} variant="text" color="primary">
              {t('language.setPrimary')}
            </Button>
          </div>
        )}
      <Divider />
      <Typography
        style={{ padding: '16px 24px' }}
        variant="subtitle2"
        color="textSecondary"
      >
        {t('language.other')}
      </Typography>
      {isOtherSet &&
        language.other.map((lang, i) => (
          <ListItem key={lang} style={{ paddingLeft: 24, paddingRight: 24 }}>
            <ListItemText primary={getLocalName(lang)} />
            <IconButton onClick={getRemoveHandler(i)}>
              <Delete />
            </IconButton>
            <IconButton onClick={getSwapHandler(i)}>
              <ArrowUpward />
            </IconButton>
          </ListItem>
        ))}
      <div style={{ padding: '16px 24px' }}>
        <Button onClick={otherClickHandler} variant="text" color="primary">
          {t('language.addOther')}
        </Button>
      </div>
    </>
  );
};
