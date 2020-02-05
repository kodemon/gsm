import { Character } from "character";
import { fantastical } from "fantastical";
import { uuid } from "helpers";

/*
 |--------------------------------------------------------------------------------
 | Manager
 |--------------------------------------------------------------------------------
 */

export class PartyManager {
  /**
   * Pool of characters stored for this world seed.
   */
  private pool: PartyPool = {};

  /**
   * Creates a new CharacterManager instance.
   */
  constructor() {
    // this.pool = this.getPool()
  }

  /**
   * Get a party from the pool.
   *
   * @param uuid - Parties unique identifier.
   *
   * @returns party or undefined
   */
  public get(uuid: string): Party | undefined {
    return this.pool[uuid];
  }

  /**
   * Flushes the character pool.
   */
  public flush(): void {
    this.pool = {};
  }

  /**
   * Get the JSON representation of the party pool
   *
   * @returns list of parties
   */
  public toJSON() {
    return Object.values(this.pool).map(party => party.toJSON());
  }
}

/*
 |--------------------------------------------------------------------------------
 | Party
 |--------------------------------------------------------------------------------
 */

export class Party {
  /**
   * Parties unique identifier.
   */
  public uuid: string;

  /**
   * Name of the party.
   */
  public name: string;

  /**
   * List of party members.
   *
   * @remarks
   * The member order also represents the original party formation.
   */
  public members: Character[];

  /**
   * Creates a new Party instance.
   */
  constructor() {
    this.uuid = uuid();
    this.name = fantastical.party.militaryUnit();
    this.members = [];
  }

  /**
   * Add a new member to the party.
   *
   * @param member - Character to add as a member.
   */
  public addMember(member: Character): void {
    this.members.push(member);
  }

  /**
   * Get a copy of the original members as the initial formation at
   * the start of a battle.
   *
   * @returns party battle formation
   */
  public getFormation(): Character[] {
    return [...this.members];
  }

  /**
   * Get JSON formatted party.
   *
   * @returns party
   */
  public toJSON() {
    return {
      name: this.name,
      members: this.members.map(character => character.toJSON())
    };
  }
}

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

/**
 * Resolved character pool.
 */
type PartyPool = {
  [uuid: string]: Party;
};
