import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from '@dinify/common/src/lib/i18n';
import Person from '@material-ui/icons/PersonRounded';
import Typography from '@material-ui/core/Typography';
import ScrollSnapView from 'web/components/ScrollSnapView';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Motion, spring } from 'react-motion';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';
import { checkSelecting } from 'features/seat/selectors';


const styles = theme => ({
  avatarMe: {
    margin: -4,
    padding: 2,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.primary.main}`
  }
});

class GuestList extends React.Component {
  render() {
    const {
      t,
      classes,
      seats,
      active,
      auth,
      onGuestClick = () => { },
      users
    } = this.props;
    const rippleRadius = 40;

    return (
      <ScrollSnapView
        style={{
          width: '100%',
          border: 'none',
        }}
        snap={false}
        ref={(node => { this.root = node })}
        selected={active}>
        {seats.map((seat, i, arr) => {
          const me = auth.uid === seat.user_id;
          const user = users[seat.user_id];
          const selected = seat.selected;
          let displayName = '';
          if (user) displayName = me ? t('meParentheses') : user.displayName;

          return <div id={`guest-${seat.id}`} key={`guest-${seat.id}`} style={{
            // border: '1px solid rgba(255, 0,0,0.54)',
            display: 'inline-block',
            paddingLeft: 16,
            marginRight: arr.length - 1 === i ? 16 : 0
          }}>
            <ButtonBase
              onClick={() => onGuestClick(i)}
              style={{
                maxWidth: 96,
                borderRadius: 4,
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start'
              }}>
              {user && user.photoURL && (
                <div className={me ? classes.avatarMe : classes.avatar}>
                  <Avatar alt={me ? t('meParentheses') : displayName} src={user.photoURL} />
                </div>
              )}
              {user && !user.photoURL && (
                <div className={me ? classes.avatarMe : classes.avatar}>
                  <Avatar>
                    <Person />
                  </Avatar>
                </div>
              )}
              <Motion
                defaultStyle={{ x: 0 }}
                style={{ x: spring(selected ? 1 : 0, { stiffness: 260, damping: 24 }) }}>
                {style =>
                  <div style={{
                    position: 'absolute',
                    backgroundColor: '#c13939',
                    borderRadius: rippleRadius / 2,
                    minHeight: rippleRadius,
                    minWidth: rippleRadius,
                    opacity: Math.min(1, style.x * 2),
                    transform: `translate3d(0,0,0) scale(${Math.max(style.x, 1 / rippleRadius)}, ${Math.max(style.x, 1 / rippleRadius)})`,
                  }} />
                }
              </Motion>
              <Motion
                defaultStyle={{ x: 0 }}
                style={{ x: spring(selected ? 1 : 0, { stiffness: 480, damping: selected ? 15 : 24 }) }}>
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
                defaultStyle={{ x: 0.86 }}
                style={{ x: spring(active === i ? 1 : 0.86, { stiffness: 480, damping: selected ? 15 : 24 }) }}>
                {style =>
                  <Typography style={{
                    paddingTop: 8,
                    whiteSpace: 'normal',
                    transform: `translate3d(0,0,0) scale(${style.x}, ${style.x})`,
                  }} color={active === i ? 'default' : 'textSecondary'}>
                    {displayName}
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
    auth: state.firebase.auth,
    users: state.user.all,
    selecting: checkSelecting(state)
  })
)(GuestList)

export default withTranslation()(withStyles(styles)(GuestList));
