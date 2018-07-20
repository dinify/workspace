import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AppBar from 'web/components/AppBar';
import BillItem from 'web/components/BillItem';
import GuestList from 'web/components/GuestList';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Typography from 'web/components/Typography';
import CreditCard from 'icons/CreditCard';
import Slider from '@material-ui/lab/Slider';
import { fetchBillInit } from 'ducks/bill/actions';

import * as FN from 'lib/FN';

const styles = theme => ({

});

const billItems = [
  {
    divisor: 1,
    subtotal: {
      amount: "43.040",
      currency: "KWD"
    },
    order_item: {
      id: "1fb48b75-d427-42f5-9c71-01ac4920d1de",
      initiator: "5aeb49f56e2eeeb3531854ec",
      status: "IN_CART",
      meta: null,
      subtotal: {
        amount: "162.680",
        currency: "KWD"
      },
      locked: false,
      paid: false,
      menu_item: {
        id: "e47f1fdf-0c85-4b4e-9b1b-922d5e8750b6",
        menu_category_id: "fc76222d-3eeb-4453-b35e-850c3ff08aa8",
        published: false,
        calories: {
          fats: 2481,
          carbs: 7724,
          total: 141,
          proteins: 5323
        },
        precedence: 0,
        display: null,
        promotion: null,
        cooking_time: null,
        favorite: false,
        favorite_count: 1,
        price: {
          amount: "72.300",
          currency: "KWD"
        },
        name: "Aut sit",
        description: "Dignissimos nostrum quia dicta nostrum atque corrupti. Animi facilis neque autem. Nobis sed et vel sed.",
        images: {
          "37174c37-f725-477e-b652-dbc365a36087": {
            id: "37174c37-f725-477e-b652-dbc365a36087",
            url: "https://images.unsplash.com/photo-1451479456262-b94f205059be?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=633f5b3fbb2a2892242ffe58b2ac8ca1",
            precedence: 0,
            published: true
          },
          "e331bbb0-f9e7-454b-914a-493f2b02610a": {
            id: "e331bbb0-f9e7-454b-914a-493f2b02610a",
            url: "https://images.unsplash.com/reserve/fPuLkQNXRUKI6HQ2cMPf_IMG_4761.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cce4c376bf7cb8b8b9efdf1301f72e52",
            precedence: 0,
            published: true
          }
        }
      },
      addons: {
        "f96b8f59-819e-4980-844f-f64b4cfb90c3": {
          id: "f96b8f59-819e-4980-844f-f64b4cfb90c3",
          maximum: 30,
          name: "Qui dolores",
          price: {
            amount: "5.400",
            currency: "KWD"
          }
        },
        "039532b4-587c-46d4-a1e9-d9ff56c88067": {
          id: "039532b4-587c-46d4-a1e9-d9ff56c88067",
          maximum: 17,
          name: "Voluptate",
          price: {
            amount: "8.600",
            currency: "KWD"
          }
        }
      },
      excludes: {
        "dbe8f777-948e-46db-96a4-93819fb81b93": {
          id: "dbe8f777-948e-46db-96a4-93819fb81b93",
          excludable: true,
          name: "Soluta harum"
        }
      },
      choices: {
        "bcbe27f2-9890-4231-9b46-316b23bd175f": {
          id: "bcbe27f2-9890-4231-9b46-316b23bd175f",
          name: "Perferendis",
          difference: {
            amount: "22.970",
            currency: "KWD"
          }
        },
        "62115d09-4a4f-40eb-a8a9-ee7edb1bd7ac": {
          id: "62115d09-4a4f-40eb-a8a9-ee7edb1bd7ac",
          name: "Suscipit est",
          difference: {
            amount: "20.150",
            currency: "KWD"
          }
        },
        "86d3c8b1-d494-45a4-819c-049cbb048fab": {
          id: "86d3c8b1-d494-45a4-819c-049cbb048fab",
          name: "Iusto rerum",
          difference: {
            amount: "27.860",
            currency: "KWD"
          }
        }
      }
    }
  },
  {
    divisor: 2,
    subtotal: {
      amount: "43.040",
      currency: "KWD"
    },
    order_item: {
      id: "27825a86-1acd-49c4-bc2f-5ac3b7c3eda5",
      initiator: "5aeb49f56e2eeeb3531854ec",
      status: "IN_CART",
      meta: null,
      subtotal: {
        amount: "99.850",
        currency: "KWD"
      },
      locked: false,
      paid: false,
      menu_item: {
        id: "4419d6e4-e119-46ea-a85b-75119c4a6595",
        menu_category_id: "7efe52d9-6b73-4b74-9925-97dc9846feeb",
        published: true,
        calories: {
          fats: 3682,
          carbs: 4111,
          total: 9498,
          proteins: 7758
        },
        precedence: 0,
        display: null,
        promotion: null,
        cooking_time: null,
        favorite: false,
        favorite_count: 0,
        price: {
          amount: "38.100",
          currency: "KWD"
        },
        name: "Debitis",
        description: "Occaecati sed eum omnis debitis. Et saepe harum voluptas id dolor ad ratione. Mollitia et aliquid et ipsum accusantium inventore.",
        images: {
          "94205214-cc35-4696-a3bb-4b0773999593": {
            id: "94205214-cc35-4696-a3bb-4b0773999593",
            url: "https://images.unsplash.com/33/IR8nDBZETv6aM6HdJ7RD_IMG_5784.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=d49547d1949144f8456243e90b7b3116",
            precedence: 0,
            published: true
          }
        }
      },
      addons: [],
      excludes: {
        "3674dbb2-01d3-41d7-8568-0b4a2bb84cf5": {
          id: "3674dbb2-01d3-41d7-8568-0b4a2bb84cf5",
          excludable: true,
          name: "Omnis iusto"
        }
      },
      choices: {
        "86d3c8b1-d494-45a4-819c-049cbb048fab": {
          id: "86d3c8b1-d494-45a4-819c-049cbb048fab",
          name: "Iusto rerum",
          difference: {
            amount: "27.860",
            currency: "KWD"
          }
        },
        "169f6648-c742-4302-9240-147ee8e560d7": {
          id: "169f6648-c742-4302-9240-147ee8e560d7",
          name: "Omnis dolorem",
          difference: {
            amount: "13.740",
            currency: "KWD"
          }
        },
        "62115d09-4a4f-40eb-a8a9-ee7edb1bd7ac": {
          id: "62115d09-4a4f-40eb-a8a9-ee7edb1bd7ac",
          name: "Suscipit est",
          difference: {
            amount: "20.150",
            currency: "KWD"
          }
        }
      }
    }
  }
];
const seats = [
  {
    checkin: "2018-07-19 14:53:14",
    selected: true,
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802b",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802c",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802d",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802e",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802f",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802g",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802h",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802i",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  },
  {
    checkin: "2018-07-19 14:53:14",
    occupied: true,
    user_id: "5aeb49f56e2eeeb3531854ec",
    table_id: "011ef791-b681-4f58-b4ff-3a26928840f0",
    id: "43ed3e22-3e06-46d1-bc78-36f30c16802j",
    status: "CHECKED_IN",
    bill: null,
    cart: []
  }
];

class Bill extends React.PureComponent {
  componentWillMount() {
    const {
      fetchBill
    } = this.props;
    fetchBill();
  }
  render() {
    const { classes, bill } = this.props;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    const billItems = bill.items || [];
    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        <ResponsiveContainer>
          <div style={{display: 'flex', alignItems: 'center', paddingTop: 16, marginBottom: 16}}>
            <Typography style={{flex: 1}} variant="subheading">
              My bill
            </Typography>
            <Typography variant="caption">
              {`${billItems.length > 0 ? billItems.length : 'no'} item${billItems.length !== 1 ? 's' : ''}`}
            </Typography>
          </div>
        </ResponsiveContainer>
        <GuestList seats={seats}/>
        <ResponsiveContainer>
          {billItems.map(item =>
            <BillItem key={item.order_item.id} item={item}/>
          )}
        </ResponsiveContainer>
        <Divider style={{marginTop: 16, marginBottom: 16}}/>
        <ResponsiveContainer>
          <div style={{display: 'flex'}}>
            <Typography style={{flex: 1}}>
              Sub total
            </Typography>
            <Typography>
              26.400 KD
            </Typography>
          </div>
          <div style={{display: 'flex', marginTop: 8}}>
            <Typography style={{fontWeight: 700, marginRight: 8}}>
              10%
            </Typography>
            <Typography style={{flex: 1}}>
              Gratitude
            </Typography>
            <Typography>
              2.640 KD
            </Typography>
          </div>
          <Slider style={{marginTop: 8, marginBottom: 8}} value={10} min={0} max={50} step={1} onChange={() => {}} />
          <div style={{display: 'flex'}}>
            <Typography style={{flex: 1}}>
              Total
            </Typography>
            <Typography>
              29.040 KD
            </Typography>
          </div>
        </ResponsiveContainer>
        <div style={{
          display: 'flex',
          width: '100%',
          marginTop: 16,
          marginBottom: 16,
          justifyContent: 'center',
        }}>
          <Button  color="primary" variant="extendedFab" aria-label="Pay">
            <CreditCard style={{marginRight: 16}} className={classes.extendedIcon} />
            Pay my bill
          </Button>
        </div>
      </div>
    )
  }
}

Bill = connect(
  state => ({
    bill: state.bill.bill
  }),
  {
    fetchBill: fetchBillInit
  }
)(Bill)

export default withStyles(styles)(Bill);
