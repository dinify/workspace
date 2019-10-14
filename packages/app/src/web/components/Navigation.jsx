import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { select } from 'lib/platform';

// import Settings from '@material-ui/icons/SettingsRounded';
import AccountCircle from '@material-ui/icons/AccountCircleRounded';
import LocalLibrary from '@material-ui/icons/LocalLibrary';

// import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import LocalLibraryOutlined from '@material-ui/icons/LocalLibraryOutlined';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1260
  }
});

const Navigation = ({
  classes,
  borderVisible = true,
  handleChange,
  value,
  style,
  theme,
  checkedInRestaurant,
  ...otherProps
}) => {
  const { palette: { background: { paper }, divider }} = theme;
  const { t } = useTranslation();
  const getColor = selected => selected ? 'primary' : 'action';
  const tabs = [
    {
      icon: selected => selected ? <LocalLibrary color={getColor(selected)} /> : <LocalLibraryOutlined color={getColor(selected)}/>,
      text: t('nav.browse')
    },
    {
      icon: selected => selected ? <AccountCircle color={getColor(selected)}/> : <AccountCircleOutlined color={getColor(selected)}/>,
      text: t('profile')
    }
  ];

  const coupertino = {
    backgroundColor: theme.coupertino.backgroundColor,
    WebkitBackdropFilter: theme.coupertino.backdropFilter,
    backdropFilter: theme.coupertino.backdropFilter,
    borderTop: borderVisible ? `1px solid ${theme.coupertino.borderColor}` : 'none'
  };
  const conidionalStyle = select({
    standard: {
        backgroundColor: paper,
        borderTop: borderVisible ? `1px solid ${divider}` : 'none'
    },
    osx: coupertino,
    ios: coupertino
  });
  const BottomNavItem = ({
    children,
    style,
    ...otherProps
  }) => (
    <Button style={{
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'none',
      borderRadius: 0,
      height: '100%',
      minWidth: 80,
      maxWidth: 168,
      ...style
    }}
    {...otherProps}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </Button>
  );
  return (
    <div style={{height: 56, ...conidionalStyle, ...style}} className={classes.root}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }} {...otherProps}>
        {tabs.map((tab, index) => {
          const selected = value === index;
          return (
            <BottomNavItem key={`bottom-tab-${index}`} selected={selected}
            onClick={(e) => {handleChange(e, index);}}>
              {tab.icon(selected)}
              <Typography style={{marginLeft: 8}} variant="body2" color={selected ? 'primary' : 'textSecondary'}>
                {tab.text}
              </Typography>
            </BottomNavItem>
          );
        })}
      </div>
    </div>
  );
}

export default withTheme()(withStyles(styles)(Navigation));
