import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  SocketConfig,
  SocketProvider,
  useSocket,
} from '@dinify/common/src/lib/socket';
import { RootState } from 'typesafe-actions';
import { useSubscriber } from './subscriber';

const socketConfig: SocketConfig = {
  uri: 'https://ws.dinify.app',
};

const SubscriberProvider = (props: React.PropsWithChildren<any>) => {
  const uid = useSelector<RootState, string>(state => state.firebase.auth.uid);
  const socket = useSocket();

  // emit init event after socket and user id is available, and socket is connected
  useEffect(() => {
    if (uid && socket !== null && socket.connected) {
      socket.emit('init', `user/${uid}`);
    }
  });

  useSubscriber(uid);

  return <>{props.children}</>;
};

// Important note: the subscriber provider component needs to be
// lower down the component tree hierarchy because of useDispatch hook
export const SocketReduxProvider = (props: React.PropsWithChildren<any>) => (
  <SocketProvider {...socketConfig}>
    <SubscriberProvider>{props.children}</SubscriberProvider>
  </SocketProvider>
);
