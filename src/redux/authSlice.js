import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  _id: null,
  user: null,
  role: null,
  email: null,
  firstName: null,
  lastName: null,
  token: null,
  isAuthReady: false,
  progress: [], // Add an empty array for progress
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload._id;
      state.user = action.payload;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    signup: (state, action) => {
      state._id = action.payload._id;
      state.user = action.payload;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    logout: state => {
      state._id = null;
      state.user = null;
      state.role = null;
      state.firstName = null;
      state.lastName = null;
      state.token = null;
      state.progress = []; // Reset progress to an empty array
    },
    setAuthReady: (state, action) => {
      state.isAuthReady = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    setProgress: (state, action) => {
      const {courseId, currentChapter, currentSlide} = action.payload;

      // Find the index of the progress item for the specific course
      const progressIndex = state.progress.findIndex(
        p => p.courseId === courseId,
      );

      // If the course progress does not exist, initialize it
      if (progressIndex === -1) {
        state.progress.push({courseId, currentChapter, currentSlide});
      } else {
        // Update the current chapter and slide in the existing progress item
        state.progress[progressIndex].currentChapter = currentChapter;
        state.progress[progressIndex].currentSlide = currentSlide;
      }
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

export const {login, signup, logout, updateUser, setAuthReady, setProgress} =
  authSlice.actions;

export default authSlice.reducer;
