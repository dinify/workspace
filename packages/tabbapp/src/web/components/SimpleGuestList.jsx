import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Person from 'icons/Person';
import Typography from 'web/components/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  scroller: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
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

let SimpleGuestList = ({
  classes,
  seats,
  users
}) => {
  return (
    <div className={classes.scroller}>
      {seats.map((seat, i, arr) => {
        const user = users[seat.user_id];
        return <div key={seat.id} style={{
          borderRadius: 4,
          display: 'inline-block',
          paddingLeft: 16,
          marginRight: arr.length - 1 === i ? 16 : 0
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start'
          }}>
            {user && user.image && <Avatar alt={user.name} src={user.image} />}
            {user && !user.image &&
              <Avatar className={classes.avatar}>
                <Person />
              </Avatar>
            }
            {/* <Typography style={{
              paddingTop: 8,
            }} variant="body1" color="textSecondary">
              {user ? user.name : ''}
            </Typography> */}
          </div>
        </div>
      }
      )}
    </div>
  );
}

SimpleGuestList = connect(
  state => ({
    users: state.user.all
  })
)(SimpleGuestList)

export default withStyles(styles)(SimpleGuestList);
