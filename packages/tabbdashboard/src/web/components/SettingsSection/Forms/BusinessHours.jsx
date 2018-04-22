// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Text, Select } from 'react-form'
import moment from 'moment'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../../styled/FormBox'
import {
  updateHoursInitAction
} from '../../../../ducks/restaurant'
import Progress from '../../Progress'

const dayNames = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday'
}

const Day = ({
  ranges,
  day,
  updateHours
}) => {
  if (!day) return (<div />)
  return (
    <div>
      <Label>{dayNames[day]}</Label>
      {ranges.map((range, i) =>
        <div key={i}>
          <Form
            onSubmit={(hours) => {
              console.log('Success!', hours);
              updateHours(hours);
            }}
            defaultValues={{
              from: range[0],
              to: range[1]
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <Text field={`from`} placeholder='From' />
                  <span> - </span>
                  <Text field={`to`} placeholder='To' />
                </form>
              )
            }}
          </Form>
        </div>
      )}
    </div>
  );
}

const BusinessHours = ({
  updateHours,
  openHours
}) => {
  if (!openHours) return (<div />)
  return (
  <FormBox>
    <FormBoxHead>
      <span>Business Hours</span>
      <Progress type={'UPDATE_HOURS'}/>
    </FormBoxHead>
    <FormBoxBody half>
      {R.keys(openHours).map((day) =>
        <Day updateHours={updateHours} ranges={openHours[day]} day={day} key={day} />
      )}
      <FormBoxSubmit onClick={() => updateHours()}>SAVE</FormBoxSubmit>
    </FormBoxBody>
  </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateHours: updateHoursInitAction,
  },
)(BusinessHours);
