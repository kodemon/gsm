import * as React from "react";

import { router } from "./";

const { useState, useEffect } = React;

/**
 * Sets up a route listener.
 *
 * @param preload - Preloader.
 * @param onError - Error handler.
 */
export function useRouter(preload: Preloader, onError: ErrorResponse) {
  const [view, setView] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const { pathname, search, state } = router.history.location;
    preload().then(() => {
      router.listen({
        render: async route => {
          let props: any = {};
          if (route.before) {
            props = await route.before();
          }
          setView(createReactElement([...route.components], props));
          if (route.after) {
            route.after();
          }
        },
        error: err => {
          const component = onError(err);
          if (component) {
            setView(component);
          }
        }
      });
      router.goTo(`${pathname}${search}`, state || {});
    });
  }, [preload, onError]);

  return view;
}

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

/**
 * Get a compiled react element from a possible multiple route components.
 *
 * @param list List of route components to compile.
 * @param props The root properties to pass down.
 */
function createReactElement(list: any[], props: any = {}): any {
  const Component = list.shift();
  if (list.length > 0) {
    return React.createElement(Component, props, createReactElement(list, props));
  }
  return React.createElement(Component, props);
}

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

/**
 * Application preloader.
 *
 * @remarks
 * This function is run before the first route is initiated.
 */
type Preloader = () => Promise<void>;

/**
 * Error event response.
 */
type ErrorResponse = (err: any) => JSX.Element | void;
