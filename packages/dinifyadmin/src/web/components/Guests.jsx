// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { Error } from '../../flow'

const Header = styled.div`
  position: fixed;
  left: 240px;
  top: 0;
  height: 60px;
  width: calc(100% - 240px);
  background: #FFF;
  line-height: 60px;
  padding-left: 30px;
`

type LoginProps = {
  lastError: Error,
}
const TODO = styled.div`
  text-align: center;
  padding: 20px;
  color: rgba(0,0,0,0.3)
`

const Guests = ({ lastError }: LoginProps) =>
  (<div>
    <Header>
      Guests
    </Header>
    <TODO>work in progress</TODO>
  </div>)

export default connect(
  state => ({}),
  {},
)(Guests)
