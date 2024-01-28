// store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
// Import your reducers here
import ExamReducer from "./slices/examSlice";

// Setup the root reducer with redux-persist
const rootReducer = combineReducers({
  exams: ExamReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // You can add any other redux-persist configurations here.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Add other configurations like middleware here
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
