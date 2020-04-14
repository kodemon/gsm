import { Parties } from "./Generators/Parties";
import { Places } from "./Generators/Places";
import { Species } from "./Generators/Species";

export const fantastical = {
  party: new Parties(),
  place: new Places(),
  species: new Species()
};
