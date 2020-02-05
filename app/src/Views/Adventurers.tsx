import React from "react";

import { H1, Button, ProgressBar } from "@blueprintjs/core";

import { useAdventurers } from "Hooks/useAdventurers";
import { AppContainer } from "Layout";
import { router, Route } from "Router";
import { socket } from "Services/Socket";

function getValue(total: number, current: number): number {
  return (current * 100) / total / 100;
}

export const Adventurers: React.FC = () => {
  const { adventurers, generateAdventurers, flush } = useAdventurers();

  return (
    <div>
      <H1>Adventurers</H1>

      <Button onClick={generateAdventurers}>Generate Adventurers</Button>
      <Button onClick={() => socket.send("battles.mock")}>Mock Battle</Button>
      <Button onClick={flush}>Flush</Button>

      <table className="bp3-html-table bp3-html-table-striped bp3-interactive" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Level</th>
            <th>Race</th>
            <th>Age</th>
            <th>Health</th>
            <th style={{ width: "12.5%" }} />
            <th>Mana</th>
            <th style={{ width: "12.5%" }} />
            <th style={{ width: "12.5%" }}>Stamina</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {adventurers.map((character: any, index: number) => (
            <tr key={character.id}>
              <td>{index + 1}</td>
              <td>{character.name}</td>
              <td>{character.level}</td>
              <td>{character.race}</td>
              <td>{character.age}</td>
              <td>
                {character.health.current} / {character.health.total}
              </td>
              <td>
                <div style={{ marginTop: 5 }}>
                  <ProgressBar intent="danger" stripes={false} value={getValue(character.health.total, character.health.current)} />
                </div>
              </td>
              <td>
                {character.mana.current} / {character.mana.total}
              </td>
              <td>
                <div style={{ marginTop: 5 }}>
                  <ProgressBar intent="primary" stripes={false} value={getValue(character.mana.total, character.mana.current)} />
                </div>
              </td>
              <td>
                <div style={{ marginTop: 5 }}>
                  <ProgressBar intent="success" stripes={false} />
                </div>
              </td>
              <td>{character.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

router.register([
  new Route([AppContainer, Adventurers], {
    id: "characters",
    title: "Adventurers | Guns, Swords and Magic",
    path: "/"
  })
]);
