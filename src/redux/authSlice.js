import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  role: null,
  firstName: null,
  lastName: null,
  token: null,
  isAuthReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    logout: state => {
      state.user = null;
      state.role = null;
      state.firstName = null;
      state.lastName = null;
      state.token = null;
    },
    setAuthReady: (state, action) => {
      state.isAuthReady = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const loginUser = userData => async dispatch => {
  await AsyncStorage.setItem('token', userData.token);
  dispatch(authSlice.actions.login(userData));
};

export const signupUser = userData => async dispatch => {
  await AsyncStorage.setItem('token', userData.token);
  dispatch(authSlice.actions.signup(userData));
};

export const logoutUser = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch(authSlice.actions.logout());
};

export const {login, signup, logout, updateUser, setAuthReady} =
  authSlice.actions;

export default authSlice.reducer;
