import { ws } from "socket";

import { onGenerateAdventurers, onFindAdventurers } from "./Events/Adventurers.ts";
import { createMockBattle } from "./Events/Battles.ts";

/*
 |--------------------------------------------------------------------------------
 | Register Event Handlers
 |--------------------------------------------------------------------------------
 */

ws.connect(socket => {
  socket.on("adventurers.generate", onGenerateAdventurers);
  socket.on("adventurers.find", onFindAdventurers);
  socket.on("battles.mock", createMockBattle);
});
