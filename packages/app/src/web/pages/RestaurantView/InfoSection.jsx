import React from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMore from '@material-ui/icons/ExpandMoreRounded';
import Public from '@material-ui/icons/PublicRounded';
import Email from '@material-ui/icons/EmailRounded';
import Phone from '@material-ui/icons/PhoneRounded';
import Place from '@material-ui/icons/PlaceRounded';
import Schedule from '@material-ui/icons/ScheduleRounded';
import StaticMap from 'web/components/StaticMap';
import Typography from '@material-ui/core/Typography';
import uniqueId from 'lodash.uniqueid';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  },
  nopad: {
    padding: 0,
    margin: 0
  },
  expansionRoot: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:before': {
      display: 'none'
    },
  }
});

const days = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]

const InfoSection = ({
  classes,
  restaurant
}) => {
  let addr = false;
  if (restaurant && restaurant.address) addr = restaurant.address.postal;
  const { t, cldr } = useTranslation();
  const openHours = restaurant.openHours || restaurant.open_hours;
  const displayOpenHours = false;
  if (openHours !== null && openHours !== undefined && openHours !== [] && openHours['mon']) displayOpenHours = true;
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const localizedWeekdays = {};
  [1,2,3,4,5,6,7].forEach((key, i) => {
    localizedWeekdays[weekdays[i]] = cldr.Calendars.weekdays({ width: 'wide' })[key];
  });
  const shortTimeSkeleton = cldr.Calendars.manager.getCalendarPatterns().timeFormats['short'];
  const getDate = (time, offset = 0) => {
    const parts = time.split(':').map((s) => parseInt(s));
    let now = new Date();
    now.setHours(parts[0]);
    now.setMinutes(parts[1]);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(now.getDate() + offset);
    return now;
  };
  const getOpenState = () => {

    const now = new Date();
    let isOpen = false;
    let at = null;
    const getHours = (day) => openHours[weekdays[day]]
      .map((interval) => ({
        from: getDate(interval[0]),
        to: getDate(interval[1])
      }))
      .sort((a, b) => a.from.getTime() - b.from.getTime());
  
    const todayHours = getHours(new Date().getDay());
    const tomorrowHours = getHours(new Date().getDay() + 1);
    todayHours.forEach((i) => {
      if (now >= i.from && now <= i.to) {
        isOpen = true;
        at = i.to;
      }
      else if (!isOpen && at === null && now <= i.from) {
        at = i.from;
      }
    });
    if (!isOpen && now >= todayHours[todayHours.length - 1].to) {
      at = tomorrowHours[0].from;
    }
    else if (!isOpen && now <= todayHours[0].from) {
      at = todayHours[0].from;
    }
    
    return [
      isOpen ? 'hours.open' : 'hours.closed',
      isOpen ? 'hours.closes_at' : 'hours.opens_at', { time: at }
    ];
  };
  
  const formatOpenHoursInterval = (value, offset) => {
    let formatted = `ERROR`;
    try {
      const m0 = parseInt(value[0].split(':')[1]);
      const m1 = parseInt(value[1].split(':')[1]);
      const start = { date: getDate(value[0]) };
      const end = { date: getDate(value[1])  };
      const h = m0 > 0 && m1 > 0 ? 'hm' : 'h';
      const H = m0 > 0 && m1 > 0 ? 'Hm' : 'Hm';
      const intervalSkeleton = shortTimeSkeleton.includes('h') ? h : H;
      formatted = cldr.Calendars.formatDateInterval(
        start, 
        end,
        { skeleton: intervalSkeleton }
      );
    }
    catch (e) {
    }
    return formatted;
  };

  return (
    <div>
      <a rel="noopener noreferrer" target="_blank" href={`https://www.google.com/maps/search/${restaurant.name}/@${restaurant.latitude},${restaurant.longitude},17z`}
        style={{textDecoration: 'none', display: 'block'}}>
        <div id='map' style={{width: '100%'}}>
          <StaticMap restaurant={restaurant} />
        </div>
        {addr &&
          <ListItem>
            <ListItemIcon>
              <Place className={classes.secondary}/>
            </ListItemIcon>
            <ListItemText
              primary={`${addr.street}, ${addr.region}, ${addr.locality} ${addr.postal_code}`}
              secondary={t('address')}
              primaryTypographyProps={{variant: 'body1'}}
              secondaryTypographyProps={{variant: 'caption'}}/>
          </ListItem>
        }
      </a>

      {displayOpenHours && (
        <ExpansionPanel classes={{root: classes.expansionRoot, expanded: classes.nopad}}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <ListItem disableGutters classes={{default: classes.nopad}}>
              <ListItemIcon>
                <Schedule className={classes.secondary}/>
              </ListItemIcon>
              <ListItemText
                primary={t(getOpenState(openHours)[0])}
                secondary={t(getOpenState(openHours)[1])}
                primaryTypographyProps={{variant: 'body1'}}
                secondaryTypographyProps={{variant: 'caption'}}/>
            </ListItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
            <table style={{borderSpacing: 0, paddingLeft: 56}}>
              <tbody>
                {[0,1,2,3,4,5,6].map(index => {
                  const offsetWeekday = weekdays[(new Date().getDay() + index) % 7];
                  const localizedDay = localizedWeekdays[offsetWeekday];
                  return openHours[offsetWeekday].map((value, idx) => {
                    const formatted = formatOpenHoursInterval(value, index);
                    return (
                      <tr key={index + idx}>
                        {idx !== 0 && <td/>}
                        {idx === 0 && <td style={{padding: 0, verticalAlign: 'top', textAlign: 'left'}}>
                          <Typography use="body2" theme={index === 0 ? 'textPrimaryOnBackground' : 'textSecondaryOnBackground'} >
                            {index === 0 ? <b>{localizedDay}</b> : localizedDay}
                          </Typography>
                        </td>}
                        <td style={{padding: 0, verticalAlign: 'top', textAlign: 'left'}}>
                          <Typography use="body2" key={idx} style={{paddingLeft: 24}} >
                            {index === 0 ? <b>{formatted}</b> : formatted}
                          </Typography>
                        </td>
                    </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}

      {restaurant.contact && restaurant.contact.phone && <a rel="noopener noreferrer" target="_blank" href={`tel:${restaurant.contact.phone}`}
        style={{textDecoration: 'none', display: 'block'}}>
        <ListItem>
          <ListItemIcon>
            <Phone className={classes.secondary}/>
          </ListItemIcon>
          <ListItemText
            primary={restaurant.contact.phone}
            secondary={t('phone.long')}
            primaryTypographyProps={{variant: 'body1'}}
            secondaryTypographyProps={{variant: 'caption'}}/>
        </ListItem>
      </a>}
      {restaurant.contact && restaurant.contact.email && <a rel="noopener noreferrer" target="_blank" href={`mailto:${restaurant.contact.email}`}
        style={{textDecoration: 'none', display: 'block'}}>
        <ListItem>
          <ListItemIcon>
            <Email className={classes.secondary}/>
          </ListItemIcon>
          <ListItemText
            primary={restaurant.contact.email}
            secondary={t('email.long')}
            primaryTypographyProps={{variant: 'body1'}}
            secondaryTypographyProps={{variant: 'caption'}}/>
        </ListItem>
      </a>}
      {restaurant.contact && restaurant.contact.website && <a rel="noopener noreferrer" target="_blank" href={restaurant.contact.website}
        style={{textDecoration: 'none', display: 'block'}}>
        <ListItem>
          <ListItemIcon>
            <Public className={classes.secondary}/>
          </ListItemIcon>
          <ListItemText
            primary={restaurant.contact.website}
            secondary={t('website')}
            primaryTypographyProps={{variant: 'body1'}}
            secondaryTypographyProps={{variant: 'caption'}}/>
        </ListItem>
      </a>}
    </div>
  )
}

export default withStyles(styles)(InfoSection);
