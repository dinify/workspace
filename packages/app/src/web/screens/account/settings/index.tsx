import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from 'web/components/Card';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import ToggleTheme from './toggle-theme';
import Currency from './currency';
import Languages from './languages';

export default () => {
  const { t } = useTranslation();
  return <>
    <Typography variant="overline" color="textSecondary">
      {t('nav.settings')}
    </Typography>
    <Card style={{ marginTop: 8 }}>
      <Currency />
      <Divider />
      <Languages />
      <ToggleTheme />
    </Card>
  </>;
};