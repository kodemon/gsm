import { useState, useEffect } from "react";

import { socket } from "Services/Socket";

export function useAdventurers() {
  const [adventurers, setAdventurers] = useState<any[]>([]);

  useEffect(() => {
    socket.send("adventurers.find").then(setAdventurers);
    return socket.subscribe("characters", setAdventurers);
  }, []);

  return {
    adventurers,
    generateAdventurers() {
      socket.send("adventurers.generate");
    },
    flush() {
      socket.send("adventurers.flush");
    }
  };
}
