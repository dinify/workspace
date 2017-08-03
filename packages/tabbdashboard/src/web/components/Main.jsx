// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from './FormBox';

import Input from 'react-enhanced-form'

const Sidebar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 240px;
  display: flex;
  align-items: top;
  justify-content: center;
`;

const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  line-height: 60px;
  width: 240px;
  text-align: center;
  background: rgba(0,0,0,0.15);
  img {
    width: 40px;
    vertical-align: middle;
    margin-right: 10px;
  }
  span {
    font-size: 30px;
    font-weight: 100;
    vertical-align: middle;
  }
`;

const Content = styled.div`
  position: absolute;
  left: 240px;
  top: 0;
  height: 100vh;
  width: calc(100% - 240px);
  background: #EFF3F6;
  color: #354052;
  padding: 70px 20px 0 20px;
`;

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

type LoginProps = {
  lastError: Error,
};

const Main = ({ lastError }: LoginProps) =>
  (<div>
      <Header>
        Home
      </Header>

      <FormBox>
        <FormBoxHead>Category</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Restaurant" type="text" />
        </FormBoxBody>
    	</FormBox>

    	<FormBox>
        <FormBoxHead>Restaurant Name</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Enter name here" type="text" />
        </FormBoxBody>
    	</FormBox>

      <FormBox>
        <FormBoxHead>Main Image</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Enter name here" type="text" />
        </FormBoxBody>
    	</FormBox>

      <FormBox>
        <FormBoxHead>Contact Information</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Name in charge" type="text" />
          <input placeholder="Email address" type="text" />
          <input placeholder="Mobile number" type="text" />
        </FormBoxBody>
    	</FormBox>

      <FormBox>
        <FormBoxHead>Social Media</FormBoxHead>
        <FormBoxBody>
          <input placeholder="https://www.facebook.com" type="text" />
          <input placeholder="https://www.instagram.com" type="text" />
        </FormBoxBody>
    	</FormBox>


      <FormBox>
        <FormBoxHead>Location</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Longitude" type="text" />
          <input placeholder="Latitude" type="text" />
        </FormBoxBody>
    	</FormBox>


      <FormBox>
        <FormBoxHead>Business Hours</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Weekday" type="text" />
          <input placeholder="Weekend" type="text" />
        </FormBoxBody>
    	</FormBox>

      <FormBox>
        <FormBoxHead>Banking Information</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Bank name" type="text" />
          <input placeholder="Enter beneficiary name" type="text" />
          <input placeholder="Enter IBAN number" type="text" />
        </FormBoxBody>
    	</FormBox>

      <FormBox>
        <FormBoxHead>Options</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Enter option category" type="text" />
        </FormBoxBody>
    	</FormBox>

      <FormBox>
        <FormBoxHead>Add-Ons</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Enter add-on item name" type="text" />
          <input placeholder="Price" type="text" />
        </FormBoxBody>
    	</FormBox>

      <FormBox>
        <FormBoxHead>Set Tablet(s)</FormBoxHead>
        <FormBoxBody>
          <input placeholder="Tablet ID" type="text" />
          <input placeholder="Password" type="text" />
          <FormBoxSubmit>SAVE</FormBoxSubmit>
        </FormBoxBody>
    	</FormBox>

  </div>);

export default connect(
  state => ({}),
  {},
)(Main);
