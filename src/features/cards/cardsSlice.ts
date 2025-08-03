import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  id: number;
  image: string;
  name: string;
}

const initialState: Card[] = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    cardToggled(state, action: PayloadAction<Card>) {
      const { id } = action.payload;
      const selectedCardIndex = state.findIndex((card: Card) => card.id === id);
      if (selectedCardIndex !== -1) {
        state.splice(selectedCardIndex, 1);
      } else {
        state.push(action.payload);
      }
    },
    allCleared(state) {
      state.length = 0;
    },
  },
});

export const { cardToggled } = cardsSlice.actions;
export const { allCleared } = cardsSlice.actions;

export default cardsSlice.reducer;
