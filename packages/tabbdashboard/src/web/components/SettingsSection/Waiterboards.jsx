// @flow
import React from 'react';
import R from 'ramda';
import * as FN from '../../../lib/FN';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';
import QRCode from 'qrcode.react'
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { HorizontalLine } from '../styled/HorizontalLine'
import numeral from 'numeral'
import {
  FormBox,
  FormBoxHead,
  FormBoxBody,
  FormBoxSubmit,
  Label
} from '../styled/FormBox';
import {
  createWaiterboardInitAction,
  addTablesToWBInitAction,
  addTableToWBInitAction,
  deleteTableInitAction,
  deleteWBInitAction
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


class Waiterboards extends React.Component {
  render() {
    let {
      loggedRestaurant,
      createWaiterboard,
      addTabletDone,
      addTablesToWB,
      addTableToWB,
      deleteTable,
      deleteWB
    } = this.props

    const waiterboards = FN.MapToList(loggedRestaurant.waiterboards).map((wb) => {
      const tables = FN.MapToList(wb.tables)
      const xs = R.pluck('x')(tables) // columns
      const ys = R.pluck('y')(tables) // rows
      wb.maxX = R.apply(Math.max, xs)
      wb.maxY = R.apply(Math.max, ys)
      wb.tables = tables
      const tablesMatrix = R.range(0, wb.maxY+1).map(() => R.range(0, wb.maxX+1).map(() => null)) // tablesMatrix[y][x]
      const tablesExtra = []
      tables.map((table) => {
        if (Number.isInteger(table.x) && Number.isInteger(table.y)) tablesMatrix[table.y][table.x] = table
        else tablesExtra.push(table)
      })
      console.log('ext');
      console.log(tablesExtra);
      return {...wb, tablesMatrix, tablesExtra}
    })
    console.log(waiterboards);

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
                            <div>Code {table.code}</div>
                            <div>X {table.x}</div>
                            <div>Y {table.y}</div>
                            <div>Capacity {table.capacity}</div>
                            <button onClick={() => deleteTable({id: table.id})}>Delete</button>
                          </Filter>
                        </Table>
                      </td>
                    : <td key={j*i}/>)}
                  </tr>
                )}
              </tbody>
            </TableTag>
            <div>Unplaced</div>
            <div>
              {wb.tablesExtra.map((table) =>
                <Table fixedWidth>
                  <div>{table.code}</div>
                  <div>X{table.x}</div>
                  <div>Y{table.y}</div>
                  <button onClick={() => deleteTable({id: table.id})}>Delete</button>
                </Table>
              )}
            </div>
          </WB>
        )}
        <WB className="button">
          Add waiterboard
        </WB>
      </div>
    )
  }
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
    addTabletDone: state.restaurant.addTabletDone
  }), {
    createWaiterboard: createWaiterboardInitAction,
    addTablesToWB: addTablesToWBInitAction,
    addTableToWB: addTableToWBInitAction,
    deleteTable: deleteTableInitAction,
    deleteWB: deleteWBInitAction,
  },
)(Waiterboards);
