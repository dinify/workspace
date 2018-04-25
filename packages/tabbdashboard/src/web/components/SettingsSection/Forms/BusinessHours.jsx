// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from 'moment'
import Datetime from 'react-datetime'
import TimePicker from 'material-ui/TimePicker'
import { Field, reduxForm } from 'redux-form'

import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label,
  ThinButton
} from '../../styled/FormBox'
import {
  updateHoursInitAction,
  addDayToBusinessHours,
  addRangeToBusinessHours
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

let AddDayForm = ({
  undefinedDays,
  handleSubmit
}) => {
  const selectFrom = undefinedDays.map((d) => ({
    value: d,
    label: dayNames[d]
  }))
  return (
    <form onSubmit={handleSubmit}>
      <Field name="dayName" component="select" className="FormInput">
        {selectFrom.map((o) =>
          <option value={o.value} key={o.value}>{o.label}</option>
        )}
      </Field>
      <FormBoxSubmit className="FormInput" style={{float: 'right'}}>Add Day</FormBoxSubmit>
    </form>
  )
}
AddDayForm = reduxForm({
  form: 'settings/businessHoursAddDay'
})(AddDayForm)

const TimeField = (props) => {
  const { value, onChange } = props.input
  return (
    <TimePicker
      container="inline"
      format="24hr"
      hintText={props.placeholder}
      autoOk={true}
      value={moment(value, "HH:mm").toDate()}
      onChange={(e, newTime) => {
        onChange(moment(newTime).format("HH:mm"))
      }}
    />
  )
}

const Day = ({
  ranges,
  day,
  updateHours,
  addRange
}) => {
  if (!day) return (<div />)
  return (
    <div style={{marginBottom: '35px'}}>
      <Label className="center">{dayNames[day]}</Label>
      {ranges.map((range, i) =>
        <div key={i}>
          <div className="TimeInput">
            <Field name={`${day}_${i}_from`} component={TimeField} placeholder='From'/>
          </div>
          <div className="sep"> - </div>
          <div className="TimeInput">
            <Field name={`${day}_${i}_to`} component={TimeField} placeholder='To'/>
          </div>
        </div>
      )}
      <div className="center">
        <ThinButton type="button" onClick={() => addRange({dayName: day, from: R.last(ranges)[1]})}>Add range</ThinButton>
      </div>
    </div>
  );
}

let BusinessHoursForm = props => {
  const { handleSubmit, openHours, addRange } = props
  return (
    <form onSubmit={handleSubmit}>
      {R.keys(openHours).map((day) =>
        <Day addRange={addRange} ranges={openHours[day]} day={day} key={day} />
      )}
      <FormBoxSubmit>SAVE</FormBoxSubmit>
    </form>
  )
}
BusinessHoursForm = reduxForm({
  form: 'settings/businessHours',
  enableReinitialize: true
})(BusinessHoursForm)

const BusinessHours = ({
  updateHours,
  openHours,
  addDay,
  addRange
}) => {
  if (!openHours) return (<div />)

  const definedDays = R.keys(openHours)
  const undefinedDays = R.without(definedDays, R.keys(dayNames))

  let defaultValues = {}
  definedDays.map((day) => {
    openHours[day].map((range, i) => {
      defaultValues[`${day}_${i}_from`] = range[0]
      defaultValues[`${day}_${i}_to`] =  range[1]
    })
  })

  const withNewData = (updObj) => {
    let newObj = openHours
    definedDays.map((day) => {
      openHours[day].map((range, i) => {
        newObj[day][i][0] = updObj[`${day}_${i}_from`]
        newObj[day][i][1] = updObj[`${day}_${i}_to`]
      })
    })
    return newObj
  }

  return (
    <FormBox>
      <FormBoxHead>
        <span>Business Hours</span>
        <Progress type={'UPDATE_HOURS'}/>
      </FormBoxHead>
      <FormBoxBody half>
        <BusinessHoursForm
          initialValues={defaultValues}
          openHours={openHours}
          addRange={addRange}
          onSubmit={(updObj) => {
          const sendThis = withNewData(updObj)
          updateHours(sendThis);
        }} />
        {undefinedDays.length > 0 ?
          <AddDayForm addDay={addDay} undefinedDays={undefinedDays} onSubmit={addDay} />
        : ''}
      </FormBoxBody>
    </FormBox>
  );
}

export default connect(
  state => ({}), {
    updateHours: updateHoursInitAction,
    addDay: addDayToBusinessHours,
    addRange: addRangeToBusinessHours
  },
)(BusinessHours);
