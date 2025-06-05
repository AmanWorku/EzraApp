import {configureStore} from '@reduxjs/toolkit';
import sslReducer from './sslSlice'; // Import the sslSlice
import courseReducer from './courseSlice';
import devotionsReducer from './devotionsSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import languageReducer from './languageSlice';
import {apiSlice} from './api-slices/apiSlice';
import {SSLapi} from '../services/SabbathSchoolApi';
import {InVerseapi} from '../services/InVerseapi'; // Import the InVerseapi
import {videoLinksApi} from '../services/videoLinksApi'; // Import the videoLinksApi
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {setupListeners} from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  ssl: sslReducer, // Add the ssl reducer
  ui: uiReducer,
  course: courseReducer,
  devotions: devotionsReducer,
  auth: authReducer,
  language: languageReducer,
  [SSLapi.reducerPath]: SSLapi.reducer,
  [InVerseapi.reducerPath]: InVerseapi.reducer, // Add the InVerseapi reducer
  [apiSlice.reducerPath]: apiSlice.reducer,
  [videoLinksApi.reducerPath]: videoLinksApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    'ssl', // Persist the ssl state
    'ui',
    'auth',
    'language',
    SSLapi.reducerPath,
    InVerseapi.reducerPath, // Persist the InVerseapi state
    apiSlice.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      SSLapi.middleware,
      InVerseapi.middleware, // Add the InVerseapi middleware
      apiSlice.middleware,
      videoLinksApi.middleware,
    ),
});

export const persistor = persistStore(store, null, () => {
  const Rehydration = store.getState();
});

setupListeners(store.dispatch);
