// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button';
import Select from '../../MaterialInputs/Select';

import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  Label,
  ThinButton
} from '../../styled/FormBox'
import {
  updateHoursInitAction,
  addDayToBusinessHours,
  addRangeToBusinessHours
} from '../../../../ducks/restaurantLegacy'
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
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item xs={6} className="center">
          <Field name="dayName" component={Select} className="FormInput" options={selectFrom} componentProps={{
            fullWidth: true
          }} />
        </Grid>
        <Grid item xs={6} className="center">
          <Button type="submit" className="FormInput" fullWidth={true} style={{float: 'right'}}>Add Day</Button>
        </Grid>
      </Grid>
    </form>
  )
}
AddDayForm = reduxForm({
  form: 'settings/businessHoursAddDay'
})(AddDayForm)

const TimeField = (props) => {
  const { value, onChange } = props.input
  return (
    <TextField
      id="time"
      type="time"
      value={value}
      label={props.label}
      onChange={(newTime) => {
        onChange(newTime)
      }}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
      margin="normal"
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

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item xs={6} className="center">
              <Field name={`${day}_${i}_from`} component={TimeField} label='From'/>
            </Grid>
            <Grid item xs={6} className="center">
              <Field name={`${day}_${i}_to`} component={TimeField} label='To'/>
            </Grid>
          </Grid>

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
      <Button type="submit" fullWidth={true}>SAVE</Button>
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
    let newObj = []
    definedDays.map((day, j) => {
      openHours[day].forEach((range, i) => {
        newObj.push({
          weekday: j,
          from: updObj[`${day}_${i}_from`],
          to: updObj[`${day}_${i}_to`]
        })
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
