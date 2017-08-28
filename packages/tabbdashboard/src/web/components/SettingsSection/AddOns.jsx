// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../../flow';
import { Link } from 'react-router-dom';
import { Form, Text, Number } from 'react-form';

import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';

import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from '../styled/FormBox';

import {
  updateInitAction,
  updateCategoryInitAction,
  updateSocialInitAction,
  updateContactInitAction,
} from '../../../ducks/restaurant'

type MainProps = {
  lastError: Error,
  loggedRestaurant: ?Object,
  update: typeof updateInitAction,
  updateCategory: typeof updateCategoryInitAction,
  updateSocial: typeof updateSocialInitAction,
  updateContact: typeof updateContactInitAction,
};


const TableTag = styled.table`
  width: 100%;
  border-spacing: 0;
`;
const Td = styled.td`
  color: ${props => props.color};
  font-weight: 300;
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #666;
  &:first-child {
    text-align: left;
  }
`;

const Main = ({ lastError, loggedRestaurant, update, updateCategory, updateSocial, updateContact }: MainProps) =>
(<div>
  <FormBox>
    <FormBoxHead>Add-Ons</FormBoxHead>
    <FormBoxBody>
      <TableTag>
        <tbody>
          {loggedRestaurant.addOns.map((addOn, i) =>
            <tr key={i}>
              <Td>{addOn.name}</Td>
              <Td>{addOn.price}</Td>
            </tr>
          )}
        </tbody>
      </TableTag>

      <Form
        onSubmit={(val) => {
          console.log('Success!', val);
          //update({ restaurantName });
        }}
        validate={({ name, price }) => {
          return {
            name: !name ? 'Name is required' : undefined,
            price: !price ? 'Price is required' : undefined,
          }
        }}
      >
        {({submitForm}) => {
          return (
            <form onSubmit={submitForm}>
              <Text field='name' placeholder='Add-on name' />
              <Text type="number" field='price' placeholder='Price' />
              <FormBoxSubmit>ADD</FormBoxSubmit>
            </form>
          )
        }}
      </Form>

    </FormBoxBody>
  </FormBox>
</div>);

export default connect(
state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant
}),
{
  update: updateInitAction,
  updateCategory: updateCategoryInitAction,
  updateSocial: updateSocialInitAction,
  updateContact: updateContactInitAction,
},
)(Main);
