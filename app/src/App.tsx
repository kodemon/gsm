import * as React from "react";

import { useRouter } from "Router";

/*
 |--------------------------------------------------------------------------------
 | Views
 |--------------------------------------------------------------------------------
 */

import "Views/Adventurers";

/*
 |--------------------------------------------------------------------------------
 | App
 |--------------------------------------------------------------------------------
 */

export const App: React.FC = () => {
  const view = useRouter(preload, onError);
  if (!view) {
    return <div>Loading App</div>;
  }
  return view;
};

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

/**
 * Application preload.
 */
async function preload(): Promise<void> {
  // nothing to preload ...
}

/**
 * Routing error handler.
 *
 * @param err - Error being thrown.
 */
function onError(err: any): void {
  console.log(err);
}
