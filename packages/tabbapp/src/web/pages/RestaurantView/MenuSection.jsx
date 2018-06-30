import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import RestaurantMenu from 'icons/RestaurantMenu';
import Typography from 'web/components/Typography';
import MenuItemCard from 'web/components/MenuItemCard';
import * as FN from 'lib/FN';
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
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 32,
    paddingLeft: 8,
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
          <Typography variant="subheading">Menu</Typography>
          <Typography variant="caption">Everything you can get in {restaurant.name}</Typography>
        </Grid>
      </Grid>
      {menuCategoriesList.map((category, i) =>
        <div className={mobile ? classes.expand : null} style={{marginTop: i === 0 ? 32 : 0}} key={uniqueId()}>
          {i > 0 && <Divider className={mobile ? classes.margin : null} style={{marginTop: 32, marginBottom: 32}} />}
          <Link style={{textDecoration: 'none'}} to={`/category/${category.id}`}>
            <Typography className={mobile ? classes.margin : null} gutterBottom variant="title">
              {category.name}
            </Typography>
          </Link>
          <Grid
            className={mobile ? classes.scroller : null}
            wrap={mobile ? 'nowrap' : 'wrap'}
            container
            spacing={mediumScreen ? 24 : 16}>
            {FN.MapToList(category.items).map(menuItem =>
              <Grid item xs={6} sm={4} md={6} key={uniqueId()}>
                <MenuItemCard menuItem={menuItem}/>
              </Grid>
            )}
          </Grid>
        </div>
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
