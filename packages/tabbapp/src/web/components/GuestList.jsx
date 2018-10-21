import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Person from 'icons/Person';
import Typography from '@material-ui/core/Typography';
import ScrollSnapView from 'web/components/ScrollSnapView';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tabs from '@material-ui/core/Tabs';
import { Motion, spring } from 'react-motion';
import CheckCircle from 'icons/CheckCircle';

const styles = theme => ({

});

class GuestList extends React.Component {
  state = {
    selectedGuests: []
  }

  selectGuest = (id) => {
    if (!this.props.selecting) return;
    const selectedGuests = this.state.selectedGuests;
    selectedGuests[id] = !selectedGuests[id];
    this.setState({selectedGuests});
  }

  render() {
    const {
      classes,
      selecting,
      seats,
      active,
      onGuestClick = () => {},
      users
    } = this.props;
    const { selectedGuests } = this.state;
    const rippleRadius = 40;

    return (
      <ScrollSnapView
        style={{
          width: '100%',
          border: 'none',
        }}
        snap={false}
        ref={(node => {this.root = node})}
        selected={active}>
        {seats.map((seat, i, arr) => {
          const selected = selectedGuests[seat.id] && selecting;
          const user = users[seat.user_id];
          return <div id={`guest-${seat.id}`} key={`guest-${seat.id}`} style={{
            // border: '1px solid rgba(255, 0,0,0.54)',
            display: 'inline-block',
            paddingLeft: 16,
            marginRight: arr.length - 1 === i ? 16 : 0
          }}>
            <ButtonBase
              onClick={selecting ? () => this.selectGuest(seat.id) : () => onGuestClick(i)}
              style={{borderRadius: 4, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start'}}>
              {user && user.image && <Avatar alt={user.name} src={user.image} />}
              {user && !user.image &&
                <Avatar className={classes.avatar}>
                  <Person />
                </Avatar>
              }
              <Motion
                defaultStyle={{x: 0}}
                style={{x: spring(selected ? 1 : 0, { stiffness: 260, damping: 24 })}}>
                {style =>
                  <div style={{
                    position: 'absolute',
                    backgroundColor: '#c13939',
                    borderRadius: rippleRadius / 2,
                    minHeight: rippleRadius,
                    minWidth: rippleRadius,
                    opacity: Math.min(1, style.x * 2),
                    transform: `translate3d(0,0,0) scale(${Math.max(style.x, 1/rippleRadius)}, ${Math.max(style.x, 1/rippleRadius)})`,
                  }}/>
                }
              </Motion>
              <Motion
                defaultStyle={{x: 0}}
                style={{x: spring(selected ? 1 : 0, { stiffness: 480, damping: selected ? 15 : 24 })}}>
                {style =>
                  <div style={{
                    position: 'absolute',
                    color: '#fff',
                    top: 16,
                    opacity: Math.min(1, style.x),
                    transform: `translate3d(0,0,0) scale(${style.x}, ${style.x})`,
                  }}>
                    <CheckCircle />
                  </div>
                }
              </Motion>
              <Motion
                defaultStyle={{x: 0.86}}
                style={{x: spring(active === i ? 1 : 0.86, { stiffness: 480, damping: selected ? 15 : 24 })}}>
                {style =>
                  <Typography style={{
                    paddingTop: 8,
                    transform: `translate3d(0,0,0) scale(${style.x}, ${style.x})`,
                  }}  color={active === i ? 'default' : 'textSecondary'}>
                    {user ? user.name : ''}
                  </Typography>
                }
              </Motion>

            </ButtonBase>
          </div>
        }
        )}
      </ScrollSnapView>
    );
  };
}

GuestList = connect(
  state => ({
    users: state.user.all
  })
)(GuestList)

export default withStyles(styles)(GuestList);
