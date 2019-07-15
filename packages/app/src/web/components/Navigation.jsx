import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Explore from '@material-ui/icons/ExploreRounded';
import Camera from '@material-ui/icons/CameraRounded';
import AccountCircle from '@material-ui/icons/AccountCircleRounded';

import ExploreOutlined from '@material-ui/icons/ExploreOutlined';
import CameraOutlined from '@material-ui/icons/CameraOutlined';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1250
  }
});

const Navigation = ({
  classes,
  handleChange,
  value,
  style,
  checkedInRestaurant,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const getColor = selected => selected ? 'primary' : 'action';
  const tabs = [
    {
      icon: selected => selected ? <Explore color={getColor(selected)} /> : <ExploreOutlined color={getColor(selected)}/>,
      text: t('nav.explore')
    },
    {
      icon: selected => selected ? <Camera color={getColor(selected)}/> : <CameraOutlined color={getColor(selected)}/>,
      text: t('nav.checkIn')
    },
    {
      icon: selected => selected ? <AccountCircle color={getColor(selected)}/> : <AccountCircleOutlined color={getColor(selected)}/>,
      text: t('nav.account')
    }
  ];
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </Button>
  );
  return (
    <div style={style} className={classes.root}>
      <Divider/>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} {...otherProps}>
        {tabs.map((tab, index) => {
          const selected = value === index;
          return (
            <BottomNavItem key={`bottom-tab-${index}`} selected={selected}
            onClick={(e) => {handleChange(e, index);}}>
              {tab.icon(selected)}
              <Typography variant="body2" color={selected ? 'primary' : 'textSecondary'}>
                {tab.text}
              </Typography>
            </BottomNavItem>
          );
        })}
      </div>
    </div>
  );
}

export default withStyles(styles)(Navigation);
