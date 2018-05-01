// @flow
import React from 'react';
import { compose } from 'redux';
import R from 'ramda';
import * as FN from '../../../lib/FN';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode.react'
import SwitchButton from 'react-switch-button'
import 'react-switch-button/dist/react-switch-button.css'
import { HorizontalLine } from '../styled/HorizontalLine'
import numeral from 'numeral'

import FlatButton from 'material-ui/FlatButton'
import Text from '../MaterialInputs/Text'
import { Field, reduxForm } from 'redux-form'
import Progress from '../Progress'

import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../styled/FormBox';
import {
  createWaiterboardInitAction,
  deleteWaiterboardInitAction,
  createTableInitAction,
  deleteTableInitAction
} from '../../../ducks/restaurant'


const WB = styled.div`
  background: rgb(60,60,65);
  color: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  margin-bottom: 10px;
  a {
    color: white;
  }
  &.button {
    background: #2C9DF1;
    color: white;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }
  input {
    color: white !important;
  }
`

const WBheader = styled.div`
  background: rgba(255,255,255,0.1);
  padding: 0 10px;
  position: relative;
  height: 50px;
`

const DeleteWaiterboard = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  width: 50px;
  cursor: pointer;
  font-size: 24px;
  background: transparent;
  color: rgba(255,255,255,0.5);
  border: none;
  outline: none;
  &:hover {
    color: #e74c3c;
  }
`

const WBtitle = styled.div`
  padding: 7px;
  color: rgba(255,255,255,0.8);
  font-size: 18px;
  .linkIcon {
    margin-left: 5px;
    color: rgba(255,255,255,0.25);
  }
  .label {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 10px;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.25);
  }
  &:hover {
    color: white;
    .linkIcon {
      color: rgba(255,255,255,1);
    }
  }
`

const WBbody = styled.div`
  padding: 10px;
`

const TableBox = styled.div`
  display: inline-block;
  background: rgba(0,0,0,0.3);
  color: white;
  font-size: 12px;
  width: ${p => p.fixedWidth ? '250px' : '100%'};
  margin: ${p => p.fixedWidth ? '5px' : '0'};
  overflow: hidden;
  position: relative;
  height: 100%;
  min-height: 50px;
`
const TablePlaceholder = styled.div`
  background: rgba(0,0,0,0.1);
  display: inline-block;
  overflow: hidden;
  position: relative;
  height: 100%;
  min-height: 50px;
  width: 100%;
`
const Thumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.2);
  width: 20%;
  height: 100%;
  padding: 2px 0;
  text-align: center;
  transition: all 150ms ease-in-out;
  i {
    color: ${props => props.color};
  }
`;
const Id = styled.div`
  font-size: 13px;
  font-weight: 700;
  width: 100%;
`;
const Seats = styled.div`
  position: absolute;
  top: 0;
  left: 20%;
  width: 80%;
  padding: 2px 0 2px 5px;
  height: 100%;
  text-align: left;
  .capacity {
    font-size: 18px;
    position: absolute;
    top: 12px;
    left: 33%;
    line-height: 22px;
    i {
      font-size: 22px;
      margin-left: 5px;
      margin-top: 2px;
      vertical-align: text-bottom;
    }
  }
  .deleteButton {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    font-size: 16px;
    padding: 2px 5px;
    background: transparent;
    color: rgba(255,255,255,0.5);
    border: none;
    outline: none;
    &:hover {
      color: #e74c3c;
    }
  }
`;


const TableTag = styled.table`
  width: 100%;
  td {
    padding: 5px;
  }
`

let CreateWaiterboardForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="center">
      <Field name="name" component={Text} componentProps={{
        placeholder: "Waiterboard Name",
        fullWidth: true
      }} />
      <FlatButton type="submit" label="Create" fullWidth={true} />
    </form>
  )
}
CreateWaiterboardForm = reduxForm({
  form: 'waiterboards/createWaiterboard',
  enableReinitialize: true
})(CreateWaiterboardForm)


let CreateTableForm = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="center">
      <Field name="number" component={Text} componentProps={{
        placeholder: "Number of Table",
        type: 'number',
        min: 1,
        max: 1000
      }} />
      <Field name="capacity" component={Text} componentProps={{
        placeholder: "Capacity of Table",
        type: 'number',
        min: 1,
        max: 50
      }} />
      <FlatButton type="submit" label="Add Table" style={{color: 'white'}}/>
    </form>
  )
}
CreateTableForm = compose(
  connect((state, props) => ({
    form: `waiterboards/${props.waiterboardId}/createTable`
  })),
  reduxForm({
    enableReinitialize: true
  })
)(CreateTableForm);

const TableComponent = ({ table, wb, deleteTable, fixedWidth }) => {
  return (
    <TableBox fixedWidth={fixedWidth}>
      <Thumbnail>
        <Id>{table.number}</Id>
      </Thumbnail>
      <Seats>
        <div className="capacity" title="Capacity">
          <span>{table.capacity}</span>
          <i className="ion-ios-people" />
        </div>
        <button
          className="deleteButton"
          onClick={() => deleteTable({id: table.id, waiterboardId: wb.id})}
        >
          <i className="ion-ios-trash-outline" />
        </button>
      </Seats>
    </TableBox>
  )
}

class Waiterboards extends React.Component {
  render() {
    let {
      loggedRestaurant,
      createWaiterboard,
      deleteWaiterboard,
      createTable,
      deleteTable,
    } = this.props

    const waiterboards = FN.MapToList(loggedRestaurant.waiterboards).map((wb) => {
      const tables = FN.MapToList(wb.tables).sort((a,b) => a.number - b.number)
      const xs = R.pluck('x')(tables) // columns
      const ys = R.pluck('y')(tables) // rows
      const tableNumbers = R.pluck('number')(tables) // numbers
      const capacities = R.pluck('capacity')(tables) // numbers
      wb.maxX = R.apply(Math.max, xs)
      wb.maxY = R.apply(Math.max, ys)
      wb.lastTableCapacity = R.last(capacities) || 4
      if (tableNumbers.length < 1) wb.maxTableNumber = 0
      else wb.maxTableNumber = R.apply(Math.max, tableNumbers)
      wb.tables = tables
      const tablesMatrix = R.range(0, wb.maxY+1).map(() => R.range(0, wb.maxX+1).map(() => null)) // tablesMatrix[y][x]
      const tablesExtra = []
      tables.map((table) => {
        if (Number.isInteger(table.x) && Number.isInteger(table.y)) tablesMatrix[table.y][table.x] = table
        else tablesExtra.push(table)
      })
      wb.suitableX = wb.maxX + 1
      wb.suitableY = wb.maxY + 1
      return {...wb, tablesMatrix, tablesExtra}
    })

    return (
      <div>
        {waiterboards.map((wb) =>
          <WB key={wb.id}>
            <WBheader>
              <Link to={`https://waiterboard.tabb.global/board/${wb.id}`} target="_blank">
                <WBtitle>
                  <div className="label">
                    WAITERBOARD
                  </div>
                  <div>
                    <span>{wb.name}</span>
                    <i className="linkIcon ion-android-open" />
                  </div>
                </WBtitle>
              </Link>
              <DeleteWaiterboard onClick={() => deleteWaiterboard({id: wb.id})}>
                <i className="ion-ios-trash-outline" />
              </DeleteWaiterboard>
            </WBheader>
            <WBbody>
              <TableTag>
                <tbody>
                  {wb.tablesMatrix.map((row, i) =>
                    <tr key={i}>
                      {row.map((table, j) => table ?
                        <td key={table.id}>
                          <TableComponent table={table} wb={wb} deleteTable={deleteTable} />
                        </td>
                      :
                      <td key={j*i}>
                        <TablePlaceholder />
                      </td>)}
                    </tr>
                  )}
                </tbody>
              </TableTag>
              <div>
                {wb.tablesExtra.map((table) =>
                  <TableComponent fixedWidth table={table} wb={wb} key={table.id} deleteTable={deleteTable} />
                )}
              </div>
              <CreateTableForm
                waiterboardId={wb.id}
                initialValues={{
                  number: wb.maxTableNumber + 1,
                  capacity: wb.lastTableCapacity
                }}
                onSubmit={({ capacity, number }) => createTable({
                  capacity, number, waiterboardId: wb.id, x: wb.suitableX, y: wb.suitableY
                })}
              />
            </WBbody>
          </WB>
        )}
        <FormBox fullWidth>
          <FormBoxHead>
            <span>Create Waiterboard</span>
            <Progress type={'CREATE_WAITERBOARD'}/>
          </FormBoxHead>
          <FormBoxBody material>
            <CreateWaiterboardForm onSubmit={createWaiterboard} />
          </FormBoxBody>
        </FormBox>
      </div>
    )
  }
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
  }), {
    createWaiterboard: createWaiterboardInitAction,
    deleteWaiterboard: deleteWaiterboardInitAction,
    createTable: createTableInitAction,
    deleteTable: deleteTableInitAction,
  },
)(Waiterboards);
