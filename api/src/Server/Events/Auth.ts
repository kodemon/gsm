import { WebSocketClient } from "../Socket/Client";

export class Auth {
  public socket: WebSocketClient;

  constructor(socket: WebSocketClient) {
    this.socket = socket;

    socket.on("auth.signin", this.signin);
  }

  public async signin({ username, password }): Promise<{ token: string }> {
    return { token: "xyz" };
  }
}
