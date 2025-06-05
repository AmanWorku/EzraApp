import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'am', // Default language is Amharic
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: state => {
      state.language = state.language === 'am' ? 'en' : 'am';
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {toggleLanguage, setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
