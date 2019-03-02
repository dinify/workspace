// @flow
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { clearUser } from 'ducks/table/actions'
import { getBillsOfUser, getOrdersOfUser } from 'ducks/restaurant/actions'
import numeral from 'numeral'

import Bill from './Events/Bill'
import Order from './Events/Order'

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 180px;
  padding: 30px;
`;
const Photo = styled.div`
  background-color: white;
  background-image: url(${props => props.url});
  width: 80px;
  height: 80px;
  background-size: 84px;
  border-radius: 50%;
  background-position: center;
  display: inline-block;
`;

const SmallTable = styled.table`
  width: width;
  border-spacing: 0;
  display: inline-block;
  margin: 0 0 0 30px;
`;
const TdLabel = styled.td`
  color: #999;
  font-weight: 300;
  padding: 0 25px 5px 0;
  padding-left: left;
  font-size: 14px;
  text-align: left;
`;
const TdValue = styled.td`
  color: black;
  font-weight: 300;
  padding: 5px 0;
  font-size: 16px;
  color: #666;
  text-align: left;
`;

const Label = styled.div`
  color: blue;
  background: white;
  display: inline-block;
  font-weight: 300;
  padding: 5px 15px;
  margin: 0 5px 5px 0;
  font-size: 14px;
  text-align: center;
  border-wadius: 20px;
`;


const Body = styled.div`
  position: absolute;
  top: 230px;
  left: 0;
  width: 100%;
  height: 300px;
  padding: 0 30px;
  box-sizing: border-box;
  overflow: auto;
  .Bill, .Order {
    width: 100%
  }
`;

const CornerButton = styled.button`
  position: absolute;
  top: 30px;
  right: 20px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  border: none;
  background: rgba(0,0,0,0.1);
  font-size: 14px;
  text-transform: uppercase;
  i {
    margin-right: 10px;
    font-size: 16px;
  }
`

class ModalUser extends React.Component {


  render(){

    const { payload: { userId }, users, clearUser, getBillsOfUser, getOrdersOfUser, shown } = this.props;

    const user = users[userId]
    if (!shown) return (<div />)
    if (!user) return (<div />)

    let totalSpend = 0
    let aveTicket = 0
    let visitsCount = 0
    let favs = []

    if (user.orders === undefined) getOrdersOfUser({ userId })
    if (user.bills === undefined) getBillsOfUser({ userId })

    // TODO check-out kick him out

    return (
    	<div>
        <Header>

          <Photo url={`https://s3.eu-central-1.amazonaws.com/tabb/tabb-user-image/${userId}_PROFILE`} />
          <CornerButton onClick={() => clearUser({ userId })}>
            <i className="ion-android-exit" />
            <span>Check Out</span>
          </CornerButton>
          <SmallTable>
            <tr>
              <TdLabel>Name</TdLabel>
              <TdValue>{user  ? user.name : ''}</TdValue>
            </tr>
            <tr>
              <TdLabel>No. of visits</TdLabel>
              <TdValue>{visitsCount}</TdValue>
            </tr>
            <tr>
              <TdLabel>Ave. Ticket</TdLabel>
              <TdValue>{numeral(aveTicket).format('0.000')}KD</TdValue>
            </tr>
          </SmallTable>

          <SmallTable>
            <tr>
              <TdLabel>Reviews</TdLabel>
              <TdValue>-</TdValue>
            </tr>
            <tr>
              <TdLabel>Evaluation</TdLabel>
              <TdValue>-</TdValue>
            </tr>
            <tr>
              <TdLabel>Total Spend</TdLabel>
              <TdValue>{numeral(totalSpend).format('0.000')}KD</TdValue>
            </tr>
          </SmallTable>

          <SmallTable width="550px">
            <tr>
              <TdLabel left="80px">Favorites</TdLabel>
              <TdValue>
                {favs.map((fav, i) =>
                  <Label key={i}>{fav.count}× {fav.food}</Label>
                )}
              </TdValue>
            </tr>
          </SmallTable>

        </Header>

        <Body>
          {user.orders && user.orders.orders.length > 0 ?
            user.orders.orders.map((order, i) =>
              <Order key={i} order={order} noconfirm datetime />
            )
          : ''}
          {user.bills ?
            user.bills.map((bill, i) =>
              <Bill key={i} bill={bill} noconfirm datetime />
            )
          : ''}
        </Body>

      </div>
    )
  }
}

export default connect(
  state => ({
    users: state.user.all,
  }),
  {
    clearUser,
    getBillsOfUser,
    getOrdersOfUser
  }
)(ModalUser);
