import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    position: 'relative',
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    height: 240,
    whiteSpace: 'nowrap'
  },
  item: {
    display: 'inline-block',
    height: '100%',
    '& > *': {
      height: '100%',
    },
  }
})

const HorizontalScroller = ({
  classes,
  height = 240,
  padding,
  spacing,
  children,
}) => {
  return (
    <div className={classes.container} style={{
      height
    }}>
      <div style={{flex: 1, minWidth: padding || 0}}/>
        <div style={{
          height: '100%',
          paddingTop: padding || 0,
          paddingBottom: padding || 0,
        }}>

        {children && children.map((child, i) =>
          <div className={classes.item} key={i} style={{
            marginLeft: i === 0 ? 0 : (4 || spacing),
            marginRight: i === children.length - 1 ? 0 : (4 || spacing),
          }}>
            {child}
          </div>
        )}

        </div>
      <div style={{flex: 1, minWidth: padding || 0}}/>
    </div>
  );
};

export default withStyles(styles)(HorizontalScroller);
