import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Person from 'icons/Person';
import Typography from 'web/components/Typography';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import * as FN from 'lib/FN';

const styles = theme => ({
  scroller: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    paddingBottom: 32,
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'x mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '& > div': {
      WebkitOverflowScrolling: 'touch',
      scrollSnapAlign: 'start',
    }
  }
});

const GuestList = ({
  classes,
  seats,
}) => {

  // TODO: fetch user base on seat.user_id
  const user = {
    name: "John Doe",
    image: null
  };
  const names = [
    'John Doe',
    'Glen Combs',
    'Nick Miles',
    'Steven Best',
    'Cecil Conley',
    'Tracy Lamb',
    'Arnold Snyder',
    'Cody Buckley',
    'Ronald Johnston',
    'Joseph Carter',
    'Roberto Yates',
  ];

  return (
    <div className={classes.scroller}>
      {seats.map((seat, i, arr) =>
        <div key={seat.id} style={{
          borderRadius: 4,
          display: 'inline-block',
          paddingLeft: 16,
          marginRight: arr.length - 1 === i ? 16 : 0
        }}>
          <ButtonBase style={{borderRadius: 4, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {user.image && <Avatar alt={user.name} src={user.image} />}
            {!user.image &&
              <Avatar className={classes.avatar}>
                <Person />
              </Avatar>
            }
            <Typography variant="caption" color={seat.selected ? 'default' : 'textSecondary'} style={{paddingTop: 8}}>
              {names[Math.floor(Math.random()*names.length)]}
            </Typography>
          </ButtonBase>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(GuestList);
