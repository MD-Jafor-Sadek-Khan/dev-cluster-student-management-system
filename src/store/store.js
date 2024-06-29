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
import storage from 'redux-persist/lib/storage'; 
import authReducer from './authSlice';
import studentReducer from './studentSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const studentsPersistConfig = {
  key: 'students',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedStudentsReducer = persistReducer(studentsPersistConfig, studentReducer);

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

const persistor = persistStore(store);

export { store, persistor };
