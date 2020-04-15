import { Stratagem } from "../Stratagem";
import { fighter } from "./Fighter";

/*
 |--------------------------------------------------------------------------------
 | Export
 |--------------------------------------------------------------------------------
 */

export const stratagems = {
  fighter,
  toArray(): Stratagem[] {
    return [fighter];
  }
};
