// @flow
import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';

const Header = styled.div`
  position: fixed;
  left: 240px;
  top: 0;
  height: 60px;
  width: calc(100% - 240px);
  background: #FFF;
  line-height: 60px;
  padding-left: 30px;
`;


const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  margin: 20px 0;
`;
const TableHead = styled.thead`
  background: #F2F4F7;
  border-radius: 5px 5px 0 0;
  padding: 10px;
  font-size: 14px;
  text-align: left;
`;
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0,0,0,0.07);
  }
`;
const TH = styled.th`
  border-bottom: 1px solid rgba(0,0,0,0.07);
  padding: 10px;
`;
const TD = styled.td`
  font-size: 12px;
  padding: 10px;
`;

type LoginProps = {
  lastError: Error,
};

const Billing = ({ lastError }: LoginProps) =>
  (<div>
    <Header>
      Billing
    </Header>

    <Table>
      <TableHead>
        <TableRow>
          <TH>Date/Month</TH>
          <TH>Transaction No.</TH>
          <TH>Guest ID</TH>
          <TH>Order Type</TH>
          <TH>Check-in</TH>
          <TH>Check-out</TH>
          <TH>Sales</TH>
          <TH>Payment</TH>
          <TH>Fee Transaction/Payment</TH>
          <TH>Gratitude</TH>
        </TableRow>
      </TableHead>
      <tbody>
        {R.range(0, 30).map((n) =>
          <TableRow>
            <TD>17/12</TD>
            <TD>{18394958203+n}</TD>
            <TD>Ahmad23</TD>
            <TD>Dine-in</TD>
            <TD>13:12:{n}</TD>
            <TD>13:14:{n}</TD>
            <TD>7.324KD</TD>
            <TD>CASH</TD>
            <TD>0.199KD/0.000KD</TD>
            <TD>0.079KD</TD>
          </TableRow>
        )}


      </tbody>
    </Table>

  </div>);

export default connect(
  state => ({}),
  {},
)(Billing);
