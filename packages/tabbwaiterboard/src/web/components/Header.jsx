// @flow
import React from 'react'
import Container from './Container'
import styled from 'styled-components'
import numeral from 'numeral'

const HeaderBar = styled.header`
  color: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: right;
  background: rgba(255,255,255,0.1);
`;

const Label = styled.span`
  color: rgb(180, 185, 190);
  line-height: 50px;
  text-align: center;
  margin-left: 10px;
  margin-right: 5px;
  font-size: 14px;
`;

const Value = styled.span`
  color: white;
  line-height: 50px;
  text-align: center;
  font-size: 22px;
  font-weight: 300;
  margin-right: 10px;
`;

class Header extends React.Component {
  render(){
    const { tablesCount = 0, guestsCount = 0, salesVolume = 0, children, waiterboardName } = this.props;
    return (
    	<HeaderBar>
        <Container>
          {children}
          <Label>User</Label><Value>{waiterboardName}</Value>
          <Label>Tables</Label><Value>{tablesCount}</Value>
          <Label>Guests</Label><Value>{guestsCount}</Value>
          <Label>Sales</Label><Value>{numeral(salesVolume).format('0.000')}KD</Value>
        </Container>
    	</HeaderBar>
    )
  }
}

export default Header;
