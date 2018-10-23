import React from 'react';
import { connect } from 'react-redux';
import * as FN from 'tabb-front/dist/lib/FN';
import uniqueId from 'lodash.uniqueid';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import AppBar from 'web/components/AppBar';
import Typography from 'web/components/Typography';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Carousel from 'web/components/Carousel';
import { fetchRestaurantInit } from 'ducks/restaurant/actions';
import { fetchMenucategoriesInit } from 'ducks/menuCategory/actions';
import { getRestaurantBySubdomain } from 'ducks/restaurant/selectors';
import BookingForm from './BookingForm';
import InfoSection from './InfoSection';
import MenuSection from './MenuSection';
import Nav from './Nav';
import { checkinInit } from 'ducks/restaurant/actions';

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
  primary: {
    color: theme.palette.primary.main
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class RestaurantView extends React.PureComponent {
  componentWillMount() {
    const {
      fetchRestaurant,
      fetchMenucategories,
      match: { params },
    } = this.props;
    fetchRestaurant({ subdomain: params.subdomain });
    fetchMenucategories({ subdomain: params.subdomain });
  }
  render() {
    const {
      width,
      classes,
      restaurant,
      // router,
      match: { params },
      location: { search },
      history,
      checkin,
      loggedUserId,
      checkedInRestaurant
    } = this.props;
    if (!restaurant) {
      return <div />
    }
    const subdomain = params.subdomain;
    const query = search.match(/qr=([^&]*)/);
    if (!checkedInRestaurant && query && query[1]) {
      const qr = query[1];
      if (loggedUserId) {
        checkin({ qr });
      } else history.push(`/login?qr=${qr}`);
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
              {tags && (
                <Typography
                  gutterBottom
                  variant="overline"
                  color="primary">
                  {tags.join(' · ')}
                </Typography>
              )}
              <Typography gutterBottom variant="h6">{restaurant.name}</Typography>
              <Nav restaurant={restaurant} />

              { /* <Typography style={{marginTop: 8}} gutterBottom variant="subtitle1">{restaurant.description}</Typography>
              <Typography
                className={classes.secondary}
                style={{ paddingTop: mediumScreen ? 24 : 16 }}
                gutterBottom
                variant="overline">
                About
              </Typography>
              <Typography gutterBottom >{restaurant.about}</Typography> */ }
              <Divider style={{marginTop: 16, marginBottom: 16}} />
              { /* <Grid container wrap="nowrap" style={{marginBottom: 8}} alignItems="center" spacing={16}>
                <Grid item>
                  <Today className={classes.primary} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">Recent orders</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={mediumScreen ? 24 : 16}>
                <Grid item xs={6} sm={4} md={6}>
                  <OrderItemCard orderItem={orderItemSample[0]}/>
                </Grid>
              </Grid>

              <Divider style={{marginTop: 16, marginBottom: 16}} />
              <Grid container wrap="nowrap" style={{marginBottom: 8}} spacing={16}>
                <Grid item>
                  <Favorite className={classes.primary} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">Favorited</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={mediumScreen ? 24 : 16}>
                <Grid item xs={6} sm={4} md={6}>
                  <OrderItemCard orderItem={orderItemSample[1]}/>
                </Grid>
              </Grid>

              <Divider style={{marginTop: 16, marginBottom: 16}} /> */ }

              <MenuSection restaurant={restaurant} subdomain={subdomain} />
            </Grid>
            <Grid item xs={12} md={6}>
              {smallScreen && <Divider/>}
              {smallScreen && <InfoSection restaurant={restaurant}/>}
              {!smallScreen && <Card>
                {<InfoSection restaurant={restaurant}/>}
              </Card>}
              <Typography
                style={{ paddingTop: mediumScreen ? 24 : 16 }}
                variant="subtitle1"
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
    loggedUserId: state.user.loggedUserId,
    restaurant: getRestaurantBySubdomain(state, match.params.subdomain),
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  }),
  {
    fetchMenucategories: fetchMenucategoriesInit,
    fetchRestaurant: fetchRestaurantInit,
    checkin: checkinInit,
  }
)(RestaurantView)

export default withStyles(styles)(withWidth()(RestaurantView));
