import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authReducer";
import searchReducer from "./reducers/searchReducer";
import listDataReducer from "./reducers/listDataReducer";
import paginationReducer from "./reducers/paginationState";
import singleDataReducer from "./reducers/singleDataReducer";
import scheduleReducer from "./reducers/scheduleReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  authReducer: authReducer,
  searchReducer: searchReducer,
  listDataReducer: listDataReducer,
  singleDataReducer: singleDataReducer,
  paginationReducer: paginationReducer,
  scheduleReducer: scheduleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);
