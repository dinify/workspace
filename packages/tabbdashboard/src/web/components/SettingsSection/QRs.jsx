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

import Button from 'material-ui/Button'
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
  background: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  padding: 10px;
  margin-bottom: 10px;
  a {
    color: black;
  }
  h2 {
    margin-left: 7px;
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
  text-align: center;
  color: white;
  font-size: 12px;
  width: ${p => p.fixedWidth ? '250px' : '100%'};
  border-radius: 3px;
  overflow: hidden;
`

const TableTag = styled.table`
  width: 100%;
  td {
    padding: 5px;
  }
`

class QRs extends React.Component {
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
      wb.maxX = R.apply(Math.max, xs)
      wb.maxY = R.apply(Math.max, ys)
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
                        <Link to={`/qr/${table.qr}`}>
                          <Table>
                              <div># {table.number}</div>
                              <QRCode value={table.qr} />
                          </Table>
                        </Link>
                      </td>
                    : <td key={j*i}/>)}
                  </tr>
                )}
              </tbody>
            </TableTag>
            <div>
              {wb.tablesExtra.map((table) =>
                <Link to={`/qr/${table.qr}`} target="_blank">
                  <Table fixedWidth key={table.id}>
                      <div># {table.number}</div>
                      <QRCode value={table.qr} />
                  </Table>
                </Link>
              )}
            </div>
          </WB>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    loggedRestaurant: state.restaurant.loggedRestaurant,
  })
)(QRs);
