import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import AppBar from 'web/components/AppBar';
import FavoriteToggle from 'web/components/FavoriteToggle';
import Typography from 'web/components/Typography';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Carousel from 'web/components/Carousel';
import * as FN from 'lib/FN';
import uniqueId from 'lodash.uniqueid';
import menuItemSample from './menuItem.js';
import Customizations from './Customizations';
import NutritionFacts from './NutritionFacts';

const styles = theme => ({
  category: {
    paddingTop: theme.spacing.unit
  },
  imageContainer: {
    height: 256,
    width: '100%',
    maxWidth: '100%',
    overflowX: 'scroll',
    overflowY: 'hidden'
  },
  image: {
    borderRadius: 4,
    boxShadow: theme.shadows[2],
  },
  imageSrc: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  secondary: {
    color: theme.palette.text.secondary
  },
});

class MenuItemView extends React.PureComponent {
  render() {
    const {
      width,
      classes,
      menuItem
    } = this.props;
    if (!menuItem) return <div />;
    const images = FN.MapToList(menuItem.images);

    const extraSmallScreen = isWidthDown('xs', width);
    const smallScreen = isWidthDown('sm', width);
    const mediumScreen = isWidthUp('md', width);

    const sm = isWidthDown('sm', width);
    const md = !sm && isWidthDown('md', width);
    const lg = !md && isWidthDown('lg', width);

    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        {extraSmallScreen &&
          <Carousel images={images.map(image => image.url)}/>
        }
        {!extraSmallScreen &&
          <Grid container wrap="nowrap" spacing={8} className={classes.imageContainer}>
            {images.map((image, i) =>
              <Grid item key={uniqueId()} style={{minWidth: sm ? '50%' : (md ? '33.3333%' : (lg ? '25%' : '20%'))}} xs={12}>
                <div
                  className={classes.imageSrc}
                  style={{
                    borderRadius: i === 0 ? '0 0 4px 0' : (i === images.length - 1 ? '0 0 0 4px' : '0 0 4px 4px'),
                    backgroundImage: `url(${image.url})`
                  }}
                />
              </Grid>
            )}
          </Grid>
        }

        <ResponsiveContainer>
          <Grid container spacing={mediumScreen ? 24 : 16} style={{marginTop: mediumScreen ? 24 : 16}}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={0}>
                <Grid item style={{flex: 1}}>
                  <Typography variant="title">{menuItem.name}</Typography>
                  <Typography gutterBottom variant="subheading">{FN.formatPrice(menuItem.price)}</Typography>
                </Grid>
                <Grid item>
                  <FavoriteToggle
                    checked={menuItem.favorite}
                    onChange={() => {}}
                  />
                </Grid>
              </Grid>
              <Grid
                container wrap="nowrap" spacing={mediumScreen ? 24 : 16}
                style={{ paddingTop: mediumScreen ? 24 : 16 }}>
                <Grid item xs={menuItem.calories ? 6 : 12}>
                  <Typography
                    className={classes.secondary}
                    gutterBottom
                    variant="overline">
                    Description
                  </Typography>
                  <Typography variant="body1">{menuItem.description}</Typography>
                </Grid>

                <NutritionFacts calories={menuItem.calories} />

              </Grid>


            </Grid>
            <Grid item xs={12} md={6}>
              {smallScreen && <Divider/>}
              {smallScreen && <Customizations menuItem={menuItem}/>}
              {!smallScreen && <Card>
                {<Customizations menuItem={menuItem}/>}
              </Card>}
            </Grid>
          </Grid>
        </ResponsiveContainer>
      </div>
    );
  }
}

MenuItemView = connect(
  (state, { match }) => ({
    menuItem: state.menuItem.all[match.params.id]
  }),
  {

  }
)(MenuItemView)

export default withStyles(styles)(withWidth()(MenuItemView));
