import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OpenInNew from '@material-ui/icons/OpenInNewRounded';
import Person from '@material-ui/icons/PersonRounded';
import Avatar from '@material-ui/core/Avatar';
import Card from '../../components/Card';
import { useTranslation } from '@dinify/common/src/lib/i18n';

export interface Role {
  id: string;
  resource: string;
}

const restaurantsMap: any = {
  '2G8kTvXR9Nz17OdWq1jY12': { name: 'Rebelbean Vlněna' },
  '5oeaCN0NxATLP4LLcTjhgq': { name: 'Chopstix' },
  '3LysX80MFLdNjghmWGKBEG': { name: 'Hunger Burger' },
  '46vYrjvqBGjygNMyXXlAsU': { name: 'YamYam' },
};

export default ({ roles }: { roles: Role[] }) => {
  const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank');
    if (win !== null) win.focus();
  };

  const { t } = useTranslation();

  return (
    <Card style={{ marginTop: 16 }}>
      <Typography
        style={{ padding: '16px 24px' }}
        variant="subtitle2"
        color="textSecondary"
      >
        {t('roles.title')}
      </Typography>

      {roles.map(role => {
        let secondary = '';
        if (restaurantsMap[role.resource]) {
          const name = restaurantsMap[role.resource].name;
          secondary = t('roles.at', [name]);
        }
        return (
          <ListItem
            key={role.resource}
            style={{ paddingLeft: 24, paddingRight: 24 }}
          >
            <Avatar
              style={{
                backgroundColor: '#c13939',
                color: 'rgba(255, 255, 255, 1)',
              }}
            >
              <Person />
            </Avatar>
            <ListItemText
              primary={t(`roles.${role.id}`)}
              secondary={secondary}
            />
          </ListItem>
        );
      })}
      <ListItem
        button
        onClick={() => {
          openInNewTab('https://dashboard.dinify.app/');
        }}
        style={{ paddingLeft: 80, paddingRight: 24 }}
      >
        <ListItemText primary="Dashboard" />
        <OpenInNew style={{ opacity: 0.54 }} />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          openInNewTab('https://waiterboard.dinify.app/');
        }}
        style={{ paddingLeft: 80, paddingRight: 24 }}
      >
        <ListItemText primary="Waiterboard" />
        <OpenInNew style={{ opacity: 0.54 }} />
      </ListItem>
    </Card>
  );
};
