// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Swipeable from 'react-swipeable'

import Header from './Header'
import FrameOfActions from './FrameOfActions'
import FrameOfTables from './FrameOfTables'
import Modal from './Modal'
import ModalUser from './ModalUser'
import ModalListOfBills from './ModalListOfBills'
import ModalListOfBookings from './ModalListOfBookings'

import { toggleFrames, toggleModal } from 'ducks/ui'
import { setOHEnabled } from 'ducks/restaurant'
import { getGroupedBills } from 'ducks/bill/selectors';
import { getTableList } from 'ducks/table/selectors';

const OneBoard = styled.div`
  position: fixed;
  top: 50px;
  width: 100%;
  height: 100%;
  left: ${props => props.n*100-100}%;
  transition: left 300ms ease-in-out;
`

const Frame = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.n*100}%;
  width: 100%;
  padding-top: 10px;
`

const Board = ({
  billsGroupedLists,
  tableList,
  frameIndex,
  modalOpen,
  modalType,
  modalPayload,
  toggleFrames,
  toggleModal
}) => {

  const closeModal = (e) => {
    if (e.target.className.indexOf('modal-area') > -1) toggleModal({ open: false });
  }

  const billsProcessed = billsGroupedLists.PROCESSED || [];
  const billsInitiated = billsGroupedLists.INITIATED || [];

  return (<div>

    <Header
      tablesCount={tableList.length}
      processedBillsCount={billsProcessed.length}
    />

    <Swipeable
      onSwipedRight={() => toggleFrames(1)}
      onSwipedLeft={() => toggleFrames(2)}
    >
      <OneBoard n={frameIndex}>
        <Frame n={0}>
          <FrameOfActions billsInitiated={billsInitiated} />
        </Frame>
        <Frame n={1}>
          <FrameOfTables tableList={tableList} toggleModal={toggleModal} />
        </Frame>
      </OneBoard>
    </Swipeable>

    <Modal shown={modalOpen} closeModal={closeModal}>
      <ModalUser shown={modalType === 'User'} payload={modalPayload} />
      <ModalListOfBills shown={modalType === 'ListOfBills'} payload={modalPayload} bills={billsProcessed} />
      <ModalListOfBookings shown={modalType === 'ListOfBookings'} payload={modalPayload} />
    </Modal>

  </div>)
}


export default connect(
  state => ({
    billsGroupedLists: getGroupedBills(state),
    tableList: getTableList(state),
    frameIndex: state.ui.frameIndex,
    modalOpen: state.ui.modalOpen,
    modalType: state.ui.modalType,
    modalPayload: state.ui.modalPayload,
  }),
  {
    toggleFrames,
    toggleModal,
    setOHEnabled
  },
)(Board);
