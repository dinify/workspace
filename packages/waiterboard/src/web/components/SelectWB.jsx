// @flow
import React from 'react'
import values from 'ramda/src/values'
import keys from 'ramda/src/keys'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { setWBidAction } from 'ducks/restaurant/actions';
import { FormBox, FormBoxHead, FormBoxBody, FormBoxChoice } from './styled/FormBox'

const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SelectWB = ({ lastError, logged, setWBid }) =>
  (<Content>
      <img
        alt="TABB"
        src="http://images.tabb.global/brand/logo.svg"
        style={{
          marginTop: '-50px',
          marginBottom: '40px',
          width: '70px'
        }}
        className="vhs-blur"
      />
      <FormBox className="vhs-pop">
        <FormBoxHead>
          Select waiterboard
        </FormBoxHead>
        <FormBoxBody className="modry">
          {values(logged.waiterboards).map((wb, i) =>
            <Link to={`/board/${keys(logged.waiterboards)[i]}`} onClick={() => setWBid(keys(logged.waiterboards)[i])} key={i}>
              <FormBoxChoice>
                {wb.name}
              </FormBoxChoice>
            </Link>
          )}
        </FormBoxBody>
      </FormBox>
  </Content>);

export default connect(
  state => ({
    logged: state.restaurant.loggedUser
  }),
  {
    setWBid: setWBidAction
  },
)(SelectWB);
