import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
  },
});

export const { setSearchTerm, setResults } = searchSlice.actions;

export default searchSlice.reducer;
