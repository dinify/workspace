import { useEffect, useRef } from "react";
import { useSocket } from ".";

export type SocketEvent =
  | "connect"
  | "connect_error"
  | "connect_timeout"
  | "disconnect"
  | "disconnecting"
  | "error"
  | "reconnect"
  | "reconnect_attempt"
  | "reconnecting"
  | "reconnect_failed"
  | "reconnect_error"
  | "newListener"
  | "removeListener"
  | "ping"
  | "pong";

export function makeSubscriber<EventType = SocketEvent>() {
  return function wrap<T>(
    eventKey: EventType | SocketEvent,
    callback: (payload: T) => any
  ) {
    useSubscription<EventType, T>(eventKey, callback);
  };
}

export function useSubscription<EventType = SocketEvent, T = any>(
  eventKey: EventType | SocketEvent,
  callback: (payload: T) => any
) {
  const { socket } = useSocket();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (eventKey) {
      const socketHandler = (payload: T) => {
        callbackRef.current && callbackRef.current(payload);
      };

      if (socket) socket.on(eventKey as string, socketHandler);
      return () => {
        if (socket) socket.removeListener(eventKey as string, socketHandler);
      };
    }
  }, [eventKey]);

  return socket;
}
