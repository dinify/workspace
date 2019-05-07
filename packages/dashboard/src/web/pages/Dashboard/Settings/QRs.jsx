// @flow
import React from 'react';
import * as FN from 'lib/FN';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import Typography from '@dinify/common/dist/components/Typography';

const WB = styled.div`
  background: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  padding: 10px;
  margin: 14px 10px 0 10px;
  a {
    color: black;
  }
  h2 {
    margin-left: 7px;
  }
  &.button {
    background: #2c9df1;
    color: white;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

const Table = styled.div`
  display: inline-block;
  margin: 10px;
  text-align: center;
  font-size: 12px;
  width: ${p => (p.fixedWidth ? '250px' : '100%')};
  overflow: hidden;
`;

const QRs = ({ loggedRestaurant }) => {
  const { t } = useTranslation();

  const waiterboards = FN.MapToList(loggedRestaurant.waiterboards).map(wb => {
    const tables = FN.MapToList(wb.tables).sort(
      (a, b) => a.number - b.number,
    );
    return { ...wb, tables };
  });

  return (
    <div>

      {waiterboards.map(wb => (
        <WB key={wb.id}>
          <Link
            to={`https://waiterboard.dinify.app/board/${wb.id}`}
            target="_blank"
          >
            <Typography gutterBottom variant="subtitle" align="center">{wb.name}</Typography>
          </Link>
          <div>
            {wb.tables.map(table => (
              <Link to={`/qr/${table.qr}`} target="_blank">
                <Table fixedWidth key={table.id}>
                  <div># {table.number}</div>
                  <QRCode value={`https://m.dinify.app/restaurant/${loggedRestaurant.subdomain}?qr=${table.qr}`} />
                  <div>CODE: {table.code}</div>
                </Table>
              </Link>
            ))}
          </div>
        </WB>
      ))}
    </div>
  );
}

export default connect(state => ({
  loggedRestaurant: state.restaurant.loggedRestaurant,
}))(QRs);
