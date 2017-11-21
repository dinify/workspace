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

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit, Label } from '../styled/FormBox';

import {
  addTabletInitAction,
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

const Main = ({ lastError, loggedRestaurant, addTablet, addTabletDone }: MainProps) =>
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
        onSubmit={(tablet) => {
          console.log('Success!', tablet);
          addTablet(tablet);
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='name' placeholder='Tablet Name' />
              <Text field='login_id' placeholder='Tablet Username' />
              <Text field='pass_enc' placeholder='Tablet Password' />
              <FormBoxSubmit>ADD</FormBoxSubmit>
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
      {tablet.tables.sort((a,b) => a.position - b.position).map((table,j) =>
        table.position > 0 ?
          <Desk key={j}>
            <div style={{marginBottom: '10px'}}>{table.position}</div>
            <QRCode value={`000${loggedRestaurant.id}-${table.position < 10 ? '0'+table.position : table.position}`} />
            <div>{`000${loggedRestaurant.id}-${table.position < 10 ? '0'+table.position : table.position}`}</div>
          </Desk>
        : ''
      )}
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
  addTablet: addTabletInitAction,
},
)(Main);
