// @flow
import React from 'react'
import styled from 'styled-components';

const ModalArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(42, 44, 48, 0.7);
  z-index: 9999;
  opacity:  ${props => props.shown ? '1' : '0'};
  visibility: ${props => props.shown ? 'visible' : 'hidden'};
  transition: all 160ms ease-in-out;
  text-align: center;
`;

const ModalBox = styled.div`
  position: relative;
  top: 15%;
  margin: 0 auto;
  width: 700px;
  height: 70%;
  background: #f5f5f5;
  overflow: hidden;
  text-align: left;
`;

const Modal = ({ shown, closeModal, children }) => {
  return (
    <ModalArea shown={shown} onClick={closeModal} className="modal-area">
      <ModalBox>
        {children}
      </ModalBox>
    </ModalArea>
  )
}

export default Modal
