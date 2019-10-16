import React from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { AppBar, AppBarTitle } from '../../components/app-bar';

export default () => {
  const { t } = useTranslation();
  return (
    <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <AppBarTitle title={t('profile')} />
    </AppBar>
  );
};