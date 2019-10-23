import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import style from './footerStyle';
import { getCookie, setCookie } from '@dinify/common/dist/lib/FN';
import { useIntl, useTranslation, supportedLocales, localizedLanguages } from '@dinify/common/src/lib/i18n';

// material-ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FilledInput from "@material-ui/core/FilledInput";
import Link from "@material-ui/core/Link";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';

import Flag from "@dinify/common/dist/components/Flag";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const availableLanguages = ['en-GB', 'cs', 'es', 'it', 'de', 'fr', 'ru'];
const locales = supportedLocales.filter(l => availableLanguages.includes(l.id));



const FooterView = ({
  classes,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const { setLocale } = useIntl();
  let selectedLanguage = getCookie('language');
  const changeLocale = (localeId) => {
    setLocale(locales.find(l => l.id === localeId));
    setCookie('language', localeId, 30);
  }

  return (
    <Footer {...otherProps}>
      <GridContainer justify="center" spacing={24}>
        <Grid item>
          <Typography variant="overline" color="textSecondary" style={{marginBottom: 8}}>
            {t('footer.language')}
          </Typography>
          <Select
            classes={{selectMenu: classes.selectMenu}}
            input={<FilledInput disableUnderline name="language" id="language-picker" />}
            value={selectedLanguage}
            onChange={(event) => {changeLocale(event.target.value);}}
          >
            {locales.map((locale) => (
              <MenuItem key={locale.id} value={locale.id}>
                <ListItem component="span" style={{padding: 0}}>
                  <Flag country={locale.tag.region()} style={{marginRight: 8}}/>
                  {localizedLanguages[locale.tag.language()]}
                </ListItem>
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Typography variant="overline" color="textSecondary" style={{marginBottom: 8}}>
            {t('footer.links.title')}
          </Typography>
          {['home', 'restaurants'].map(link => (
            <React.Fragment key={link}>
              <Link
                color="textPrimary"
                href={`/${link}?source=footer`}
                variant="body2">
                {t(`footer.links.${link}`)}
              </Link>
              <br/>
            </React.Fragment>
          ))}
        </Grid>
      </GridContainer>
    </Footer>
  );
}

export default withStyles(style)(FooterView);
