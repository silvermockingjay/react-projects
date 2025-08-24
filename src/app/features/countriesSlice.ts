import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState: string[] = [];

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    countriesAdded(state, action: PayloadAction<string[]>) {
      state = action.payload;
    },
  },
});

export const { countriesAdded } = countriesSlice.actions;
export const selectCountries = (state: RootState) => state.countries;
export default countriesSlice.reducer;
