import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import devotionsReducer from './devotionsSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import languageReducer from './languageSlice'; // Import the languageSlice
import {apiSlice} from './api-slices/apiSlice';
import {SSLapi} from '../services/SabbathSchoolApi';
import {videoLinksApi} from '../services/videoLinksApi'; // Import the videoLinksApi
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {setupListeners} from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  ui: uiReducer,
  course: courseReducer,
  devotions: devotionsReducer,
  auth: authReducer,
  language: languageReducer, // Add the language reducer
  [SSLapi.reducerPath]: SSLapi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [videoLinksApi.reducerPath]: videoLinksApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    SSLapi.reducerPath,
    apiSlice.reducerPath,
    'ui',
    'auth',
    'language',
  ], // Add 'language' to the whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(SSLapi.middleware, apiSlice.middleware, videoLinksApi.middleware), // Add the videoLinksApi middleware
});

export const persistor = persistStore(store, null, () => {
  const Rehydration = store.getState();
});

setupListeners(store.dispatch);
