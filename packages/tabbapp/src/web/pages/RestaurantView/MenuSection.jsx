import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import RestaurantMenu from 'icons/RestaurantMenu';
import Typography from '@material-ui/core/Typography';
import MenuItemCard from 'web/components/MenuItemCard';
import * as FN from 'tabb-front/dist/lib/FN';
import R from 'ramda';
import uniqueId from 'lodash.uniqueid';
import { getCategoriesBySubdomain } from 'ducks/menuCategory/selectors';

const styles = theme => ({
  primary: {
    color: theme.palette.primary.main
  },
  expand: {
    marginLeft: -16,
    marginRight: -16,
  },
  margin: {
    marginLeft: 16,
    marginRight: 16,
  },
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

let MenuSection = ({
  width,
  classes,
  restaurant,
  menuCategoriesList,
}) => {
  if (!restaurant) {
    return <div />
  }
  const mediumScreen = isWidthUp('md', width);
  const mobile = FN.isMobile();
  return (
    <div>
      <Grid container wrap="nowrap" spacing={16}>
        <Grid item>
          <RestaurantMenu className={classes.primary} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Menu</Typography>
          <Typography variant="caption">Everything you can get in {restaurant.name}</Typography>
        </Grid>
      </Grid>
      {R.sort((a,b) => a.precedence - b.precedence, menuCategoriesList).map((category, i) => {
        const categoryItems = FN.MapToList(category.items);
        if (categoryItems.length === 0) return <div />;
        return (
        <div className={mobile ? classes.expand : null} style={{marginTop: i === 0 ? 32 : 0}} key={uniqueId()}>
          {i > 0 && <Divider className={mobile ? classes.margin : null} style={{marginTop: mobile ? 0 : 32, marginBottom: 32}} />}
          <Link style={{textDecoration: 'none'}} to={`/category/${category.id}`}>
            <Typography className={mobile ? classes.margin : null} gutterBottom variant="h6">
              {category.name}
            </Typography>
          </Link>
          {mobile ?
            <div className={classes.scroller}>
              {R.sort((a,b) => a.precedence - b.precedence, categoryItems).map((menuItem, i, arr) =>
                <div key={menuItem.id} style={{
                  display: 'inline-block',
                  width: 'calc(50% - 16px)',
                  paddingLeft: 16,
                  marginRight: arr.length - 1 === i ? 16 : 0
                }}>
                  <div>
                    <MenuItemCard menuItem={menuItem}/>
                  </div>
                </div>
              )}
            </div> :
            <Grid
              container
              spacing={mediumScreen ? 24 : 16}>
              {R.sort((a,b) => a.precedence - b.precedence, FN.MapToList(category.items)).map(menuItem =>
                <Grid item xs={6} sm={4} md={6} key={uniqueId()}>
                  <MenuItemCard menuItem={menuItem}/>
                </Grid>
              )}
            </Grid>
          }
        </div>
      )
      }
      )}
    </div>
  )
}

MenuSection = connect(
  (state, { subdomain }) => ({
    menuCategoriesList: getCategoriesBySubdomain(state, subdomain)
  })
)(MenuSection)
export default withStyles(styles)(withWidth()(MenuSection));
