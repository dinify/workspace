import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import style from './footerStyle';
import { getCookie, setCookie } from '@dinify/common/dist/lib/FN';
import { useTranslation } from 'react-i18next';

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

const langs = [{
  lang:'en', country: 'gb', name: 'English'
 },
 {
  lang: 'cs', country: 'cz', name: 'Čeština'
}];

const changeLanguage = (lang) => {
  window.i18nInstance.changeLanguage(lang);
  setCookie('language', lang, 30);
}

const FooterView = ({
  classes,
  ...otherProps
}) => {
  const { t } = useTranslation();
  let selectedLanguage = getCookie('language');

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
            onChange={(event) => {changeLanguage(event.target.value);}}
          >
            {langs.map((l) => (
              <MenuItem key={l.lang} value={l.lang}>
                <ListItem style={{padding: 0}}><Flag country={l.country.toUpperCase()} style={{marginRight: 8}}/>{l.name}</ListItem>
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
                href={`/${link}?source=footer`}
                variant="body2"
                color="textPrimary">
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
