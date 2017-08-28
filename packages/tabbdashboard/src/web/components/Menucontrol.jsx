// @flow
import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';
import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit, FieldWrapper, Label } from './styled/FormBox';
import { Form, Text, Select } from 'react-form';

import {
  getCategoriesInitAction,
  rmCategoryInitAction,
  addCategoryInitAction,
} from '../../ducks/restaurant'

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

const CategoriesList = styled.ul`
  list-style: none;
  margin: 10px;
  width: 250px;
  width: 280px;
`

const CategoryItem = styled.li`
  position: relative;
  background: black;
  color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 300;
  background-color: rgb(43, 55, 72);
  font-size: 12px;
  &:hover {
    i {
      color: white;
    }
  }
`

const RemoveButton = styled.button`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.3);
  font-size: 16px;
  padding: 0 10px;
  cursor: pointer;
  i {
    transition: all 125ms ease-in-out;
  }
`

class Menucontrol extends React.Component {
  componentDidMount() {
    const { loggedRestaurant, getCategories } = this.props;
    getCategories();
  }
  render() {
    const { loggedRestaurant, categories, rmCategory, addCategory } = this.props;
    return (
      <div>
        <Header>
          Menu Control
        </Header>

        <FormBox>
          <FormBoxHead>Create a new category</FormBoxHead>
          <FormBoxBody>

            <Form
              onSubmit={({ categoryName }) => {
                console.log('Success!', { categoryName });
                addCategory({ categoryName });
              }}
              validate={({ categoryName }) => {
                return {
                  categoryName: !categoryName ? 'Category Name is required' : undefined,
                }
              }}
            >
              {({submitForm}) => {
                return (
                  <form onSubmit={submitForm}>
                    <Text field='categoryName' placeholder='Name of category' />
                    <FormBoxSubmit>ADD</FormBoxSubmit>
                  </form>
                )
              }}
            </Form>

          </FormBoxBody>
        </FormBox>

        <CategoriesList>
          {categories.sort((a,b) => a.id - b.id).map((c) =>
            <CategoryItem>
              <span>{c.name}</span>
              <RemoveButton onClick={() => rmCategory({categoryId: c.id})}>
                <i className="ion-ios-trash" />
              </RemoveButton>
            </CategoryItem>
          )}
        </CategoriesList>

      </div>);
    }
  }

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    categories: state.restaurant.categories,
  }),
  {
    getCategories: getCategoriesInitAction,
    rmCategory: rmCategoryInitAction,
    addCategory: addCategoryInitAction,
  },
)(Menucontrol);
