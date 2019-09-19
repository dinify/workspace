import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typesafe-actions';
import { Subtotal } from 'CartModels';

import CreditCard from '@material-ui/icons/CreditCardRounded';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Slider from '@material-ui/lab/Slider';
import Price from '../Price';
import { BillSection } from './bill-section';
import { getOrderItemCount } from '../../../ducks/transaction/selectors';
import { initTransactionAsync } from '../../../ducks/transaction/actions';
import { AppBar, AppBarAction, AppBarTitle } from '../app-bar';
const PaymentOptionsDialog = require('@dinify/common/dist/components/dialogs/PaymentOptionsDialog').default;

export interface BillPageProps {
  onClose?: () => void,
  subtotal: Subtotal,
  orderItemCount: number
  initTransaction: typeof initTransactionAsync.request,
}

const BillPageComponent: React.FC<BillPageProps> = (props) => {
  const {
    onClose = () => {},
    subtotal,
    orderItemCount,
    initTransaction
  } = props;

  const onChoosePayment = (value: any) => {
    setPayMenuOpen(false);
    if (value) {
      setWaitingPayment(true);
      initTransaction({ gratuity: gratitude, type: value.type });
    }
  };

  const [payMenuOpen, setPayMenuOpen] = useState(false);
  const [waitingPayment, setWaitingPayment] = useState(false);
  const [splitMode, setSplitMode] = useState(false);
  const [gratitude, setGratitude] = useState(15);
  const { t } = useTranslation();
  const billPayable = subtotal.amount > 0 && !splitMode && !waitingPayment;
  const paymentTextColor = billPayable ? 'textPrimary' : 'textSecondary';
  const total = { 
    ...subtotal, 
    amount: subtotal ? (subtotal.amount * (1 + gratitude / 100)) : 0
  } as Subtotal;
  return <>
    <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      {!splitMode && <AppBarAction type="close" onClick={onClose}/>}
      <AppBarTitle 
        title={t('bill.title')} 
        subtitle={t('cart.itemCount', { count: orderItemCount, context: orderItemCount === 0 ? 'none' : undefined })}/>
      {false && <AppBarAction type={splitMode ? 'done' : 'edit'} onClick={() => {setSplitMode(!splitMode)}}/>}
    </AppBar>
    <PaymentOptionsDialog open={payMenuOpen} onClose={onChoosePayment}/>
    <div style={{ padding: '0 16px', marginTop: 56, width: '100vw', overflowX: 'hidden' }}>
      <BillSection type="DISPATCHED"/>
      <BillSection type="CONFIRMED"/>
      <div style={{
        display: 'flex',
        marginTop: 16
      }}>
        <Typography color={paymentTextColor} style={{
            flex: 1,
          }}>
          {t('subtotal')}
        </Typography>
        <Typography color={paymentTextColor}>
          <Price price={subtotal} />
        </Typography>
      </div>
      <div style={{
        display: 'flex',
        marginTop: 8,
        marginBottom: 16,
      }}>
      <Typography color={paymentTextColor} style={{
          fontWeight: 700,
          marginRight: 8
        }}>
        {gratitude}%
      </Typography>
      <Typography color={paymentTextColor} style={{
          flex: 1
        }}>
        {t('gratuity')}
      </Typography>
      <Typography color={paymentTextColor}>
        <Price price={total} />
      </Typography>
    </div>
    <Slider style={{paddingTop: 16, paddingBottom: 16}} disabled={!billPayable}
        value={gratitude} min={0} max={50} step={1} onChange={(event, val) => setGratitude(val)}/>
    <div style={{
      marginTop: 16,
      marginBottom: 16,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Fab style={{
        width: '100%',
        maxWidth: 320
      }} disabled={!billPayable} onClick={() => setPayMenuOpen(true)} color="primary" variant="extended" aria-label={t('pay')}>
        <CreditCard style={{
          marginRight: 16
        }}/>
        {t('pay')}
      </Fab>
      {waitingPayment &&
        <Typography style={{marginTop: 16, width: '100%', textAlign: 'center'}} variant="caption">
          {t('paymentPending')}
        </Typography>
      }
    </div>
  </div>
  </>;
};

export const BillPage = connect(
  (state: RootState) => ({
    subtotal: state.transaction.subtotal,
    orderItemCount: getOrderItemCount(state.transaction)
  }), {
    initTransaction: initTransactionAsync.request
  }
)(BillPageComponent);
