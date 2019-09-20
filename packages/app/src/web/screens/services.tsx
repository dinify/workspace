import React from 'react';
import { AppBar, AppBarAction, AppBarTitle } from '../components/app-bar';
import Services from '../pages/Services';

export const ServicesScreen: React.FC<{
  onClose?: () => void
}> = ({onClose = () => {}, ...otherProps}) => {
  return (
    <>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <AppBarAction type="close" onClick={onClose}/>
        <AppBarTitle title="Services" />
      </AppBar>
      <Services style={{ marginTop: 56 }}/>
    </>
  );
};