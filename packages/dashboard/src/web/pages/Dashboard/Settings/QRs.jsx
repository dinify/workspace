import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { MapToList } from '@dinify/common/dist/lib/FN';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { selectedRestaurant } from 'ducks/restaurant/selectors';
import { fetchWaiterboards } from 'ducks/restaurant/actions';
import Loading from 'web/components/Loading';

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

const QRs = ({ waiterboards, waiterboardsLoaded, fetchWaiterboards, restaurant, classes }) => {

  const shouldLoad = waiterboards.length < 1 && !waiterboardsLoaded;
  useEffect(() => {
    if (shouldLoad) fetchWaiterboards()
  }, []);
  if (shouldLoad) return <Loading />;

  const wbs = MapToList(waiterboards).map(wb => {
    const tables = MapToList(wb.tables).sort(
      (a, b) => a.number - b.number,
    );
    return { ...wb, tables };
  });

  return (
    <div>

      {wbs.map(wb => (
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
                  <QRCode value={`https://web.dinify.app/restaurant/${restaurant.subdomain}?qr=${table.qr}`} />
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
    waiterboards: state.restaurant.waiterboards,
    restaurant: selectedRestaurant(state)
  }), {
    fetchWaiterboards
  })
)(QRs);
