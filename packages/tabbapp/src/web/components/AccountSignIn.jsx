import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion } from 'react-motion';
import { withState } from 'recompose';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Person from '@material-ui/icons/PersonRounded';
import Account from 'web/components/AppBar/Account';
import Image from 'web/components/Image';

const styles = theme => ({
  root: {
    height: 40,
    minWidth: 40,
    borderRadius: 20,
    transition: theme.transitions.create(['background-color', 'border', 'color'], {
      duration: theme.transitions.duration.short,
    }),
  },
  avatar: {
    marginTop: -1,
    marginLeft: -1
  },
  outlined: {
    border: `1px solid ${theme.palette.divider}`,
    // backgroundColor: theme.palette.divider,
    color: theme.palette.text.primary,
  },
  filled: {
    border: `1px solid transparent`,
    color: '#fff',
    backgroundColor: theme.palette.primary.main
  },
  inverseCircleBg: {
    transform: `translate3d(0px, 0, 0)`,
    pointerEvents: 'none',
    position: 'absolute',
    width: 40 - 4,
    height: 40,
    top: 0,
    bottom: 0,
    right: 0,
  },
})

class AccountSignIn extends React.Component {
  state = {
    measuredWidth: 0
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.user.isLoaded !== prevProps.user.isLoaded) ||
        (this.props.user.isEmpty !== prevProps.user.isEmpty)) {
      console.log('Setting measured width to ', this.rootElem.clientWidth);
      this.setState({measuredWidth: this.rootElem.clientWidth});
    }
  }

  render() {
    const {
      classes,
      user,
      history,
      visible,
      theme,
    } = this.props;
    const {
      measuredWidth
    } = this.state;
    const animConfig = { stiffness: 440, damping: 48 };
    let baseClass = classes.outlined;
    if (user.isEmpty && user.isLoaded) baseClass = classes.filled;

    return (
      <Motion
        defaultStyle={{x: 0, y: 0}}
        style={{
          x: spring(visible ? 0 : 1, animConfig),
          y: spring(user.isLoaded ? 1 : 0, animConfig)
        }}>
        {style => {
          // ${theme.palette.background.default} rgba(0, 255, 0, 1)

          let avatarElem = null;
          if (user.photoURL) avatarElem = <Image aspect={1} image={user.photoURL} title={user.displayName} />;
          else if (user.isLoaded && !user.isEmpty) avatarElem = <Person />;

          const aSize = Math.min(1 - style.x, style.y);

          return (<div style={{
            position: 'relative',
            height: 40,
            marginLeft: -(measuredWidth - 8) * style.x,
            marginRight: -16,
            pointerEvents: visible ? '' : 'none',
          }}>
            <div ref={node => {this.rootElem = node}} style={{
              marginRight: 8,
              paddingRight: 8,
              overflow: 'hidden'
            }}>
              <ButtonBase
                disabled={!user.isLoaded}
                className={`${classes.root} ${baseClass}`}
                style={{
                  willChange: 'transform',
                  transform: `translate3d(${measuredWidth * style.x}px, 0px, 0)`,
                }}
                onClick={() => {
                  if (!user.isEmpty) history.push('/account');
                  else if (user.isEmpty && user.isLoaded) history.push('/signin');
                }}>
                {user.isEmpty && user.isLoaded && <Typography
                  variant="button"
                  color="inherit"
                  style={{marginLeft: 16, marginRight: 16}}>
                  Sign in
                </Typography>}
                {!user.isEmpty && <Avatar style={{transform: `scale(${aSize}, ${aSize})`}} className={classes.avatar}>
                  {avatarElem}
                </Avatar>}
                {!user.isEmpty && user.isLoaded &&
                  <Typography
                    variant="caption"
                    style={{marginLeft: 16, marginRight: 16}}
                    color="inherit">
                    {user.displayName}
                  </Typography>}
              </ButtonBase>
            </div>
            <div className={classes.inverseCircleBg} style={{
              backgroundImage: `-webkit-radial-gradient(0px 50%, circle closest-corner,
                rgba(0, 0, 0, 0) 0px,
                rgba(0, 0, 0, 0) 20px,
                ${theme.palette.background.default} 21px
              )`,
            }}/>
          </div>);
        }}
      </Motion>
    );
  }
}

const enhance = compose(
  withState('rootElem', 'setRootElem', 0),
  withTheme(),
  withStyles(styles),
  connect(
    state => ({
      user: state.firebase.auth,
    })
  )
)

export default enhance(AccountSignIn);
