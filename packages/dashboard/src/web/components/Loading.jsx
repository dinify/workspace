import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  progress: {
    color: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    left: '50%',
    top: '100px',
  },
});

const Loading = ({ classes }) => {
  return (
    <CircularProgress className={classes.progress} />
  )
}

export default withStyles(styles)(Loading);
