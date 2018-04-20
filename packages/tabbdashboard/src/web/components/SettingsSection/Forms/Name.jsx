// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../../styled/FormBox'
import {
  updateInitAction
} from '../../../../ducks/restaurant'

const Name = ({
  updateName,
  name
}) => {
  if (!name) return (<div />)
  return (
    <FormBox>
      <FormBoxHead>Restaurant Name</FormBoxHead>
      <FormBoxBody>
        <Form
          onSubmit={(output) => {
            updateName(output);
          }}
          defaultValues={{
            name
          }}
          validate={({ name }) => {
            return {
              name: !name ? 'Restaurant Name is required' : undefined,
            }
          }}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <Text field='name' placeholder='Restaurant Name' />
                <FormBoxSubmit>SAVE</FormBoxSubmit>
              </form>
            )
          }}
        </Form>
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateName: updateInitAction
  },
)(Name);
