// @flow
import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import CheckCircle from 'icons/CheckCircle';
import { Motion, spring } from 'react-motion';
import * as FN from 'tabb-front/dist/lib/FN';

import { selectBillItem as selectBillItemAction } from 'ducks/bill/actions';

const styles = theme => ({
  cartItemImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: theme.palette.divider,
    overflow: 'hidden'
  },
  imageSrc: {
    width: 56,
    height: 56,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bg: {
    backgroundColor: theme.palette.background.default
  }
});

class BillItem extends React.PureComponent {

  render() {
    const {
      classes,
      padding,
      index,
      selectBillItem,
      onClick,
    } = this.props;
    const rippleRadius = Math.sqrt(56**2 + 56**2);

    const billItem = this.props.item;
    const selected = billItem.selected;
    const item = billItem.order_item;

    const images = item.menu_item ? FN.MapToList(item.menu_item.images) : [];

    // if (item.menu_item.addons.length || item.menu_item.excludes.length)
    return (
      <Motion
        defaultStyle={{x: 0}}
        style={{x: spring(selected ? 1 : 0, { stiffness: 260, damping: 24 })}}>
        {style1 =>
          <ButtonBase
            disableRipple
            onClick={typeof onClick === 'function' ? onClick : null}
            className={classes.bg}
            style={{
              display: 'flex',
              minWidth: '100%',
              textAlign: 'start',
              borderRadius: 4,
              paddingLeft: padding ? 16 : 0,
              paddingRight: padding ? 16 : 0,
              backgroundColor: `rgba(0,0,0,${Math.min(1, 0.06 * style1.x)})`
            }} >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
              className={classes.cartItemImage}
              ref={(divElement) => {this.divElement = divElement}}>
                {images.length > 0 &&
                  <div
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${images[0].url})`
                    }}
                  />
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
                      transform: `scale(${Math.max(style.x, 1/rippleRadius)}, ${Math.max(style.x, 1/rippleRadius)})`,
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
                      opacity: Math.min(1, style.x),
                      transform: `translate3d(0,0,0) scale(${style.x}, ${style.x})`,
                    }}>
                      <CheckCircle />
                    </div>
                  }
                </Motion>
            </div>
            <div style={{flex: 1, marginLeft: 16, position: 'relative'}}>
              <div style={{display: 'flex'}}>
                <Typography style={{flex: 1, marginRight: 32}} >
                  {item.menu_item && item.menu_item.name}
                </Typography>
                <Typography
                  style={{alignSelf: 'flex-end'}}
                  variant="overline">
                  {item.menu_item && FN.formatPrice(item.menu_item.price)}
                </Typography>
              </div>
            </div>
          </ButtonBase>
        }
      </Motion>
    )
  }
}

BillItem = connect(
  null,
  {
    selectBillItem: selectBillItemAction,
  }
)(BillItem)

export default withStyles(styles)(BillItem);
