// @flow
import React from 'react'
import Container from './Container'
import styled from 'styled-components'
import numeral from 'numeral'
import { Link } from 'react-router-dom'

const HeaderBar = styled.header`
  color: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: right;
  background: rgba(255,255,255,0.1);
  a {
    text-decoration: none;
  }
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

const Button = styled.button`
  color: white;
  i {
    font-size: 19px;
    margin-top: 3px;
  }
  background: transparent;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 5px;
  &:hover {
    border-color: white;
  }
`;

class Header extends React.Component {
  render(){
    const { tablesCount = 0, guestsCount = 0, salesVolume = 0, children, waiterboardName, logout } = this.props;
    return (
    	<HeaderBar>
        <Container>
          {children}
          <Link to="/board/">
            <Label>Section</Label><Value>{waiterboardName}</Value>
          </Link>
          <Label>Tables</Label><Value>{tablesCount}</Value>
          <Label>Guests</Label><Value>{guestsCount}</Value>
          <Label>Sales</Label><Value>{numeral(salesVolume).format('0.000')}KD</Value>
          <Button onClick={logout} title="Logout">
            <i className="material-icons">exit_to_app</i>
          </Button>
        </Container>
    	</HeaderBar>
    )
  }
}

export default Header;
