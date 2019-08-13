import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Rice from '@dinify/common/dist/icons/RiceRounded';
import Silverware from '@dinify/common/dist/icons/SilverwareRounded';
import Settings from '@material-ui/icons/SettingsRounded';

import RiceOutlined from '@dinify/common/dist/icons/RiceOutlined';
import SilverwareVariant from '@dinify/common/dist/icons/SilverwareRoundedVariant';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';

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
      icon: selected => selected ? <Silverware color={getColor(selected)} /> : <SilverwareVariant color={getColor(selected)}/>,
      text: t('nav.menu')
    },
    {
      icon: selected => selected ? <Rice color={getColor(selected)}/> : <RiceOutlined color={getColor(selected)}/>,
      text: t('nav.dineIn')
    },
    {
      icon: selected => selected ? <Settings color={getColor(selected)}/> : <SettingsOutlined color={getColor(selected)}/>,
      text: t('nav.settings')
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
