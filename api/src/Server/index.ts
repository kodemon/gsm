import { ws } from "./Socket/Server";

ws.connect((socket) => {
  socket.on("adventurers.generate", onGenerateAdventurers);
});
