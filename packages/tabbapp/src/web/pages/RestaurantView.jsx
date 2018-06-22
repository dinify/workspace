import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import BasePicker from 'material-ui-pickers/_shared/BasePicker';
import Calendar from 'material-ui-pickers/DatePicker/Calendar';
import ChevronRight from 'icons/ChevronRight';
import ChevronLeft from 'icons/ChevronLeft';
import Today from 'icons/Today';
import Favorite from 'icons/Favorite';
import RestaurantMenu from 'icons/RestaurantMenu';
import FavoriteToggle from 'web/components/FavoriteToggle';
import Typography from 'web/components/Typography';
import Rating from 'web/components/Rating';
import OrderItemListItem from 'web/components/OrderItemListItem';
import ValuePicker from 'web/components/ValuePicker';
import HorizontalScroller from 'web/components/HorizontalScroller';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Carousel from 'web/components/Carousel';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import addDays from 'date-fns/addDays'
import * as FN from 'lib/FN';
import orderItemSample from './orderItem';
import styled from 'styled-components';
import { fetchMenucategoriesInit } from 'ducks/menuCategory/actions';
import { getCategoriesOfRestaurant } from 'ducks/menuCategory/selectors';

const styles = theme => ({
  category: {
    paddingTop: theme.spacing.unit
  },
  imageContainer: {
    backgroundColor: theme.palette.text.primary,
    height: 256,
  },
  image: {
    borderRadius: 4,
    boxShadow: theme.shadows[2],
  },
  secondary: {
    color: theme.palette.text.secondary
  }
});

const CategoryImage = styled.div`
  background-image: url(${props => props.src});
  border-radius: 4px;
  background-size: cover;
  width: 128px;
`

let RestaurantView = ({
  width,
  classes,
  restaurantsMap,
  params,
  fetchMenucategories,
  menuCategoriesList
}) => {
  let restaurant = null
  if (params.id) {
    restaurant = restaurantsMap[params.id];
    if (menuCategoriesList.length < 1) fetchMenucategories({ restaurantId: params.id });
  }
  if (!restaurant) return <div />;

  // Temporary variables
  const selectedDate = new Date()
  const handleDateChange = () => {}

  const smallScreen = isWidthDown('sm', width);
  const mediumScreen = isWidthUp('md', width);

  const bookingForm = (
    <div>
      <Typography variant="caption">Date</Typography>
      <BasePicker value={selectedDate} onChange={handleDateChange}>
      {
        ({
          date,
          handleAccept,
          handleChange,
          handleClear,
          handleDismiss,
          handleSetTodayDate,
          handleTextFieldChange,
          pick12hOr24hFormat,
        }) => (
          <div className="picker">
            <Calendar
              disablePast
              maxDate={addDays(selectedDate, 60)}
              leftArrowIcon={<ChevronLeft/>}
              rightArrowIcon={<ChevronRight/>}
              date={date}
              onChange={handleChange} />
          </div>
        )
      }
      </BasePicker>
      <Typography variant="caption">Guests</Typography>
      <ValuePicker selected={1} options={['1', '2', '3', '4', '5', '6', '7+']}/>
      <FormControl style={{marginTop: 16}} fullWidth className={classes.formControl}>
        <InputLabel htmlFor="time-input-booking">Time</InputLabel>
        <Select
          native
          value={3}
          onChange={() => {}}
          inputProps={{
            name: 'time',
            id: 'time-input-booking',
          }}
        >
          <option value="" />
          <option value={0}>6:30 PM</option>
          <option value={1}>6:45 PM</option>
          <option value={2}>7:00 PM</option>
          <option value={3}>7:15 PM</option>
          <option value={4}>7:30 PM</option>
          <option value={5}>7:45 PM</option>
          <option value={6}>8:00 PM</option>
          <option value={7}>8:15 PM</option>
          <option value={8}>8:30 PM</option>
        </Select>
      </FormControl>
    </div>
  )

  return (
    <div>
      <HorizontalScroller className={classes.imageContainer} padding={mediumScreen ? 24 : 16}>
        {FN.MapToList(restaurant.images).map(image =>
          <img className={classes.image} alt={restaurant.name} src={image.url}/>
        )}
      </HorizontalScroller>

      <ResponsiveContainer>
        <Grid container spacing={mediumScreen ? 24 : 16}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={mediumScreen ? 24 : 16}>
              <Grid item style={{flex: 1}}>
                {restaurant.tags && (
                  <Typography
                    gutterBottom
                    variant="overline"
                    color="primary">
                    {restaurant.tags.join(' · ')}
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

                <HorizontalScroller>

                  {menuCategoriesList.map((category) =>
                    <CategoryImage
                      src="https://images.unsplash.com/24/SAM_0551.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cb5ed1a3fb606612dc325ecee33d4950"
                    />
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
                  {bookingForm}
                </div>}
                {!smallScreen && <Card>
                  <CardContent>
                    {bookingForm}
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
};

RestaurantView = connect(
  (state, ownProps) => ({
    restaurantsMap: state.restaurant.all,
    menuCategoriesList: getCategoriesOfRestaurant(state, ownProps)
  }),
  {
    fetchMenucategories: fetchMenucategoriesInit
  }
)(RestaurantView)

export default withStyles(styles)(withWidth()(RestaurantView));
