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

const Tablet = styled.div `
  position: relative;
  margin: 10px;
  background: black;
  width: 200px;
  height: 140px;
  line-height: 30px;
  text-align: center;
  color: white;
  border-radius: 5px;
  display: inline-block;
`

const Desk = styled.div `
  position: relative;
  margin: 20px;
  background: white;
  width: 200px;
  height: 220px;
  line-height: 30px;
  text-align: center;
  color: black;
  border-radius: 5px;
  display: inline-block;
`

const DeleteDesk = styled.button `
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
`

const DeleteWB = styled.button `
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: white;
`

const TabletCred = styled.div `
  font-weight: 200;
  i {
    font-weight: 500;
    font-size: 20px;
    vertical-align: middle;
    margin-right: 6px;
  }
  span {
    vertical-align: middle;
  }
`

const WB = styled.div`
  background: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  padding: 10px;
  margin-bottom: 10px;
  a {
    color: black;
  }
  &.button {
    background: #2C9DF1;
    color: white;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }
`

const Table = styled.div`
  display: inline-block;
  background: rgb(28,37,49);
  color: white;
  font-size: 12px;

  width: ${p => p.fixedWidth ? '250px' : '100%'};
  background-image: url('/static/wood2.jpg');
  border-radius: 3px;
  overflow: hidden;
`

const Filter = styled.div`
  background: rgba(0,0,0,0.5);
  padding: 10px;
`

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
      <FlatButton type="submit" label="Add Table" />
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
      return {...wb, tablesMatrix, tablesExtra}
    })

    return (
      <div>
        {waiterboards.map((wb) =>
          <WB key={wb.id}>
            <Link to={`https://waiterboard.tabb.global/board/${wb.id}`} target="_blank">
              <h2>{wb.name}</h2>
            </Link>
            <TableTag>
              <tbody>
                {wb.tablesMatrix.map((row, i) =>
                  <tr key={i}>
                    {row.map((table, j) => table ?
                      <td key={table.id}>
                        <Table>
                          <Filter>
                            <div># {table.number}</div>
                            <div>Capacity {table.capacity}</div>
                            <button onClick={() => deleteTable({id: table.id, waiterboardId: wb.id})}>Delete</button>
                          </Filter>
                        </Table>
                      </td>
                    : <td key={j*i}/>)}
                  </tr>
                )}
              </tbody>
            </TableTag>
            <div>
              {wb.tablesExtra.map((table) =>
                <Table fixedWidth key={table.id}>
                  <Filter>
                    <div># {table.number}</div>
                    <div>Capacity {table.capacity}</div>
                    <button onClick={() => deleteTable({id: table.id, waiterboardId: wb.id})}>Delete</button>
                  </Filter>
                </Table>
              )}
            </div>
            <CreateTableForm
              waiterboardId={wb.id}
              initialValues={{
                number: wb.maxTableNumber + 1,
                capacity: wb.lastTableCapacity
              }}
              onSubmit={({ capacity, number }) => createTable({
                capacity, number, waiterboardId: wb.id
              })}
            />
            <FlatButton onClick={() => deleteWaiterboard({id: wb.id})} label="Delete Waiterboard"/>
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
