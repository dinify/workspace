import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { checkoutUserAsync } from 'features/table/actions';
import { getUserName } from '../../lib/utils';
import Bill from './Events/Bill';
import Order from './Events/Order';
import { useTranslation } from '@dinify/common/src/lib/i18n';

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 180px;
  width: 100%;
  padding: 30px;
  text-align: center;
`;

const Photo = styled.div`
  background-color: white;
  background-image: url(${props => props.url});
  width: 50px;
  height: 50px;
  background-size: 50px;
  margin: 20px;
  border-radius: 50%;
  background-position: center;
  display: inline-block;
`;

const Body = styled.div`
  position: absolute;
  top: 230px;
  left: 0;
  width: 100%;
  height: 300px;
  padding: 0 30px;
  box-sizing: border-box;
  overflow: auto;
  .Bill, .Order {
    width: 100%
  }
`;

const ModalUser = ({
  payload: { userId },
  users,
  checkoutUser,
  shown
}) => {
  const { t } = useTranslation();

  const user = users[userId];

  if (!shown) return (<div />);
  if (!user) return (<div />);

  // TODO check-out kick him out

  return (
    <div>
      <Header>

        <Photo url={user.photoURL} />

        <Typography variant="h6" style={{color: '#000', marginBottom: 40}}>{user  ? getUserName(user) : ''}</Typography>

        <Button
          color="primary"
          variant="contained"          
          onClick={() => checkoutUser({ userId })}
        >
          <span>{t('check-out')}</span>
        </Button>


      </Header>

      <Body>
        {user.orders && user.orders.orders.length > 0 ?
          user.orders.orders.map((order, i) =>
            <Order key={i} order={order} noconfirm datetime />
          )
        : ''}
        {user.bills ?
          user.bills.map((bill, i) =>
            <Bill key={i} bill={bill} noconfirm datetime />
          )
        : ''}
      </Body>

    </div>
  );
}

export default connect(
  state => ({
    users: state.user.all,
  }),
  {
    checkoutUser: checkoutUserAsync.request,
  }
)(ModalUser);
