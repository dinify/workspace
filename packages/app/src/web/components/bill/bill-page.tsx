import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { RootState } from 'typesafe-actions';
import { Subtotal } from 'CartModels';

import CreditCard from '@material-ui/icons/CreditCardRounded';
import Wallet from '@material-ui/icons/AccountBalanceWalletRounded';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Slider from '@material-ui/lab/Slider';
import Price from '@dinify/common/src/components/price';
import { BillSection } from './bill-section';
import { initTransactionAsync } from '../../../features/transaction/actions';
import { AppBar, AppBarAction, AppBarTitle } from '../app-bar';
const PaymentOptionsDialog = require('@dinify/common/src/components/dialogs/PaymentOptionsDialog')
  .default;

export interface BillPageProps {
  onClose?: () => void;
  subtotal: Subtotal;
  orderItemCount: number;
  initTransaction: typeof initTransactionAsync.request;
  transactionStatus: string;
}

const BillPageComponent: React.FC<BillPageProps> = props => {
  const {
    onClose = () => {},
    subtotal,
    orderItemCount,
    initTransaction,
    transactionStatus,
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
    amount: subtotal ? subtotal.amount * (1 + gratitude / 100) : 0,
  } as Subtotal;

  let statusComponent = null;
  if (transactionStatus !== null) {
    let captionText;
    if (transactionStatus === 'INITIATED') captionText = t('paymentPending');
    else if (transactionStatus === 'PROCESSED')
      captionText = t('paymentConfirmed');
    statusComponent = (
      <Typography
        style={{ marginTop: 16, width: '100%', textAlign: 'center' }}
        variant="caption"
      >
        {captionText}
      </Typography>
    );
  }
  return (
    <>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        {!splitMode && <AppBarAction type="close" onClick={onClose} />}
        <AppBarTitle
          title={t('bill.title')}
          subtitle={t('cart.itemCount', { count: orderItemCount })}
        />
        {false && (
          <AppBarAction
            type={splitMode ? 'done' : 'edit'}
            onClick={() => {
              setSplitMode(!splitMode);
            }}
          />
        )}
      </AppBar>
      <PaymentOptionsDialog open={payMenuOpen} onClose={onChoosePayment} />
      <div
        style={{
          padding: '0 16px',
          marginTop: 56,
          width: '100vw',
          overflowX: 'hidden',
        }}
      >
        <BillSection type="DISPATCHED" />
        <BillSection type="CONFIRMED" />
        <div
          style={{
            display: 'flex',
            marginTop: 16,
          }}
        >
          <Typography
            color={paymentTextColor}
            style={{
              flex: 1,
            }}
          >
            {t('subtotal')}
          </Typography>
          <Typography color={paymentTextColor}>
            <Price price={subtotal} />
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          <Typography
            color={paymentTextColor}
            style={{
              fontWeight: 700,
              marginRight: 8,
            }}
          >
            {gratitude}%
          </Typography>
          <Typography
            color={paymentTextColor}
            style={{
              flex: 1,
            }}
          >
            {t('gratuity')}
          </Typography>
          <Typography color={paymentTextColor}>
            <Price price={total} />
          </Typography>
        </div>
        <Slider
          style={{ paddingTop: 16, paddingBottom: 16 }}
          disabled={!billPayable}
          value={gratitude}
          min={0}
          max={50}
          step={1}
          onChange={(event, val) => setGratitude(val)}
        />
        <div
          style={{
            marginTop: 16,
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Fab
            style={{
              flex: 1,
              marginRight: 8,
              maxWidth: 320,
            }}
            disabled={!billPayable}
            onClick={() => onChoosePayment({ type: 'CASH' })}
            color="primary"
            variant="extended"
            aria-label={t('pay')}
          >
            <Wallet style={{ marginRight: 8 }} />
            Cash
          </Fab>
          <Fab
            style={{
              flex: 1,
              marginLeft: 8,
              maxWidth: 320,
            }}
            disabled={!billPayable}
            onClick={() => onChoosePayment({ type: 'CARD' })}
            color="primary"
            variant="extended"
            aria-label={t('pay')}
          >
            <CreditCard style={{ marginRight: 8 }} />
            Card
          </Fab>
        </div>
        {statusComponent}
      </div>
    </>
  );
};

export const BillPage = connect(
  (state: RootState) => ({
    subtotal: state.transaction.subtotal,
    orderItemCount: state.transaction.orderItemsCount,
    transactionStatus: state.ui.transactionStatus,
  }),
  {
    initTransaction: initTransactionAsync.request,
  },
)(BillPageComponent);
