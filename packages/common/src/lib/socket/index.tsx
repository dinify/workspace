import { createContext, useContext } from "react";

export type SocketStatus =
  | "initialized"
  | "connected"
  | "failed"
  | "disconnected"
  | "reconnecting";

export interface SocketState {
  status?: SocketStatus;
  socket?: SocketIOClient.Socket;
}

export const SocketContext = createContext<SocketState>({});

export const useSocket = () => {
  return useContext(SocketContext);
};

export * from "./provider";
export * from "./subscription";
