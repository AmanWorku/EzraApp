// authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isAuthReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;

      // Store the token in AsyncStorage
      AsyncStorage.setItem('token', action.payload.token || '');
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    signup: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;

      // Assuming the token is part of the payload, update it in local storage as well
      if (action.payload.token) {
        AsyncStorage.setItem('token', action.payload.token);
      }

      // Update the user details in local storage
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: state => {
      state.user = null;

      // Remove the token from AsyncStorage
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    setAuthReady: (state, action) => {
      state.isAuthReady = action.payload;
    },
    setProgress: (state, action) => {
      const {courseId, currentChapter, currentSlide} = action.payload;

      // Error handling for existence of user and progress array
      if (state.user && state.user.progress) {
        // Find the index of the progress item for the specific course
        const progressIndex = state.user.progress.findIndex(
          p => p.courseId === courseId,
        );

        // If the course progress does not exist, initialize it
        if (progressIndex === -1) {
          state.user.progress.push({courseId, currentChapter, currentSlide});
        } else {
          // Update the current chapter and slide in the existing progress item
          state.user.progress[progressIndex].currentChapter = currentChapter;
          state.user.progress[progressIndex].currentSlide = currentSlide;
        }
      } else if (state.user) {
        // If user exists but has no progress, initialize progress with the current details
        state.user.progress = [{courseId, currentChapter, currentSlide}];
      }
    },

    setUser: (state, action) => {
      state.user = action.payload;

      // Store the token in AsyncStorage
      AsyncStorage.setItem('token', action.payload.token || '');
    },
  },
});

export const {
  login,
  signup,
  updateUser,
  logout,
  setAuthReady,
  setProgress,
  setUser,
} = authSlice.actions;
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
export const selectCurrentUser = state => state.auth.user;

export default authSlice.reducer;
