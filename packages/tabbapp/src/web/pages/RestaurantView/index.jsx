import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Today from 'icons/Today';
import Favorite from 'icons/Favorite';
import RestaurantMenu from 'icons/RestaurantMenu';
import AppBar from 'web/components/AppBar';
import FavoriteToggle from 'web/components/FavoriteToggle';
import Typography from 'web/components/Typography';
import Rating from 'web/components/Rating';
import OrderItemListItem from 'web/components/OrderItemListItem';
import HorizontalScroller from 'web/components/HorizontalScroller';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Carousel from 'web/components/Carousel';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import * as FN from 'lib/FN';
import orderItemSample from './orderItem';
import { fetchRestaurantInit } from 'ducks/restaurant/actions';
import { fetchMenucategoriesInit } from 'ducks/menuCategory/actions';
import { getCategoriesBySubdomain } from 'ducks/menuCategory/selectors';
import { getRestaurantBySubdomain } from 'ducks/restaurant/selectors';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';

const styles = theme => ({
  category: {
    paddingTop: theme.spacing.unit
  },
  imageContainer: {
    height: 256,
    width: '100%',
    maxWidth: '100%',
    overflowX: 'auto',
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
  }
});

class RestaurantView extends React.PureComponent {
  componentWillMount() {
    const {
      fetchRestaurant,
      fetchMenucategories,
      match: { params }
    } = this.props;
    fetchRestaurant({ subdomain: params.subdomain });
    fetchMenucategories({ subdomain: params.subdomain });
  }
  render() {
    const {
      width,
      classes,
      restaurant,
      menuCategoriesList
    } = this.props;
    if (!restaurant) {
      return <div />
    }
    const images = FN.MapToList(restaurant.images);
    const allTags = FN.MapToList(restaurant.tags);
    const tags = [];
    allTags.forEach(tag => {
      if (tags.join().length + tag.name.length <= 50) {
        tags.push(tag.name.split('_').join(' '))
      }
    });

    const extraSmallScreen = isWidthDown('xs', width);
    const smallScreen = isWidthDown('sm', width);
    const mediumScreen = isWidthUp('md', width);

    const sm = isWidthDown('sm', width);
    const md = !sm && isWidthDown('md', width);
    const lg = !md && isWidthDown('lg', width);

    return (
      <div>
        <AppBar position="static"/>
        {extraSmallScreen &&
          <Carousel images={images.map(image => image.url)}/>
        }
        {!extraSmallScreen &&
          <Grid container wrap="nowrap" spacing={8} className={classes.imageContainer}>
            {images.map((image, i) =>
              <Grid item key={i} style={{minWidth: sm ? '50%' : (md ? '33.3333%' : (lg ? '25%' : '20%'))}} xs={12}>
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
              <Grid container spacing={mediumScreen ? 24 : 16}>
                <Grid item style={{flex: 1}}>
                  {tags && (
                    <Typography
                      gutterBottom
                      variant="overline"
                      color="primary">
                      {tags.join(' · ')}
                    </Typography>
                  )}
                  <Typography gutterBottom variant="title">{restaurant.name}</Typography>
                  <Grid container spacing={8} alignItems="center">
                    <Grid item>
                      <Rating size={16} stars={5} rating={restaurant.rating}/>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {`${restaurant.rating} (${restaurant.rating_count})`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <FavoriteToggle />
                </Grid>
              </Grid>

              <Typography style={{marginTop: 8}} gutterBottom variant="subheading">{restaurant.description}</Typography>
              <Typography
                className={classes.secondary}
                style={{ paddingTop: mediumScreen ? 24 : 16 }}
                gutterBottom
                variant="overline">
                About
              </Typography>
              <Typography gutterBottom variant="body1">{restaurant.about}</Typography>
              <Divider style={{marginTop: 16, marginBottom: 16}} />
              <Grid container wrap="nowrap" style={{marginBottom: 8}} alignItems="center" spacing={16}>
                <Grid item>
                  <Today className={classes.secondary} />
                </Grid>
                <Grid item>
                  <Typography variant="subheading">Recent orders</Typography>
                  <Typography variant="caption">See what people are eating in {restaurant.name} at the moment</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={mediumScreen ? 24 : 16}>
                <Grid item xs={6} sm={4} md={6}>
                  <OrderItemListItem orderItem={orderItemSample[0]}/>
                </Grid>
              </Grid>

              <Divider style={{marginTop: 16, marginBottom: 16}} />
              <Grid container wrap="nowrap" style={{marginBottom: 8}} alignItems="center" spacing={16}>
                <Grid item>
                  <Favorite className={classes.secondary} />
                </Grid>
                <Grid item>
                  <Typography variant="subheading">Favorited</Typography>
                  <Typography variant="caption">Your top picks in {restaurant.name}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={mediumScreen ? 24 : 16}>
                <Grid item xs={6} sm={4} md={6}>
                  <OrderItemListItem orderItem={orderItemSample[1]}/>
                </Grid>
              </Grid>

              <Divider style={{marginTop: 16, marginBottom: 16}} />
              <Grid container wrap="nowrap" style={{marginBottom: 8}} alignItems="center" spacing={16}>
                <Grid item>
                  <RestaurantMenu className={classes.secondary} />
                </Grid>
                <Grid item>
                  <Typography variant="subheading">Menu Categories</Typography>
                  <Typography variant="caption">Everything you can get in {restaurant.name}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={mediumScreen ? 24 : 16}>
                <Grid item xs={12} sm={12} md={12}>

                  <HorizontalScroller height={100}>

                    {menuCategoriesList.map((category, i) =>
                      <Link to={`/category/${category.id}`} key={i}>
                        <img
                          src="https://images.unsplash.com/24/SAM_0551.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=160&h=100&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cb5ed1a3fb606612dc325ecee33d4950"
                        />
                      </Link>
                    )}

                  </HorizontalScroller>

                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} md={6}>
              {smallScreen && <Divider/>}
              <Typography
                style={{ paddingTop: mediumScreen ? 24 : 16 }}
                variant="subheading"
                align="center"
                gutterBottom>
                Snatch a table
              </Typography>
              <Grid container justify="center">
                <Grid item>
                  {smallScreen && <div>
                    <BookingForm classes={classes} />
                  </div>}
                  {!smallScreen && <Card>
                    <CardContent>
                      <BookingForm classes={classes} />
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">Book</Button>
                    </CardActions>
                  </Card>}
                  <div style={{flex: 1}}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ResponsiveContainer>
      </div>
    );
  }
}

RestaurantView = connect(
  (state, { match }) => ({
    restaurant: getRestaurantBySubdomain(state, match.params.subdomain),
    menuCategoriesList: getCategoriesBySubdomain(state, match.params.subdomain)
  }),
  {
    fetchMenucategories: fetchMenucategoriesInit,
    fetchRestaurant: fetchRestaurantInit,
  }
)(RestaurantView)

export default withStyles(styles)(withWidth()(RestaurantView));
