import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import LightbulbToggle from '../../../components/LightbulbToggle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { toggleThemeAction } from '../../../../ducks/ui/actions';
import { ThemeType } from 'app/src/ducks/ui/reducers';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector<RootState, ThemeType>(state => state.ui.theme);
  const toggleTheme = () => dispatch(toggleThemeAction());

  // TODO: fix this
  const LightbulbToggleTS = LightbulbToggle as any;
  
  return <>
    <Typography style={{padding: '16px 24px'}} variant="subtitle2" color="textSecondary">
      {t('theme.title')}
    </Typography>
    <ListItem style={{paddingLeft: 24, paddingRight: 24}} button onClick={toggleTheme}>
      <ListItemIcon>
        <LightbulbToggleTS onChange={toggleTheme} checked={theme === 'light'} theme={theme}/>
      </ListItemIcon>
      <ListItemText 
        primary={t(theme === 'light' ? 'theme.nightModeOn' : 'theme.nightModeOff')} 
        secondary={t(theme === 'light' ? 'toggle.off' : 'toggle.on')} />
    </ListItem>
  </>;
};