import React from 'react';
import { AppBar, AppBarAction, AppBarTitle } from 'web/components/app-bar';
import Services from 'web/pages/Services';
import { useTranslation } from '@dinify/common/src/lib/i18n';

export const ServicesScreen: React.FC<{
  onClose?: () => void
}> = ({ onClose = () => { } }) => {
  const { t } = useTranslation();
  return (
    <>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <AppBarAction type="close" onClick={onClose} />
        <AppBarTitle title={t('service.header')} />
      </AppBar>
      <Services style={{ marginTop: 56 }} />
    </>
  );
};