import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../features/cards/CardsSlice';

export const store = configureStore({ reducer: cardsReducer });

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
