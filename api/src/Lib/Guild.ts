import { Character } from "./Character";
import { Collection, collection } from "./Data";

export class Guild {
  public id: string;
  public name: string;
  public master: GuildMaster;
  public gold: number;
  public members: Character[] = [];

  /**
   * Create a new Guild instance.
   *
   * @param data - Guild data.
   */
  constructor(data: GuildData, members: Character[] = []) {
    this.id = data.id;
    this.name = data.name;
    this.master = data.master;
    this.gold = data.gold || 0;
    this.members = members;
  }

  // ### Data
  // The following is a list of persistence based methods used to store
  // guild data.

  /**
   * Get list of guilds in provided ids.
   *
   * @param ids - List of guild ids to resolve.
   *
   * @returns guilds
   */
  public static async in(ids: string[]) {
    const data = await collection<GuildData>(Collection.Guilds)
      .find({ id: { $in: ids } })
      .toArray();
    if (data) {
      return data.map((d) => new Guild(d));
    }
    return [];
  }

  /**
   * Get a guild instance by its id.
   *
   * @param id - Guild id.
   *
   * @returns guild or undefined
   */
  public static async getById(id: string) {
    const data = await collection<GuildData>(Collection.Guilds).findOne({ id });
    if (data) {
      return this.from(data);
    }
  }

  /**
   * Get a guild by the guild masters username.
   *
   * @param username - Guild master username.
   *
   * @returns guild or undefined
   */
  public static async getByMaster(username: string) {
    const data = await collection<GuildData>(Collection.Guilds).findOne({ "master.username": username });
    if (data) {
      return this.from(data);
    }
  }

  /**
   * Save the guild state with the persistent data layer.
   */
  public async save() {
    await collection<GuildData>(Collection.Guilds).update(
      {
        id: this.id
      },
      this.toData(),
      { upsert: true }
    );
  }

  /**
   * Get a new Guild instance from provided guild data.
   *
   * @remarks
   * This resolves the guild members from string to character instances.
   *
   * @param data
   */
  public static async from(data: GuildData) {
    return new this(data, await Character.in(data.members));
  }

  /**
   * Convert the instance to a JSON data object.
   *
   * @returns guild data
   */
  public toData(): GuildData {
    return {
      id: this.id,
      name: this.name,
      master: this.master,
      gold: this.gold,
      members: this.members.map((m) => m.id)
    };
  }

  // ### Utilities
  // The following is a list of utility methods.

  public addMember(character: Character): void {
    character.save();
    this.members.push(character);
    this.save();
  }

  public delMember(id: string): void {
    this.members = this.members.reduce<Character[]>((characters, character) => {
      if (character.id !== id) {
        characters.push(character);
      }
      return characters;
    }, []);
    this.save();
  }
}

type GuildData = {
  id: string;
  name: string;
  master: GuildMaster;
  gold?: number;
  members: string[];
};

type GuildMaster = {
  name: string;
  username: string;
  password: string;
};
