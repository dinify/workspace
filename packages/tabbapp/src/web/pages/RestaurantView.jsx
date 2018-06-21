import React from 'react';
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

const RestaurantView = ({
  width,
  classes,
}) => {
  // Temporary variables
  const selectedDate = new Date()
  const handleDateChange = () => {}
  const restaurant = {
    name: 'Korea Grill Restaurant',
    tags: ['Korean', 'International'],
    images: [
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=543f159fd86d08f2a29d838002801508',
      'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a7bf37fcba247f66eda688de9e08b1a6',
      'https://images.unsplash.com/photo-1458644267420-66bc8a5f21e4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=407ebb58ce075c27c754535537e24d69',
    ],
    rating: 4.5,
    rating_count: 344,
    description: 'Warm and cozy place for those who seek a bite of the asian peninsula',
    about: "We pride ourselves on many of our customers complementing us in common that not only our food is good, but also the taste is consistent even after years. Because, that's what we try to offer to our valuable customers - the same quality food as well as hospitality all the time."
  };

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
        {restaurant.images.map(image =>
          <img className={classes.image} alt={restaurant.name} src={image}/>
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
                <OrderItemListItem orderItem={{
                  subtotal: {
                    amount: "16.300",
                    currency: "KWD"
                  },
                  menu_item: {
                    favorite: false,
                    favorite_count: 0,
                    price: {
                      amount: "87.90",
                      currency: "KWD"
                    },
                    name: "Cabbage kimchi",
                    description: "Quia reprehenderit fugiat aliquam. Architecto tenetur ut et laborum harum maiores. Veritatis explicabo necessitatibus iusto sed error commodi at. Aut numquam consequatur odit praesentium.",
                    images: {
                      "26fe5030-4638-40d4-a2de-c69a27e58406": {
                        id: "26fe5030-4638-40d4-a2de-c69a27e58406",
                        url: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=25f8eaff1b0999e2f5f6c52e3af4c9d0",
                        precedence: 0,
                        published: true
                      },
                      "974349df-5b08-4024-aacb-bc144ab86d9b": {
                        id: "974349df-5b08-4024-aacb-bc144ab86d9b",
                        url: "https://images.unsplash.com/24/SAM_0551.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cb5ed1a3fb606612dc325ecee33d4950",
                        precedence: 0,
                        published: true
                      }
                    },
                    translations: {
                      en: {
                        locale: "en",
                        name: "Quia explicabo",
                        description: "Quia reprehenderit fugiat aliquam. Architecto tenetur ut et laborum harum maiores. Veritatis explicabo necessitatibus iusto sed error commodi at. Aut numquam consequatur odit praesentium."
                      }
                    }
                  },
                  addons: {
                    "5d6865ff-faa5-4191-84e1-9ac8f8f85641": {
                      id: "5d6865ff-faa5-4191-84e1-9ac8f8f85641",
                      maximum: 3,
                      name: "Aut ipsa dicta",
                      pivot: {
                        amount: 1
                      },
                      price: {
                        amount: "4.00",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Aut ipsa dicta"
                        }
                      }
                    },
                    "649c17c5-93fd-4ac4-bc38-a18a8c03289a": {
                      id: "649c17c5-93fd-4ac4-bc38-a18a8c03289a",
                      maximum: 28,
                      name: "Consectetur",
                      pivot: {
                        amount: 1
                      },
                      price: {
                        amount: "0.40",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Consectetur"
                        }
                      }
                    },
                    "68d59d4f-46bd-4445-82f2-e59517ad09ba": {
                      id: "68d59d4f-46bd-4445-82f2-e59517ad09ba",
                      maximum: 30,
                      name: "Quis expedita",
                      pivot: {
                        amount: 1
                      },
                      price: {
                        amount: "6.80",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Quis expedita"
                        }
                      }
                    }
                  },
                  excludes: {
                    "bc350bd7-e18e-43b6-83d6-418914866638": {
                      id: "bc350bd7-e18e-43b6-83d6-418914866638",
                      excludable: false,
                      name: "Tenetur nulla",
                      pivot: {
                        order_item_id: "773486ad-1da3-4d21-81b8-921f134476fa",
                        ingredient_id: "bc350bd7-e18e-43b6-83d6-418914866638"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Tenetur nulla"
                        }
                      }
                    },
                    "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e": {
                      id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e",
                      excludable: true,
                      name: "Est recusandae",
                      pivot: {
                        order_item_id: "773486ad-1da3-4d21-81b8-921f134476fa",
                        ingredient_id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Est recusandae"
                        }
                      }
                    }
                  },
                  transfers: [],
                  owners: {
                    "01249bfd-a046-48b5-bf77-b144a15e0ed8": {
                      id: "01249bfd-a046-48b5-bf77-b144a15e0ed8",
                      user_id: "f9ea1528-fa53-4714-bd2e-e3d6f9c1ef51",
                      receipt_id: null,
                      paid: true
                    },
                    "42993401-3b88-4762-8e20-948b5bd86fb7": {
                      id: "42993401-3b88-4762-8e20-948b5bd86fb7",
                      user_id: "9cc5d5d6-d747-4528-9c1d-56d603b1cb9f",
                      receipt_id: null,
                      paid: true
                    },
                    "da79a2d2-59f4-4ea9-9541-ebd53c078c15": {
                      id: "da79a2d2-59f4-4ea9-9541-ebd53c078c15",
                      user_id: "c18f26f5-4880-4053-9695-db0b02f40a84",
                      receipt_id: null,
                      paid: true
                    },
                    "fbb69b8c-2bed-4263-81a6-78cb05166253": {
                      id: "fbb69b8c-2bed-4263-81a6-78cb05166253",
                      user_id: "686144e9-de76-4e6c-9953-4f20596947d4",
                      receipt_id: null,
                      paid: true
                    }
                  },
                  choices: {
                    "14af96bc-a601-4140-a129-b8e5c8035975": {
                      id: "14af96bc-a601-4140-a129-b8e5c8035975",
                      name: "Non earum nisi",
                      pivot: {
                        order_item_id: "773486ad-1da3-4d21-81b8-921f134476fa",
                        choice_id: "14af96bc-a601-4140-a129-b8e5c8035975"
                      },
                      difference: {
                        amount: "-2.79",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Non earum nisi"
                        }
                      }
                    }
                  }
                }}/>
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
                <OrderItemListItem orderItem={{
                  id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
                  initiator: "4597aad7-be29-46dc-a4f1-d489075d4def",
                  status: "PROCESSING",
                  meta: {
                    eta: 1020,
                    previous: "PROCESSING",
                    status_updated: "2017-11-24 08:44:18"
                  },
                  subtotal: {
                    amount: "111.700",
                    currency: "KWD"
                  },
                  locked: true,
                  paid: true,
                  menu_item: {
                    id: "4bd4c434-bf24-4bb3-9398-9c943bfea1cf",
                    menu_category_id: "08b76e42-93b0-43c8-b554-35cbfd0e142b",
                    published: true,
                    calories: {
                      fats: 1145,
                      carbs: 6412,
                      total: 3998,
                      proteins: 6804
                    },
                    precedence: 0,
                    display: null,
                    promotion: null,
                    cooking_time: null,
                    favorite: false,
                    favorite_count: 0,
                    price: {
                      amount: "104.10",
                      currency: "KWD"
                    },
                    name: "Quibusdam ullam",
                    description: "Et enim cumque quae deserunt suscipit amet maiores. Eos nihil veniam consequatur consequatur. Facere sit temporibus quo quasi.",
                    images: {
                      "ccb72380-1b91-4414-882b-36711be1a9b2": {
                        id: "ccb72380-1b91-4414-882b-36711be1a9b2",
                        url: "https://images.unsplash.com/photo-1418479631014-8cbf89db3431?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a9891a2f88b68350de704dc3416191b7",
                        precedence: 0,
                        published: true
                      }
                    },
                    translations: {
                      en: {
                        locale: "en",
                        name: "Quibusdam ullam",
                        description: "Et enim cumque quae deserunt suscipit amet maiores. Eos nihil veniam consequatur consequatur. Facere sit temporibus quo quasi."
                      }
                    }
                  },
                  addons: {
                    "258bbc75-2648-49d4-8971-db0b949c9e30": {
                      id: "258bbc75-2648-49d4-8971-db0b949c9e30",
                      maximum: 24,
                      name: "Consectetur",
                      pivot: {
                        amount: 1
                      },
                      price: {
                        amount: "1.60",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Consectetur"
                        }
                      }
                    }
                  },
                  excludes: {
                    "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e": {
                      id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e",
                      excludable: true,
                      name: "Est recusandae",
                      pivot: {
                        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
                        ingredient_id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Est recusandae"
                        }
                      }
                    }
                  },
                  transfers: [],
                  owners: {
                    "9fc6a57a-40b0-48fc-9b37-679b5cd50460": {
                      id: "9fc6a57a-40b0-48fc-9b37-679b5cd50460",
                      user_id: "d5cb9e07-43a4-4a0d-bc3f-d8f1eed15ef3",
                      receipt_id: null,
                      paid: true
                    },
                    "f7c22a9d-fa2f-41f9-bf44-c8446022995a": {
                      id: "f7c22a9d-fa2f-41f9-bf44-c8446022995a",
                      user_id: "c5ebf96c-6a25-4e08-9543-3cde7a70d0ea",
                      receipt_id: null,
                      paid: true
                    }
                  },
                  choices: {
                    "cab0906d-268e-4eae-afd5-5c4bd0b913ea": {
                      id: "cab0906d-268e-4eae-afd5-5c4bd0b913ea",
                      name: "Animi similique",
                      pivot: {
                        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
                        choice_id: "cab0906d-268e-4eae-afd5-5c4bd0b913ea"
                      },
                      difference: {
                        amount: "1.13",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Animi similique"
                        }
                      }
                    },
                    "a4091411-794d-4713-b10e-d6fe252008b9": {
                      id: "a4091411-794d-4713-b10e-d6fe252008b9",
                      name: "Et voluptatem",
                      pivot: {
                        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
                        choice_id: "a4091411-794d-4713-b10e-d6fe252008b9"
                      },
                      difference: {
                        amount: "0.09",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Et voluptatem"
                        }
                      }
                    },
                    "8b75fa95-1663-4ebd-af90-42f311bd95ec": {
                      id: "8b75fa95-1663-4ebd-af90-42f311bd95ec",
                      name: "Excepturi",
                      pivot: {
                        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
                        choice_id: "8b75fa95-1663-4ebd-af90-42f311bd95ec"
                      },
                      difference: {
                        amount: "4.78",
                        currency: "KWD"
                      },
                      translations: {
                        en: {
                          locale: "en",
                          name: "Excepturi"
                        }
                      }
                    }
                  }
                }}/>
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

export default withStyles(styles)(withWidth()(RestaurantView));
