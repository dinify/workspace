import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import FavoriteToggle from 'web/components/FavoriteToggle';
import Typography from '@dinify/common/dist/components/Typography';
import ResponsiveContainer from '@dinify/common/dist/components/ResponsiveContainer';
import Carousel from 'web/components/Carousel';
import Price from 'web/components/Price';
import * as FN from '@dinify/common/dist/lib/FN';
import uniqueId from 'lodash.uniqueid';
import Customizations from './Customizations';
import NutritionFacts from './NutritionFacts';
import { fetchMenuitemInit, favMenuitemInit } from 'ducks/menuItem/actions';

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
  componentWillMount() {
    const {
      fetchMenuitem,
      match: { params }
    } = this.props;
    if (!this.props.menuItem) fetchMenuitem({ id: params.id });
  }

  render() {
    const {
      width,
      classes,
      menuItem,
      favMenuitem,
    } = this.props;
    if (!menuItem) return <div />;
    const images = FN.MapToList(menuItem.images);

    const extraSmallScreen = isWidthDown('xs', width);
    const smallScreen = isWidthDown('sm', width);
    const mediumScreen = isWidthUp('md', width);

    const sm = isWidthDown('sm', width);
    const md = !sm && isWidthDown('md', width);
    const lg = !md && isWidthDown('lg', width);

    return (
      <div>
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
                  <Typography variant="h6">{menuItem.name}</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    <Price price={menuItem.price} />
                  </Typography>
                </Grid>
                <Grid item>
                  <FavoriteToggle
                    checked={menuItem.favorite}
                    onChange={() => favMenuitem({
                      fav: !menuItem.favorite,
                      id: menuItem.id
                    })}
                  />
                </Grid>
              </Grid>
              <Typography  >{menuItem.description}</Typography>
              {menuItem.calories && <div style={{marginTop: 16}}>
                <NutritionFacts calories={menuItem.calories} />
              </div>}
            </Grid>
            <Grid item xs={12} md={6}>
              {smallScreen && <Customizations menuItem={menuItem}/>}
              {!smallScreen && <Paper style={{padding: 16}}>
                {<Customizations menuItem={menuItem}/>}
              </Paper>}
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
    fetchMenuitem: fetchMenuitemInit,
    favMenuitem: favMenuitemInit
  }
)(MenuItemView)

export default withStyles(styles)(withWidth()(MenuItemView));
