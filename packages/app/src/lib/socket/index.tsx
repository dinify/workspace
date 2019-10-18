import { createContext, useContext } from "react";

export interface Socket extends SocketIOClient.Socket {
  status?: 'initialized'|'connected'|'disconnected'|'failed'|'connected'|'reconnecting'|'failed'
}

export const SocketContext = createContext<Socket|null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
}

export * from './providers';
export * from './subscription';