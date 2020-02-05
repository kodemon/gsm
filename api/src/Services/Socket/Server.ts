import * as WebSocket from "ws";

import { WebSocketClient } from "./Client";

type OnSocketConnection = (socket: WebSocketClient) => void;

interface Sockets {
  [uuid: string]: WebSocketClient;
}

export class WebSocketServer {
  /**
   * List of connected sockets.
   * @type {Sockets}
   */
  public sockets: Sockets = {};

  /**
   * Create a socket server and wait for incoming connections.
   *
   * @param onConnect
   */
  public async connect(onConnect: OnSocketConnection): Promise<void> {
    const server = new WebSocket.Server({ port: 8080 });

    server.on("connection", socket => {
      const client = new WebSocketClient(socket);

      console.log(`socket connected | uuid: ${client.uuid}`);

      // ### Store Socket
      // Remember the socket so we can provide unique operations and perform server
      // wide messages.

      this.sockets[client.uuid] = client;

      // ### Provide Socket
      // Send the connected socket to the connect callback for event registration.

      onConnect(client);

      // ### Remove Socket
      // Remove the socket from the socket list if the connection is closed.

      socket.on("close", () => {
        console.log(`socket disconnected | uuid: ${client.uuid}`);
        delete this.sockets[client.uuid];
      });
    });
  }

  /**
   * Publish an event to all the connected sockets.
   *
   * @param event - Event trigger.
   * @param data - Event data.
   */
  public publish(event: string, data: any): void {
    for (const uuid in this.sockets) {
      this.sockets[uuid].publish(event, data);
    }
  }
}

export const ws = new WebSocketServer();
