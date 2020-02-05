import EventEmitter from "eventemitter3";

import { getRandomNumber } from "Helpers/GetRandomNumber";
import { uuid } from "Helpers/Uuid";

type Message = {
  uuid: string;
  event: string;
  data: any;
  resolve: (value?: void | PromiseLike<void> | undefined) => void;
  reject: (reason?: any) => void;
};

class Socket extends EventEmitter {
  /**
   * WebSocket instance once connection has been established.
   * @type {WebSocket}
   */
  private ws!: WebSocket;

  /**
   * Connection uri.
   * @type {string}
   */
  private uri: string;

  /**
   * Reconnect debounce.
   * @type {NodeJS.Timeout}
   */
  private debounce!: NodeJS.Timeout;

  /**
   * Reconnect delay.
   * @type {number}
   */
  private reconnectDelay: number = 0;

  /**
   * Socket connection status.
   * @type {boolean}
   */
  public connected: boolean = false;

  /**
   * List of messages to send to the server.
   * @type {any[]}
   */
  public messages: Message[] = [];

  /**
   * Create new Socket instance.
   */
  constructor(uri: string = "ws://localhost:8080") {
    super();
    this.uri = uri;
    this.connect();
  }

  public connect() {
    this.ws = new WebSocket(this.uri);

    // ### Connected
    // Set connection status to true and process any queued messages.

    this.ws.onopen = () => {
      console.log("Socket connected.");
      this.connected = true;
      this.reconnectDelay = 0;
      this.process();
    };

    // ### Error

    this.ws.onerror = (event: any) => {
      // console.log("Socket received error.", event);
    };

    // ### Message
    // Handle incoming message and convert it to an emitted event.

    this.ws.onmessage = (msg: any) => {
      const { event, data } = JSON.parse(msg.data);
      this.emit(event, data);
    };

    // ### Closed
    // Set connection status to false.

    this.ws.onclose = () => {
      if (this.connected) {
        console.log("Socket closed, re-attempting connection.");
      } else {
        console.log("Socket re-attempting connection.");
      }
      this.connected = false;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(
        () => {
          this.connect();
        },
        this.reconnectDelay < 10000 ? (this.reconnectDelay += getRandomNumber(500, 1500)) : this.reconnectDelay
      );
    };
  }

  /**
   * Subscribes to a specific event and returns a unsubscribe function.
   *
   * @param event - Event to subscribe to.
   * @param cb - Callback to fire on changes.
   *
   * @returns unsubscribe function
   */
  public subscribe(event: string, cb: (data: any) => void): () => void {
    socket.on(event, cb);
    return (): void => {
      socket.off(event, cb);
    };
  }

  /**
   * Emits an even to the back end socket server.
   *
   * @param event
   * @param data
   */
  public async send(event: string, data: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.messages.push({
        uuid: uuid(),
        event,
        data,
        resolve,
        reject
      });
      this.process();
    });
  }

  /**
   * Process message queue.
   */
  private process() {
    if (!this.ws || !this.connected) {
      return; // awaiting connection ...
    }
    const message = this.messages.shift();
    if (message) {
      this.ws.send(
        JSON.stringify({
          uuid: message.uuid,
          event: message.event,
          data: message.data
        })
      );

      // ### Callback Response
      // Wait for a callback response by registering a one time response listener
      // for an event with the generated message uuid.

      this.once(message.uuid, (data: any) => {
        if (data) {
          if (data.error) {
            message.reject(data.error);
          } else {
            message.resolve(data);
          }
        } else {
          message.resolve();
        }
      });

      // ### Process Next
      // Once a message has been sent, we move onto the next message in the queue.

      this.process();
    }
  }
}

export const socket = new Socket();
