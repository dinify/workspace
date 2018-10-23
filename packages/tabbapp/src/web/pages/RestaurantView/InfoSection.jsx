import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMore from 'icons/ExpandMore';
import Public from 'icons/Public';
import Email from 'icons/Email';
import Phone from 'icons/Phone';
import Place from 'icons/Place';
import Schedule from 'icons/Schedule';
import StaticMap from 'web/components/StaticMap';
import Typography from 'web/components/Typography';
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

const jsdays = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]

const days = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

const InfoSection = ({
  classes,
  restaurant
}) => {
  const addr = restaurant.address.postal;
  const currentHours = restaurant.open_hours[jsdays[(new Date()).getDay()]];
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
              secondary="Address"
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
              primary={restaurant.open_now ? "Open now" : "Closed"}
              secondary={`Closes at ${currentHours[0][1]}`}
              primaryTypographyProps={{variant: 'body1'}}
              secondaryTypographyProps={{variant: 'caption'}}/>
          </ListItem>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails >
          <table style={{borderSpacing: 0, paddingLeft: 56}}>
            <tbody>
              {Object.entries(restaurant.open_hours).map(([day, values]) =>
                <tr key={uniqueId()}>
                  <td style={{padding: 0, verticalAlign: 'top', textAlign: 'left'}}>
                    <Typography className={classes.secondary} >
                      {days[day]}
                    </Typography>
                  </td>
                  <td style={{padding: 0, verticalAlign: 'top', textAlign: 'left'}}>
                    {values.map(value =>
                      <Typography key={uniqueId()} style={{paddingLeft: 24}} >
                        {value.join(' - ')}
                      </Typography>
                    )}
                  </td>
                </tr>
              )}
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
            secondary="Phone number"
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
            secondary="Email address"
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
            secondary="Website"
            primaryTypographyProps={{variant: 'body1'}}
            secondaryTypographyProps={{variant: 'caption'}}/>
        </ListItem>
      </a>}
    </div>
  )
}

export default withStyles(styles)(InfoSection);
