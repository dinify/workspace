import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { MapToList } from '@dinify/common/src/lib/FN';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { selectedRestaurant } from 'features/restaurant/selectors';
import { fetchWaiterboardsAsync } from 'features/restaurant/actions';
import Loading from 'web/components/Loading';

const bgColor = 'rgb(40, 40, 40)';

const tableNames = [
  'okno1',
  'okno2',
  'bar4'
]

const titleStyle = {
  color: bgColor,
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: '3mm',
  whiteSpace: 'nowrap'
}

const styles = () => ({
  wb: {
    background: 'rgb(0,0,0)',
    padding: '10px',
    height: '100%',
    margin: 0
  },
  card: {
    display: 'inline-block',
    position: 'relative',
    background: 'white',
    width: '5.5cm',
    height: '10cm',
    textAlign: 'center',
    borderRadius: '1mm',
    margin: '1cm',
    padding: '0.25cm 0',
    overflow: 'hidden',
    fontSize: '3.5mm',
  },
  qrContainer: {
    display: 'inline-block',
    textAlign: 'center',
    width: '4.5cm',
    height: '4.5cm',
    margin: '0.25cm',
    // borderRadius: '1mm',
    background: 'rgb(255,255,255)',
    '& canvas': {
      width: '4.5cm !important',
      height: '4.5cm !important',
    }
  },
  logo: {
    height: '1cm',
    width: '1cm',
    marginTop: '2mm',
    verticalAlign: 'middle',
    opacity: 0.9
  },
  footer: {
    background: 'rgba(0, 0, 0, 0.1)',
    verticalAlign: 'middle',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '2cm',
    lineHeight: '0.8cm'
  },
  aboveCodeTitle: {
    ...titleStyle,
    letterSpacing: '2mm',
    margin: '1mm 0 1mm 1.8mm',
  },
  underCodeTitle: {
    ...titleStyle,
    margin: '4mm 0',
    letterSpacing: '0.66mm'
  },
  tableTitle: {
    fontWeight: 800,
    margin: '9mm 0',
    letterSpacing: '0.3mm',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.7)'
  },
  link: {
    color: 'rgba(40, 40, 40, 0.5)',
    fontSize: '3mm',
    fontWeight: 600,
  },
  tableName: {
    // position: 'absolute',
    // bottom: '16.5mm',
    // left: '4mm',
    background: '#f54f56',
    borderRadius: '5mm',
    margin: '1mm 0',
    color: 'white',
    display: 'inline-block',
    padding: '1mm 5mm',
    textTransform: 'uppercase'
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
            {wb.tables.map((table, i) => (
              <div className={classes.card}>
                <div className={classes.aboveCodeTitle}>Naskenuj kód</div>
                
                <div className={classes.qrContainer}>
                  <QRCode
                    bgColor='rgba(255,255,255,0)'
                    fgColor={bgColor}
                    size={512}
                    value={`https://web.dinify.app/restaurant/${restaurant.subdomain}?qr=${table.qr}`}
                  />
                  <div className={classes.underCodeTitle}>Objednej si ke stolu</div>
                  {/*<div className={classes.tableTitle}>Table no. {table.number}</div>*/}
                  <div className={classes.tableName}>{tableNames[i]}</div>
                  
                </div>
                <div className={classes.footer}>
                  <img className={classes.logo} alt="Rebelbean" src='/rebelbean_red.png' />
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
    fetchWaiterboards: fetchWaiterboardsAsync.request
  })
)(QRs);
