// @flow
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { Head, Body, Label } from './styled/Modal'
import { colorsByStages as c } from '../colors'
import Slider from 'rc-slider/lib/Slider'
import { setTimer } from '../../ducks/restaurant';

import 'rc-slider/assets/index.css'

const trackStyle = (color) => ({
  background: color,

})

const sliderStyle = {
  margin: '10px 20px 30px 20px',
  width: 'calc(100% - 40px)'
}

const handleStyle = (color) => ({
  background: color,
  borderColor: color,
})

const getMinsAndSecs = (s) => {
  const mins = moment.duration(s, 's').minutes()
  const secs = moment.duration(s, 's').seconds()
  return `${mins}m ${secs}s`
}

class ModalTimerSetting extends React.Component {

  onChange(key, val) {
    const { setTimer } = this.props;
    console.log(val)
    setTimer({ key, val })
  }

  afterChange(val) {
    console.log(val)
  }

  render(){
    const { timer } = this.props;

    return (
    	<div>
        <Head>
          Timer setting
        </Head>
        <Body>
          <Label color={c['oh']}>
            <span>Order ahead</span>
            <span> [{getMinsAndSecs(timer.oh)}]</span>
          </Label>
          <Slider
            trackStyle={trackStyle(c['oh'])}
            handleStyle={handleStyle(c['oh'])}
            defaultValue={timer.oh}
            min={10}
            max={60}
            onChange={(val) => this.onChange('oh', val)}
            onAfterChange={(val) => this.afterChange('oh', val)}
            style={sliderStyle}
          />
          <Label color={c['s2']}>
            <span>Order</span>
            <span> [{getMinsAndSecs(timer.o)}]</span>
          </Label>
          <Slider
            trackStyle={trackStyle(c['s2'])}
            handleStyle={handleStyle(c['s2'])}
            defaultValue={timer.o}
            min={10}
            max={60}
            onChange={(val) => this.onChange('o', val)}
            onAfterChange={(val) => this.afterChange('o', val)}
            style={sliderStyle}
          />
          <Label color={c['s4']}>
            <span>Service call</span>
            <span> [{getMinsAndSecs(timer.sc)}]</span>
          </Label>
          <Slider
            trackStyle={trackStyle(c['s4'])}
            handleStyle={handleStyle(c['s4'])}
            defaultValue={timer.sc}
            min={10}
            max={60}
            onChange={(val) => this.onChange('sc', val)}
            onAfterChange={(val) => this.afterChange('sc', val)}
            style={sliderStyle}
          />
          <Label color={c['s5']}>
            <span>Payment</span>
            <span> [{getMinsAndSecs(timer.p)}]</span>
          </Label>
          <Slider
            trackStyle={trackStyle(c['s5'])}
            handleStyle={handleStyle(c['s5'])}
            defaultValue={timer.p}
            min={10}
            max={60}
            onChange={(val) => this.onChange('p', val)}
            onAfterChange={(val) => this.afterChange('p', val)}
            style={sliderStyle}
          />
        </Body>
      </div>
    )
  }
}

export default connect(
  state => ({
    timer: state.restaurant.timer
  }),
  {
    setTimer
  }
)(ModalTimerSetting);
