import { ws } from "../Services/Socket/Server";

/**
 * Logs event to console and emits the log event over the socket.
 *
 * @param msg - Message to log.
 * @param data
 */
export function log(msg: string | number, data?: any): void {
  if (data) {
    console.log(msg, data);
  } else {
    console.log(msg);
  }
  ws.publish("log", { msg, data });
}
