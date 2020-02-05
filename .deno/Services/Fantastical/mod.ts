import { Parties } from "./Generators/Parties.ts";
import { Places } from "./Generators/Places.ts";
import { Species } from "./Generators/Species.ts";

export const fantastical = {
  party: new Parties(),
  place: new Places(),
  species: new Species()
};
