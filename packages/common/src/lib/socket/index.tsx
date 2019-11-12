import { createContext, useContext } from "react";

export type SocketStatus =
  | "initialized"
  | "connected"
  | "failed"
  | "disconnected"
  | "reconnecting";

export interface Socket extends SocketIOClient.Socket {
  status?: SocketStatus;
}

export const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export * from "./provider";
export * from "./subscription";
