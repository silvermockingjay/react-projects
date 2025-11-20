import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

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
    restoredFromLS(state, action: PayloadAction<Card[]>) {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { cardToggled, allCleared, restoredFromLS } = cardsSlice.actions;

export const selectCount = (state: RootState) => state.cards.length;
export const selectCheckedCards = (state: RootState) => state.cards;

export default cardsSlice.reducer;
