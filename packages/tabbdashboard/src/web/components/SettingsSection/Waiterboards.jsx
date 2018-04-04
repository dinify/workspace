// @flow
import React from 'react';
import R from 'ramda';
import {
  connect
} from 'react-redux';
import styled from 'styled-components';
import type {
  Error
} from '../../../flow';
import {
  Link
} from 'react-router-dom';
import {
  Form,
  Text
} from 'react-form';
import QRCode from 'qrcode.react'
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import {
  HorizontalLine
} from '../styled/HorizontalLine'
import numeral from 'numeral'

import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../styled/FormBox';

import {
  createWaiterboardInitAction,
  addTablesToWBInitAction,
  addTableToWBInitAction,
  deleteTableInitAction,
  deleteWBInitAction
} from '../../../ducks/restaurant'

const Tablet = styled.div `
  position: relative;
  margin: 10px;
  background: black;
  width: 200px;
  height: 140px;
  line-height: 30px;
  text-align: center;
  color: white;
  border-radius: 5px;
  display: inline-block;
`

const Desk = styled.div `
  position: relative;
  margin: 20px;
  background: white;
  width: 200px;
  height: 220px;
  line-height: 30px;
  text-align: center;
  color: black;
  border-radius: 5px;
  display: inline-block;
`

const DeleteDesk = styled.button `
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
`

const DeleteWB = styled.button `
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: white;
`

const TabletCred = styled.div `
  font-weight: 200;
  i {
    font-weight: 500;
    font-size: 20px;
    vertical-align: middle;
    margin-right: 6px;
  }
  span {
    vertical-align: middle;
  }
`

const Waiterboards = ({
    lastError,
    loggedRestaurant,
    createWaiterboard,
    addTabletDone,
    addTablesToWB,
    addTableToWB,
    deleteTable,
    deleteWB
  }) =>
  (<div>
  Waiterboards
  {R.toPairs(loggedRestaurant.waiterboards).map((wb) =>
    <div key={wb[0]}>
      <h2>{wb[1].name}</h2>
      {R.toPairs(wb[1].tables).map((tableKV) =>
        <div key={tableKV[0]}>
          <div>{tableKV[1].code}</div>
          {tableKV[0]}
          <button onClick={() => deleteTable()}>Delete</button>
        </div>
      )}
    </div>
  )}
</div>);

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    addTabletDone: state.restaurant.addTabletDone
  }), {
    createWaiterboard: createWaiterboardInitAction,
    addTablesToWB: addTablesToWBInitAction,
    addTableToWB: addTableToWBInitAction,
    deleteTable: deleteTableInitAction,
    deleteWB: deleteWBInitAction,
  },
)(Waiterboards);
