import React, { Component } from "react";
import io from "socket.io-client";
import { SocketContext, Socket } from ".";

export interface SocketConfig {
  uri: string;
  options?: SocketIOClient.ConnectOpts;
}

export class SocketProvider extends Component {
  socket: Socket;

  constructor(props: SocketConfig) {
    super(props);
    this.socket = io(props.uri, props.options);
    this.socket.status = "initialized";
    this.socket.on("connect", () => {
      this.socket.status = "connected";
    });

    this.socket.on("disconnect", () => {
      this.socket.status = "disconnected";
    });

    this.socket.on("error", (error: any) => {
      this.socket.status = "failed";
    });

    this.socket.on("reconnect", (data: any) => {
      this.socket.status = "connected";
    });

    this.socket.on("reconnecting", () => {
      this.socket.status = "reconnecting";
    });

    this.socket.on("reconnect_failed", (error: any) => {
      this.socket.status = "failed";
    });
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
      <SocketContext.Provider value={this.socket}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}
