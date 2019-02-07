// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Menu = styled.ul`
  width: 160px;
  margin-left: 53px;
  margin-top: 80px;
  white-space: nowrap;
`;

export const MenuItem = styled.li`
  list-style: none;
  margin: 16px 0;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
  vertical-align: middle;
  white-space: nowrap;
  a {
    text-decoration: none;
    color: ${({ active }) => (active ? 'white' : 'rgba(255,255,255,0.6)')};
    transition: 140ms color ease-in-out;
    cursor: pointer;
    vertical-align: middle;
    &:hover {
      color: white;
    }
  }
  i {
    font-size: 24px;
    vertical-align: middle;
    margin-right: 10px;
    width: 26px;
    display: inline-block;
  }
`;

export const MenuLink = ({ title, to, l, icon }) => (
  <MenuItem active={l.pathname.indexOf(to) > -1}>
    <Link to={to}>
      {icon}
      {title}
    </Link>
  </MenuItem>
);

export const HorMenu = styled.ul`
  list-style-type: none;
  white-space: nowrap;
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
    color: ${({ active }) => (active ? 'black' : 'rgba(0,0,0,0.45)')};
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;

export const HorMenuLink = ({ title, to, l }) => (
  <HorMenuItem active={l.pathname === to}>
    <Link to={to}>{title}</Link>
  </HorMenuItem>
);
