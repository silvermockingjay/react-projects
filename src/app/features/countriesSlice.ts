import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { countries } from '../../utils/countries';

const initialState: string[] = [...countries];

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    countriesAdded(_state, action: PayloadAction<string[]>) {
      return action.payload;
    },
  },
});

export const { countriesAdded } = countriesSlice.actions;
export const selectCountries = (state: RootState) => state.countries;
export default countriesSlice.reducer;
