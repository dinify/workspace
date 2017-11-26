// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../../flow';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';
import QRCode from 'qrcode.react'
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { HorizontalLine } from '../styled/HorizontalLine'
import numeral from 'numeral'

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit, Label } from '../styled/FormBox';

import {
  createWaiterboardInitAction,
  addTablesToWBInitAction,
  addTableToWBInitAction,
  deleteTableInitAction
} from '../../../ducks/restaurant'

type MainProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  addTablet: Any,
};

const Tablet = styled.div`
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

const Desk = styled.div`
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

const DeleteDesk = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
`

const TabletCred = styled.div`
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

const Main = ({ lastError, loggedRestaurant, createWaiterboard, addTabletDone, addTablesToWB, addTableToWB, deleteTable }: MainProps) =>
(<div>
  <div style={{marginLeft: '10px'}}>
    {addTabletDone === 'adding' ? 'Adding...' : ''}
    {addTabletDone === 'done' ? 'Tablet added' : ''}
  </div>
  {loggedRestaurant.tablets.map((tablet,i) =>
    <Tablet key={i}>
      <div style={{marginBottom: '10px'}}>{tablet.name}</div>
      <TabletCred>
        <i className="ion-ios-person" />
        <span>{tablet.login_id}</span>
      </TabletCred>
      <TabletCred>
        <i className="ion-key" />
        <span>********</span>
      </TabletCred>
    </Tablet>
  )}
  <FormBox>
    <FormBoxHead>Register New Tablet</FormBoxHead>
    <FormBoxBody>
      <Form
        onSubmit={(wb) => {
          console.log('Success!', wb);
          createWaiterboard(wb)
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='name' placeholder='Waiterboard Name' />
              <Text field='login' placeholder='Waiterboard Login' />
              <Text field='password' placeholder='Waiterboard Password' />
              <FormBoxSubmit>CREATE</FormBoxSubmit>
            </form>
          )
        }}
      </Form>
    </FormBoxBody>
  </FormBox>
  {loggedRestaurant.tablets.sort((a,b) => a.id - b.id).map((tablet,i) =>
    <div>
      <Label>
        {tablet.name}
      </Label>
      {tablet.tables && tablet.tables.length > 0 ?
        <span>
          {tablet.tables.sort((a,b) => a.position - b.position).map((table,j) =>
            table.position > 0 ?
              <Desk key={j}>
                <DeleteDesk onClick={() => deleteTable({ id: table.id })}>
                  <i className="ion-ios-close-outline" />
                </DeleteDesk>
                <Link to={`/qr/${numeral(loggedRestaurant.id).format('0000')}-${table.position < 10 ? '0'+table.position : table.position}`}>
                  <div style={{marginBottom: '10px'}}>Table {table.position}</div>
                </Link>
                <QRCode value={`${numeral(loggedRestaurant.id).format('0000')}-${table.position < 10 ? '0'+table.position : table.position}`} />
                <div>{`${numeral(loggedRestaurant.id).format('0000')}-${table.position < 10 ? '0'+table.position : table.position}`}</div>
              </Desk>
            : ''
          )}
          <FormBox>
            <FormBoxHead>Add table</FormBoxHead>
            <FormBoxBody>
              <Form
                onSubmit={({ position }) => {
                  addTableToWB({ position, waiterboardId: tablet.id })
                }}
              >
                {({submitForm}) => {
                  return (
                    <form onSubmit={submitForm}>
                      <Text type="number" field='position' placeholder='Position' />
                      <FormBoxSubmit>ADD</FormBoxSubmit>
                    </form>
                  )
                }}
              </Form>
            </FormBoxBody>
          </FormBox>
        </span>
      :
      <FormBox>
        <FormBoxHead>Add tables in range</FormBoxHead>
        <FormBoxBody half>
          <Form
            onSubmit={({from, to}) => {
              addTablesToWB({from, to, waiterboardId: tablet.id})
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <Text type="number" field='from' placeholder='From' />
                  <span> - </span>
                  <Text type="number" field='to' placeholder='To' />
                  <FormBoxSubmit>ADD</FormBoxSubmit>
                </form>
              )
            }}
          </Form>
        </FormBoxBody>
      </FormBox>
      }
      <HorizontalLine dark />
    </div>
  )}
</div>);


export default connect(
state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant,
  addTabletDone: state.restaurant.addTabletDone
}),
{
  createWaiterboard: createWaiterboardInitAction,
  addTablesToWB: addTablesToWBInitAction,
  addTableToWB: addTableToWBInitAction,
  deleteTable: deleteTableInitAction
},
)(Main);
