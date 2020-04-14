import { uuid } from "helpers";

import { PartyManager } from "./PartyManager";

export class World {
  /**
   * Current hash state, this determines if changes has occurred in this world
   * since the last game loop.
   */
  public hash: string;

  /**
   * List of parties present in the world.
   */
  public parties: PartyManager;

  /**
   * Create a new World instance.
   */
  constructor() {
    this.hash = uuid();
    this.parties = new PartyManager();
  }

  /**
   * Sets a new hash value indicating changes has been made to the world.
   */
  public setHash(): void {
    this.hash = uuid();
  }

  /**
   * Sends the world state to all the connected clients.
   *
   * @param pluck - Send only the specifically selected state.
   */
  public publish(pluck: ["characters"] = ["characters"]): void {
    for (const key of pluck) {
      // ws.publish(`world.${key}`, this[key].toJSON());
    }
  }

  /**
   * Flushes the world state.
   */
  public flush() {
    this.parties.flush();
  }

  /**
   * Get JSON representation of the world.
   *
   * @returns json object
   */
  public toJSON() {
    return {
      characters: {}
    };
  }

  /**
   * Get stringified JSON object of the world.
   *
   * @returns stringified world.
   */
  public toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}

export const world = new World();
