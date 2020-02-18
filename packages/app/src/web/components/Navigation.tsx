import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { select } from '@dinify/common/src/lib/platform';

// import Settings from '@material-ui/icons/SettingsRounded';
import AccountCircle from '@material-ui/icons/AccountCircleRounded';
import LocalLibrary from '@material-ui/icons/LocalLibrary';

// import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import LocalLibraryOutlined from '@material-ui/icons/LocalLibraryOutlined';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/styles';
import { AppTheme } from '@dinify/common/src/theme';

const styles = () => ({
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
  checkedInRestaurant,
  ...otherProps
}: any) => {
  const { t } = useTranslation();
  const theme = useTheme<AppTheme>();
  const { palette: { primary: { main }, background: { paper }, divider } } = theme;

  const tabs = [
    {
      icon: (selected: boolean) => selected ? <LocalLibrary style={{ color: main }} /> : <LocalLibraryOutlined color="action" />,
      text: t('nav.browse')
    },
    {
      icon: (selected: boolean) => selected ? <AccountCircle style={{ color: main }} /> : <AccountCircleOutlined color="action" />,
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
  }: any) => (
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
    <div style={{ height: 56, ...conidionalStyle, ...style }} className={classes.root}>
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
              onClick={(e: Event) => { handleChange(e, index); }}>
              {tab.icon(selected)}
              <Typography style={{ marginLeft: 8 }} variant="body2" color={selected ? 'primary' : 'textSecondary'}>
                {tab.text}
              </Typography>
            </BottomNavItem>
          );
        })}
      </div>
    </div>
  );
}

export default withStyles(styles as any)(Navigation);
