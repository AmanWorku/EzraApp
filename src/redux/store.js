import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import devotionsReducer from './devotionsSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import {apiSlice} from './api-slices/apiSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    course: courseReducer,
    devotions: devotionsReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// console.log(store.getState());

export default store;
