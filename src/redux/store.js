import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import authReducer from './authSlice';
import {apiSlice} from './api-slices/apiSlice';

const store = configureStore({
  reducer: {
    course: courseReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// console.log(store.getState());

export default store;
