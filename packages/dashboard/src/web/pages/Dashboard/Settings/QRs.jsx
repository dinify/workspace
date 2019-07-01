import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { MapToList } from '@dinify/common/dist/lib/FN';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

const styles = () => ({
  wb: {
    background: 'white',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '2px',
    padding: '10px',
    margin: '14px 10px 0 10px',
    '& a': {
      color: 'black',
    },
    '&.button': {
      background: '#2c9df1',
      color: 'white',
      textAlign: 'center',
      textTransform: 'uppercase',
      cursor: 'pointer'
    }
  },
  table: {
    display: 'inline-block',
    margin: 10,
    textAlign: 'center',
    fontSize: 12,
    width: 250,
    overflow: 'hidden',
  }
});

const QRs = ({ loggedRestaurant, classes }) => {
  const waiterboards = MapToList(loggedRestaurant.waiterboards).map(wb => {
    const tables = MapToList(wb.tables).sort(
      (a, b) => a.number - b.number,
    );
    return { ...wb, tables };
  });

  return (
    <div>

      {waiterboards.map(wb => (
        <div className={classes.wb} key={wb.id}>
          {/*
            <Link
              to={`https://waiterboard.dinify.app/board/${wb.id}`}
              target="_blank"
            >
              <Typography gutterBottom variant="subtitle1" align="center">{wb.name}</Typography>
            </Link> 
          */}
          <div>
            {wb.tables.map(table => (
              <Link to={`/qr/${table.qr}`} target="_blank" key={table.id}>
                <div className={classes.table}>
                  <div># {table.number}</div>
                  <QRCode value={`https://web.dinify.app/restaurant/${loggedRestaurant.subdomain}?qr=${table.qr}`} />
                  <div>CODE: {table.code}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default compose(
  withStyles(styles),
  connect((state) => ({
    loggedRestaurant: state.restaurant.loggedRestaurant
  }))
)(QRs);
