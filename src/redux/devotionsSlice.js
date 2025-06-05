import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import createAxiosInstance from './axiosInstance';

// Async thunk for fetching devotions
export const fetchDevotions = createAsyncThunk(
  'devotions/fetchDevotions',
  async (arg, {getState}) => {
    const token = getState().auth.token;
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get('/devotion/show');
    return response.data;
  },
);
const initialState = {
  form: {
    month: '',
    day: '',
    title: '',
    chapter: '',
    verse: '',
    paragraphs: [],
    prayer: '',
    subTitles: [],
    photo: null,
  },
  devotions: [],
  selectedDevotion: null,
  isEditing: false,
};

const devotionsSlice = createSlice({
  name: 'devotions',
  initialState,
  reducers: {
    selectDevotion: (state, action) => {
      state.selectedDevotion = action.payload;
    },
    startEditing: (state, action) => {
      state.form = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    updateForm: (state, action) => {
      state.form = {...state.form, ...action.payload};
    },
    setDevotions: (state, action) => {
      return action.payload;
    },
    resetForm: state => {
      state.form = initialState.form;
      state.file = initialState.file;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchDevotions.fulfilled, (state, action) => {
      state.devotions = action.payload;
    });
  },
  // ... rest of your slice
});

export const selectForm = state => state.devotions.form;

export const selectParagraphs = state => state.devotions.form.paragraphs;

export const selectPreviewUrl = state => state.devotions.form.photo;

export const selectDevotionToDisplay = state =>
  state.devotions.devotionToDisplay;

export const {
  selectDevotion,
  startEditing,
  setDevotions,
  setIsEditing,
  updateForm,
  resetForm,
} = devotionsSlice.actions;

export default devotionsSlice.reducer;
