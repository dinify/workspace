// @flow
import React from 'react'
import moment from 'moment';

const secondsAgo = (utcTime) => {
  const duration = moment.duration(moment().diff(moment.utc(utcTime).local()));
  const h = duration.hours();
  const m = duration.minutes();
  const s = duration.seconds();
  let str = `${s}s ago`;
  if (m > 0) str = `${m}min ${str}`;
  if (h > 0) str = `${h}h ${str}`;
  return str;
}

class Elapsed extends React.Component{
  constructor(props){
    super(props);
    const { startAt } = props;
    this.state = {
      updatedAt: secondsAgo(startAt)
    }
  }
  componentDidMount() {
    this.interval = setInterval(this.updateReminderTime.bind(this), 1000);
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  updateReminderTime() {
    const { startAt } = this.props;
    this.setState({ updatedAt: secondsAgo(startAt) })
  }
  render() {
    return (
      <span>
       {this.state.updatedAt}
      </span>
    );
  }
}

export default Elapsed;
