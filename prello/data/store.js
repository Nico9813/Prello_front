import { useMemo } from "react";
import { rootReducer } from "./reducers";
import { createStore } from "redux";

let store;

const initialState = {
  isFetched: false,
  perfil: {
    tableros: [],
    roles: [],
  },
};

function initStore(preloadedState = initialState) {
  return createStore(rootReducer, preloadedState);
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
