import { ws } from "socket";

import { onGenerateAdventurers, onFindAdventurers, onFlushAdventurers } from "./Events/Adventurers";
import { createMockBattle } from "./Events/Battles";

/*
 |--------------------------------------------------------------------------------
 | Register Event Handlers
 |--------------------------------------------------------------------------------
 */

ws.connect(socket => {
  socket.on("adventurers.generate", onGenerateAdventurers);
  socket.on("adventurers.find", onFindAdventurers);
  socket.on("adventurers.flush", onFlushAdventurers);
  socket.on("battles.mock", createMockBattle);
});
