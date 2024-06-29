import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice';
import studentReducer from './studentSlice';

// Create persist configuration for each reducer
const authPersistConfig = {
  key: 'auth',
  storage,
};

const studentsPersistConfig = {
  key: 'students',
  storage,
};

// Wrap reducers with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedStudentsReducer = persistReducer(studentsPersistConfig, studentReducer);

// Configure the store with persisted reducers and add middleware for redux-persist
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    students: persistedStudentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
