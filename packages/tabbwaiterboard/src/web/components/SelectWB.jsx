// @flow
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FormBox, FormBoxHead, FormBoxBody, FormBoxChoice } from './styled/FormBox'
import { Link } from 'react-router-dom'
import { setWBidAction } from '../../ducks/restaurant';

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
        alt='TABB'
        src={require('./logo.svg')}
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
          {R.values(logged.waiterboards).map((wb, i) =>
            <Link to={`/board/${R.keys(logged.waiterboards)[i]}`} onClick={() => setWBid(R.keys(logged.waiterboards)[i])} key={i}>
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
