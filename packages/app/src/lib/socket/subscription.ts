import { useEffect, useRef } from 'react';
import { useSocket } from '.';

export const useSubscription = (eventKey: string, callback: (...args: any[]) => any) => {
  const socket = useSocket();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (eventKey) {
      const socketHandler = (...args: any[]) => {
        callbackRef.current && callbackRef.current(...args);
      }

      if (socket) socket.on(eventKey, socketHandler);
      return () => {
        if (socket) socket.removeListener(eventKey, socketHandler);
      }
    }
  }, [eventKey]);

  return socket;
}