import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTerms: boolean;
  picture: string;
  country: string;
}

const initialState: Form[] = [];

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    dataSubmitted(state, action: PayloadAction<Form>) {
      state.push(action.payload);
    },
  },
});

export const { dataSubmitted } = formsSlice.actions;
export const selectFormsData = (state: RootState) => state.forms;
export default formsSlice.reducer;
