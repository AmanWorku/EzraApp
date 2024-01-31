import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

// Attempt to get the system preference for dark mode
const systemPreference = Appearance.getColorScheme();

const initialState = {
  // Start with system preference or default to light mode
  darkMode: systemPreference === 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {toggleDarkMode} = uiSlice.actions;

export default uiSlice.reducer;
