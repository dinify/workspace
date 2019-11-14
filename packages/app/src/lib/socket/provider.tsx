import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  SocketConfig,
  SocketProvider,
  useSocket,
} from '@dinify/common/src/lib/socket';
import { RootState } from 'typesafe-actions';
import { useSubscriber } from './subscriber';
// import io from 'socket.io-client';

const socketConfig: SocketConfig = {
  uri: 'https://ws.dinify.app',
};

const SubscriberProvider = (props: React.PropsWithChildren<any>) => {
  const uid = useSelector<RootState, string>(state => state.firebase.auth.uid);
  const { socket } = useSocket();

  if (socket) {
    socket.on('connect', () => {
      socket.emit('init', `user/${uid}`);
      // Temporary solution for reconnect
      setTimeout(() => {
        socket.emit('init', `user/${uid}`);
      }, 1000);
    });
    socket.on('reconnect', () => {
      socket.emit('init', `user/${uid}`);
      // Temporary solution for reconnect
      setTimeout(() => {
        socket.emit('init', `user/${uid}`);
      }, 1000);
    });
  }

  // emit init event after socket and user id is available, and socket is connected
  useEffect(() => {
    if (uid && socket && socket.connected) {
      socket.emit('init', `user/${uid}`);
      // Temporary solution for reconnect
      setTimeout(() => {
        socket.emit('init', `user/${uid}`);
      }, 1000);
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
