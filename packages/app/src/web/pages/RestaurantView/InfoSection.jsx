import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
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
import Typography from '@dinify/common/dist/components/Typography';
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
  const addr = restaurant.address.postal;
  const { t, i18n } = useTranslation();
  const currentWeekDayIndex = new Date().getDay();
  const currentHours = restaurant.open_hours[days[currentWeekDayIndex]];
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

      <ExpansionPanel classes={{root: classes.expansionRoot, expanded: classes.nopad}}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <ListItem disableGutters classes={{default: classes.nopad}}>
            <ListItemIcon>
              <Schedule className={classes.secondary}/>
            </ListItemIcon>
            <ListItemText
              primary={restaurant.open_now ? t('hours.open') : t('hours.closed')}
              secondary={t((restaurant.open_now ? 'hours.closes_at' : 'hours.opens_at'), {time: new Date(`1970-01-01 ${currentHours[0][restaurant.open_now ? 1 : 0]}`)})}
              primaryTypographyProps={{variant: 'body1'}}
              secondaryTypographyProps={{variant: 'caption'}}/>
          </ListItem>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails >
          <table style={{borderSpacing: 0, paddingLeft: 56}}>
            <tbody>
              {[...Array(6).keys()].map(index => {
                const offsetIndex = (currentWeekDayIndex + index) % 7;
                const localizedDay = i18n.format(days[offsetIndex], 'weekDayName:wide');

                return (
                  <tr key={uniqueId()}>
                    <td style={{padding: 0, verticalAlign: 'top', textAlign: 'left'}}>
                      <Typography color={index === 0 ? 'textPrimary' : 'textSecondary'} >
                        {index === 0 ? <b>{localizedDay}</b> : localizedDay}
                      </Typography>
                    </td>
                    <td style={{padding: 0, verticalAlign: 'top', textAlign: 'left'}}>
                      {restaurant.open_hours[days[offsetIndex]].map(value => {
                        // TODO: better time respresentation (?)
                        const formatted = i18n.format({
                          start: index === 0 ? new Date(`1970-01-01 08:00`) : new Date(`1970-01-01 ${value[0]}`),
                          end: new Date(`1970-01-01 ${value[1]}`)
                        }, 'dateTimeInterval');
                        return (
                          <Typography key={uniqueId()} style={{paddingLeft: 24}} >
                            {index === 0 ? <b>{formatted}</b> : formatted}
                          </Typography>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ExpansionPanelDetails>
      </ExpansionPanel>

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
