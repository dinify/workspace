// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
  day
}) => {
  if (!day) return (<div />)
  return (
    <div>
      <Label>{dayNames[day]}</Label>
      {ranges.map((range, i) =>
        <div key={i}>
          {range[0]} - {range[1]}
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
    <FormBoxHead>Business Hours</FormBoxHead>
    <FormBoxBody half>
      <form>
        {R.keys(openHours).map((day) =>
          <Day ranges={openHours[day]} day={day} key={day} />
        )}
        <FormBoxSubmit>SAVE</FormBoxSubmit>
      </form>
    </FormBoxBody>
  </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateHours: updateHoursInitAction,
  },
)(BusinessHours);
