import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import Typography from '@dinify/common/dist/components/Typography';
import MenuItemCard from 'web/components/MenuItemCard';
import * as FN from '@dinify/common/dist/lib/FN';
import * as R from 'ramda';
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
  const { t } = useTranslation();
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
          <Typography variant="subtitle1">{t('menu.title')}</Typography>
          <Typography variant="caption">{t('menu.caption', { restaurant })}</Typography>
        </Grid>
      </Grid>
      {R.sort((a,b) => a.precedence - b.precedence, menuCategoriesList).map((category, i) => {
        const categoryItems = FN.MapToList(category.items);
        if (categoryItems.length === 0) return <div />;
        return (
        <div className={mobile ? classes.expand : null} style={{marginTop: i === 0 ? 32 : 0}} key={uniqueId()}>
          {i > 0 && <Divider className={mobile ? classes.margin : null} style={{marginTop: mobile ? 0 : 32, marginBottom: 32}} />}
          <Typography className={mobile ? classes.margin : null} gutterBottom variant="h6">
            {category.name}
          </Typography>
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
