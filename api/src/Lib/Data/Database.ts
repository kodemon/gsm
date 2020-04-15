import Loki from "lokijs";

import { collections } from "./Collections";

/*
 |--------------------------------------------------------------------------------
 | Database
 |--------------------------------------------------------------------------------
 */

export const db = new Loki("gsm", {
  adapter: new Loki.LokiFsAdapter(),
  autosave: true
});

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

/**
 * Load persistent data into the database asynchronously and registers all the
 * configured collections with LokiJS.
 *
 * @remarks
 * This operation is designed so we can ensure application data has been loaded
 * into memory before performing additional database operations. This function
 * should be run at the start of your application before utilizing any models
 * or database functionality.
 */
export async function loadDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.loadDatabase({}, (err: Error) => {
      if (err) {
        return reject(err);
      }
      loadCollections();
      resolve();
    });
  });
}

/**
 * Register all configured collections with the current database instance.
 */
export function loadCollections(): void {
  for (const collection of collections) {
    const col = db.getCollection(collection.name);
    if (col === null) {
      db.addCollection(collection.name, {
        disableMeta: true,
        unique: ["id", ...(collection.options.unique || [])],
        indices: collection.options.indices || []
      });
    }
  }
}
