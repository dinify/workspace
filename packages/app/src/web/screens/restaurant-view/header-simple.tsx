import React from 'react';
import { AppBarAction, AppBar } from '../../components/app-bar';
import { useHistory } from 'react-router';

const Header: React.SFC<any> = () => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  return (
    <AppBar style={{ padding: 0 }} type="gradient">
      <AppBarAction color="inherit" type="back" onClick={handleBack} />
    </AppBar>
  );
}

export default Header;