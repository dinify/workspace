import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Motion, spring } from 'react-motion';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/MenuRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import MoreIcon from '@material-ui/icons/MoreVertRounded';
import Close from '@material-ui/icons/CloseRounded';

const styles = theme => ({
  toolbar: {

  },
})

const ContextMenu = ({
  classes,
  open,
  children,
  onClose = () => {}
}) => {
  return (
    <Motion
      defaultStyle={{x: 1}}
      style={{x: spring(open ? 0 : 1)}}>
      {style =>
        <div style={{
          position: 'fixed',
          bottom: 0,
          height: 56,
          width: '100%',
          zIndex: 1260,
          transform: `translate3d(0, ${style.x * 56}px, 0)`
        }}>
          <AppBar position="static" color="primary">
            <Toolbar className={classes.toolbar}>
              <IconButton style={{marginTop: 4, marginBottom: 4}} onClick={onClose} color="inherit" aria-label="Cancel">
                <Close />
              </IconButton>
              {children}
            </Toolbar>
          </AppBar>
        </div>
      }
    </Motion>
  );
};

export default withStyles(styles)(ContextMenu);
