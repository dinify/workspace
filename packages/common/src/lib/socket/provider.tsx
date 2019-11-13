import React, { Component } from "react";
import io from "socket.io-client";
import { SocketContext, SocketState, SocketStatus } from ".";

export interface SocketConfig {
  uri: string;
  options?: SocketIOClient.ConnectOpts;
}

export class SocketProvider extends Component {
  socket: SocketIOClient.Socket;
  state: SocketState = {
    status: "initialized"
  };

  constructor(props: SocketConfig) {
    super(props);
    const socket = io(props.uri, props.options);
    const handler = (s: SocketStatus) => () => {
      const { status } = this.state;
      if (status !== s) this.setState({ status: s });
    };
    socket.on("connect", handler("connected"));
    socket.on("disconnect", handler("disconnected"));
    socket.on("error", handler("failed"));
    socket.on("reconnect", handler("connected"));
    socket.on("reconnecting", handler("reconnecting"));
    socket.on("reconnect_failed", handler("failed"));
    this.socket = socket;
  }

  mergeOptions(options = {}) {
    const defaultOptions = {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1 * 1000,
      reconnectionDelayMax: 10 * 1000,
      autoConnect: true,
      transports: ["polling"],
      rejectUnauthorized: true
    };
    return { ...defaultOptions, ...options };
  }

  render() {
    return (
      <SocketContext.Provider value={{ ...this.state, socket: this.socket }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}
