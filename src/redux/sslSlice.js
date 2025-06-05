import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sslData: [], // Data for SSL
  inVerseData: [], // Data for InVerse
};

const sslSlice = createSlice({
  name: 'ssl',
  initialState,
  reducers: {
    setSSLData: (state, action) => {
      state.sslData = action.payload;
    },
    setInVerseData: (state, action) => {
      state.inVerseData = action.payload;
    },
  },
});

export const {setSSLData, setInVerseData} = sslSlice.actions;

export default sslSlice.reducer;
