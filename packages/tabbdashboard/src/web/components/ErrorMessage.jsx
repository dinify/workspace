// @flow
import React from 'react'
import styled from 'styled-components'

const M = styled.div`
  color: #e74c3c;
  font-size: 12px;
  text-align: left;
  margin-top: 10px;
  line-height: 22px;
`

const Message = ({
  children
}) => {
  return (
    <M>
      {children}
    </M>
  )
}

export default Message
