import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import devotionsReducer from './devotionsSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import {apiSlice} from './api-slices/apiSlice';
import {SSLapi} from '../services/SabbathSchoolApi';
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
  [SSLapi.reducerPath]: SSLapi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [SSLapi.reducerPath, apiSlice.reducerPath, 'ui'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(SSLapi.middleware, apiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
