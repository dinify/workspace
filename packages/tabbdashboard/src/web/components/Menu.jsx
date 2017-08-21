// @flow
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Menu = styled.ul`
  margin-top: 80px;
`

export const MenuItem = styled.li`
  list-style: none;
  margin: 10px 0;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
  a {
    text-decoration: none;
    color: ${({active}) => active ? 'white': 'rgba(255,255,255,0.6)'};
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
`

export const MenuLink = ({ title, to, l }) => (
  <MenuItem active={l.pathname.indexOf(to) > -1}>
    <Link to={to}>
      {title}
    </Link>
  </MenuItem>
)

export const HorMenu = styled.ul`
  list-style-type: none;
`;

export const HorMenuItem = styled.li`
  list-style: none;
  display: inline-block;
  margin-right: 20px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1px;
  a {
    text-decoration: none;
    color: ${({active}) => active ? 'black': 'rgba(0,0,0,0.6)'};
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`

export const HorMenuLink = ({ title, to, l }) => (
  <HorMenuItem active={l.pathname === to}>
    <Link to={to}>
      {title}
    </Link>
  </HorMenuItem>
)
