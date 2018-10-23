import React from 'react';
import { connect } from 'react-redux';
import Typography from 'web/components/Typography';
import BasePicker from 'material-ui-pickers/_shared/BasePicker';
import Calendar from 'material-ui-pickers/DatePicker/components/Calendar';
import ChevronRight from 'icons/ChevronRight';
import ChevronLeft from 'icons/ChevronLeft';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ValuePicker from 'web/components/ValuePicker';
import addDays from 'date-fns/addDays'
import { setGuestsInit, setTimeInit, setDateInit } from 'ducks/booking/actions';

const BookingForm = ({
  classes,
  time,
  guests,
  selectedDate,
  setTime,
  setGuests,
  setDate
}) => {
  // Temporary variables
  return (
    <div id="booking">
      <Typography variant="caption">Date</Typography>
      <BasePicker value={selectedDate} onChange={setDate}>
      {
        ({
          date,
          handleAccept,
          handleChange,
          handleClear,
          handleDismiss,
          handleSetTodayDate,
          handleTextFieldChange,
          pick12hOr24hFormat,
        }) => (
          <div className="picker">
            <Calendar
              disablePast
              maxDate={addDays(selectedDate, 60)}
              leftArrowIcon={<ChevronLeft/>}
              rightArrowIcon={<ChevronRight/>}
              date={date}
              onChange={handleChange} />
          </div>
        )
      }
      </BasePicker>
      <Typography variant="caption">Guests</Typography>
      <ValuePicker handleChange={setGuests} selected={guests} options={['1', '2', '3', '4', '5', '6', '7+']}/>
      <FormControl style={{marginTop: 16}} fullWidth className={classes.formControl}>
        <InputLabel htmlFor="time-input-booking">Time</InputLabel>
        <Select
          native
          value={time || ''}
          onChange={(event) => setTime(event.target.value)}
          inputProps={{
            name: 'time',
            id: 'time-input-booking',
          }}
        >
          <option value="" />
          <option value={0}>6:30 PM</option>
          <option value={1}>6:45 PM</option>
          <option value={2}>7:00 PM</option>
          <option value={3}>7:15 PM</option>
          <option value={4}>7:30 PM</option>
          <option value={5}>7:45 PM</option>
          <option value={6}>8:00 PM</option>
          <option value={7}>8:15 PM</option>
          <option value={8}>8:30 PM</option>
        </Select>
      </FormControl>
    </div>
  )
}

export default connect(
  (state) => ({
    time: state.booking.time,
    guests: state.booking.guests,
    selectedDate: state.booking.date
  }),
  {
    setGuests: setGuestsInit,
    setTime: setTimeInit,
    setDate: setDateInit,
  }
)(BookingForm)
