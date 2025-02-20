"use client";

import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const connectWithSocketServer = (userID: string) => {
  socket = io("http://localhost:8081", {
    query: { userID },
  });

  socket.on("connect", () => {
    console.log("connected with socket.io server");
    console.log(socket!.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });
};

export const emitEvent = (event: any, data: any) => {
    console.log(data)
  if (socket) {
    socket.emit(event, data);
  }
};

export const onEvent = (event: any, callback: any) => {
  if (socket) {
    socket.on(event, callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
