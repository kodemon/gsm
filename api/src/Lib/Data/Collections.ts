export enum Collection {
  Guilds = "guilds",
  Battles = "battles",
  Characters = "characters"
}

export const collections: Collections[] = [
  {
    name: Collection.Guilds,
    options: {}
  },
  {
    name: Collection.Battles,
    options: {}
  },
  {
    name: Collection.Characters,
    options: {}
  }
];

type Collections = {
  name: Collection;
  options: {
    unique?: string[];
    indices?: string[];
  };
};
