import { useEffect, useRef } from "react";
import { useSocket } from ".";

export function makeSubscriber<EventType extends string>() {
  return function wrap<T>(eventKey: EventType, callback: (payload: T) => any) {
    useSubscription<EventType, T>(eventKey, callback);
  };
}

export function useSubscription<EventType extends string, T>(
  eventKey: EventType,
  callback: (payload: T) => any
) {
  const socket = useSocket();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (eventKey) {
      const socketHandler = (payload: T) => {
        callbackRef.current && callbackRef.current(payload);
      };

      if (socket) socket.on(eventKey, socketHandler);
      return () => {
        if (socket) socket.removeListener(eventKey, socketHandler);
      };
    }
  }, [eventKey]);

  return socket;
}
