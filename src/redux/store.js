import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import devotionsReducer from './devotionsSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import {apiSlice} from './api-slices/apiSlice';
import {SSLapi} from '../services/SabbathSchoolApi';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    course: courseReducer,
    devotions: devotionsReducer,
    auth: authReducer,
    [SSLapi.reducerPath]: SSLapi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(SSLapi.middleware, apiSlice.middleware),
});

// console.log(store.getState());

export default store;
