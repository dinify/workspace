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
  <MenuItem active={l.pathname === to}>
    <Link to={to}>
      {title}
    </Link>
  </MenuItem>
)
