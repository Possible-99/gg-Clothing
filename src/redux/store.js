import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
// For handling async redux, we need to import it
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const middleWares = [thunk];

if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

// This is a persist version of our store.
export const persistor = persistStore(store);

export default { store, persistor };
