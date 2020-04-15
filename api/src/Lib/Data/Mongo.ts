import { MongoClient } from "mongodb";

class Mongo {
  public client: MongoClient;

  /**
   * Create a new mongodb node.
   *
   * @param uri - Database connection endpoint.
   */
  constructor(uri: string) {
    this.client = new MongoClient(uri, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true, ignoreUndefined: false });
  }

  /**
   * Connects the mongodb client to the server and keeps it alive.
   *
   * @returns mongodb instance
   */
  public async connect() {
    await this.client.connect();
    this.client.on("close", () => {
      this.connect();
    });
  }
}

export const mongo = new Mongo("mongodb://localhost:27017");

/**
 * Get a mongodb collection to perform query operations on.
 *
 * @param name - Name of the collection.
 *
 * @returns mongodb collection
 */
export function collection<T = any>(name: string) {
  return mongo.client.db("gsm").collection<T>(name);
}
