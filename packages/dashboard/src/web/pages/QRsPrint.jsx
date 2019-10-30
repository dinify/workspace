import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { MapToList } from '@dinify/common/dist/lib/FN';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { selectedRestaurant } from 'ducks/restaurant/selectors';
import { fetchWaiterboards } from 'ducks/restaurant/actions';
import Loading from 'web/components/Loading';

const bgColor = 'rgb(82, 82, 82)';

const styles = () => ({
  wb: {
    background: 'white',
    padding: '10px',
    height: '100%',
    margin: 0
  },
  card: {
    display: 'inline-block',
    position: 'relative',
    background: bgColor,
    width: '5.5cm',
    height: '10cm',
    textAlign: 'center',
    borderRadius: '2.8mm',
    margin: '1cm',
    padding: '0.25cm 0',
    overflow: 'hidden',
    fontSize: '3.5mm',
    fontFamily: 'Helvetica Neue'
  },
  qrContainer: {
    display: 'inline-block',
    textAlign: 'center',
    width: '5cm',
    height: '5cm',
    borderRadius: '1mm',
    background: 'rgb(255,255,255)',
    '& canvas': {
      width: '4.5cm !important',
      height: '4.5cm !important',
      margin: '0.25cm'
    }
  },
  logo: {
    height: '1cm',
    width: '1cm',
    marginTop: '2mm',
    verticalAlign: 'middle'
  },
  footer: {
    background: 'rgb(240,240,240)',
    verticalAlign: 'middle',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '2cm',
    lineHeight: '0.8cm'
  },
  title: {
    fontWeight: 500,
    margin: '0 0 2mm',
    textTransform: 'uppercase',
  },
  tableTitle: {
    fontWeight: 100,
    margin: '8mm 0',
    letterSpacing: '0.3mm',
    textTransform: 'uppercase',
  },
  link: {
    color: bgColor,
    fontSize: '3mm',
    fontWeight: 600,
  }
});

const QRs = ({ waiterboards, fetchWaiterboards, restaurant, classes }) => {

  const shouldLoad = waiterboards.length < 1;
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
              <div className={classes.card}>
                <div className={classes.title}>SCAN TO ORDER</div>
                
                <div className={classes.qrContainer}>
                  <QRCode
                    bgColor='rgba(255,255,255,0)'
                    fgColor={bgColor}
                    size={512}
                    value={`https://web.dinify.app/restaurant/${restaurant.subdomain}?qr=${table.qr}`}
                  />
                  <div className={classes.tableTitle}>Table no. {table.number}</div>
                  
                </div>
                <div className={classes.footer}>
                  <img className={classes.logo} alt="Rebelbean" src='/rebelbean.png' />
                  <div className={classes.link}>web.dinify.app/restaurant/vlnena</div>
                </div>
              </div>
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
