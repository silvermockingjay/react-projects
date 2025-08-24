import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './features/formsSlice';

export const store = configureStore({
  reducer: { forms: formsReducer },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
