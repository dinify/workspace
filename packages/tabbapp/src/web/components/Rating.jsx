import React from 'react';
import times from 'lodash.times';
import amber from '@material-ui/core/colors/amber';
import Star from 'icons/Star';
import StarBorder from 'icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  dot: {
    backgroundColor: theme.palette.divider,
    display: 'inline-block',
  },
  dotFill: {
    backgroundColor: amber[300]// theme.palette.primary.main
  },
  star: {
    color: amber[300],
    display: 'inline-block',
  },
  starFill: {
    display: 'inline-block',
    color: amber[300]// theme.palette.primary.main
  },
  container: {
    whiteSpace: 'nowrap',
  }
})

const Rating = ({
  classes,
  stars,
  size,
  circular,
  rating
}) => {
  const s = size || 12;
  return (
    <div className={classes.container} style={{
      height: s,
    }}>
      {times(stars || 5, (i) => {
        let w = (rating - Math.floor(rating)) * s;
        if (rating >= i + 1) w = s;
        else if (i >= Math.ceil(rating)) w = 0;
        const dot = (
          <div className={classes.dot} style={{
            display: 'inline-block',
            marginRight: s / 2,
            width: s,
            height: s,
            borderRadius: s / 2,
            overflow: 'hidden'
          }}>
            <div className={classes.dotFill} style={{
              height: s,
              width: w// rating > i ? s : (i <= Math.ceil(rating) ? ((rating - Math.floor(rating)) * s) : 0)
            }}/>
          </div>
        );
        const star = (
          <div key={i} style={{
            position: 'relative',
            display: 'inline-block',
            marginRight: 0,
            width: s,
            height: s,
            overflow: 'hidden'
          }}>
            <StarBorder className={classes.star} style={{
              position: 'absolute',
              top: 0,
              height: s,
              width: s
            }}/>
            <div style={{
              position: 'absolute',
              top: 0,
              height: s,
              width: w,
              overflow: 'hidden'
            }}>
              <Star className={classes.starFill} style={{
                position: 'absolute',
                height: s,
                width: s
              }}/>
            </div>
          </div>
        );
        return circular ? dot : star;
      })}
    </div>
  );
};

export default withStyles(styles)(Rating);
