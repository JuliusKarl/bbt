import { combineReducers, configureStore } from '@reduxjs/toolkit'
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from '../slices/appSlice'
import stocksReducer from '../slices/stocksSlice'
import counterReducer from '../slices/counterSlice'

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,

};
const appPersistReducer = persistReducer(appPersistConfig, appReducer);

const stocksPersistConfig = {
  key: 'stocks',
  storage: AsyncStorage,

};
const stocksPersistReducer = persistReducer(stocksPersistConfig, stocksReducer);

const counterPersistConfig = {
  key: 'counter',
  storage: AsyncStorage,

};
const counterPersistReducer = persistReducer(counterPersistConfig, counterReducer);

const reducers = combineReducers({
  app: appPersistReducer,
  stocks: stocksPersistReducer,
  counter: counterPersistReducer,
});

// Create the redux store
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: false,
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer())
});

export const persistor = persistStore(store, null, () => null);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch