// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QRCode from 'qrcode.react'

const QRpage = styled.div`
  position:absolute;
  background: white;
  width: 100%;
  height: 100%;
  text-align: center;
`

const Qr = (location) => {
  return (<QRpage>
    <QRCode value={location.match.params.code} size={256} />
  </QRpage>)
}


export default Qr
