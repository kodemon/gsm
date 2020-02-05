import { serve } from "http";
import { acceptWebSocket, WebSocket } from "ws";

import { WebSocketClient } from "./Client.ts";

type OnSocketConnection = (socket: WebSocketClient) => void;

interface Sockets {
  [uuid: string]: WebSocketClient;
}

export class WebSocketServer {
  /**
   * WebSocket listening port.
   * @type {string}
   */
  public port = Deno.args[1] || "8080";

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
    console.log(`websocket server is running on :${this.port}`);
    for await (const req of serve(`:${this.port}`)) {
      const { headers, conn } = req;
      acceptWebSocket({
        conn,
        headers,
        bufReader: req.r,
        bufWriter: req.w
      })
        .then(
          async (sock: WebSocket): Promise<void> => {
            const client = new WebSocketClient(sock);

            // ### Store Socket
            // Remember the socket so we can provide unique operations and perform server
            // wide messages.

            this.sockets[client.uuid] = client;

            // ### Provide Socket
            // Send the connected socket to the connect callback for event registration.

            onConnect(client);

            // ### Remove Socket
            // Remove the socket from the socket list if the connection is closed.

            client.on("closed", () => {
              console.log(`socket disconnected | uuid: ${client.uuid}`);
              delete this.sockets[client.uuid];
            });
          }
        )
        .catch((err: Error): void => {
          console.error(`failed to accept websocket: ${err}`);
        });
    }
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
