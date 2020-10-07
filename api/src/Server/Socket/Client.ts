import * as WebSocket from "ws";

import { uuid } from "../../Lib/Utils";

export class WebSocketClient {
  public uuid: string;
  public socket: WebSocket;
  public handlers: EventHandlers = {};

  private queue: {
    processing: boolean;
    messages: string[];
  } = {
    processing: false,
    messages: []
  };

  /**
   * Create a new WebSocketClient instance.
   *
   * @param socket - Instantiated WebSocket.
   */
  constructor(socket: WebSocket) {
    this.uuid = uuid();
    this.socket = socket;
    this.listen();
  }

  /**
   * Listen for incoming events.
   *
   * @param event   - Event trigger.
   * @param handler - Event handler.
   */
  public on(event: "closed" | string, handler: EventHandler): void {
    if (this.handlers[event]) {
      throw new Error(`Event handler for '${event}' has already been registered for this socket.`);
    }
    this.handlers[event] = handler;
  }

  /**
   * Publish a event to the socket.
   *
   * @param event - Event trigger.
   * @param data  - Event data.
   */
  public async publish(event: string, data: any): Promise<void> {
    this.queue.messages.push(JSON.stringify({ event, data }));
    this.processQueue();
  }

  /**
   * Process messages in the queue.
   */
  private async processQueue() {
    if (this.queue.processing) {
      return false; // already processing another message ...
    }
    this.queue.processing = true;
    const msg = this.queue.messages.shift();
    if (msg) {
      await this.socket.send(msg);
      this.queue.processing = false;
      this.processQueue();
    } else {
      this.queue.processing = false;
    }
  }

  /**
   * Listen for socket events and emit them.
   */
  private async listen(): Promise<void> {
    this.socket.on("message", (value) => {
      if (typeof value === "string") {
        const { uuid, event, data } = JSON.parse(value);
        this.emit(uuid, event, data);
      }
    });
  }

  /**
   * Emit data to all listeners of the given event.
   *
   * @param uuid  - Unique message identifier.
   * @param event - Event being sent.
   * @param data  - Data being sent. Default: {}
   */
  private emit(uuid: string, event: string, data: any = {}): void {
    const handler = this.handlers[event];
    if (handler) {
      handler(data)
        .then((res) => this.publish(uuid, res))
        .catch((err) => {
          console.log(err);
          this.publish(uuid, { error: { code: "HANDLER_FAILED", message: err.message, stack: err.stack } });
        });
    } else {
      this.publish(uuid, { error: { code: "NO_HANDLER", message: `${event} has no valid handler registered.` } });
    }
  }
}

/**
 * List of registered event handlers.
 */
type EventHandlers = {
  [event: string]: EventHandler;
};

/**
 * Processes an incoming socket event and returns a result.
 *
 * @param data - Data object provided with the request.
 *
 * @returns a response value or undefined.
 */
type EventHandler = (data: any) => Promise<any>;
