import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// / Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crear tienda con reducer persistido
const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware()
    // Aquí puedes agregar otros middleware si lo necesitas
  )
);

// Persistor para rehidratar el estado
const persistor = persistStore(store);

export { store, persistor };
