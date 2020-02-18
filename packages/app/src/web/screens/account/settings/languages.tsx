import React from 'react';
import remove from 'ramda/es/remove';
import {
  useIntl,
  useTranslation,
  getNativeName,
  getTranslationId,
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
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { RootState } from 'typesafe-actions';
import { Locale } from '@phensley/cldr';
import { Profile } from 'store/root-reducer';
import { useHistory } from 'react-router';
import * as routes from 'web/routes';
import { useNavigation } from '@dinify/common/src/lib/navigation';

export default () => {
  const { t } = useTranslation();
  const { setLocale } = useIntl();
  // const openDialog = useAction(openDialogAction);
  const history = useHistory();
  const navigation = useNavigation();
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
    language: string | null,
    handler: (langtag: Locale | null) => any,
  ) => () => {
    let selectedLanguage;
    if (language) selectedLanguage = getTranslationId(language);
    function onSelect(language: string) {
      // match locale which includes default region tag for this language
      const locale = localeMatcher.match(language).locale;
      handler(locale);
    }
    navigation.setState({
      selectedLanguage,
      onSelect
    })
    history.push(routes.LANGUAGE);
    // openDialog({
    //   type: 'language',
    //   handler,
    // });
  };

  // TODO className={classes.button2}
  const primaryClickHandler = getClickHandler(isPrimarySet ? language.primary : null, handlePrimary);
  const otherClickHandler = getClickHandler(null, handleOther);
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
          <ListItemText primary={getNativeName(language.primary)} />
          <ChevronRight color="action" />
        </ListItem>
      ) : (
          <div style={{ padding: '16px 24px' }}>
            <Button style={{ margin: '0 -8px' }} onClick={primaryClickHandler} variant="text" color="primary">
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
            <ListItemText primary={getNativeName(lang)} />
            <IconButton onClick={getRemoveHandler(i)}>
              <Delete />
            </IconButton>
            <IconButton onClick={getSwapHandler(i)}>
              <ArrowUpward />
            </IconButton>
          </ListItem>
        ))}
      <div style={{ padding: '16px 24px' }}>
        <Button style={{ margin: '0 -8px' }} onClick={otherClickHandler} variant="text" color="primary">
          {t('language.addOther')}
        </Button>
      </div>
    </>
  );
};
