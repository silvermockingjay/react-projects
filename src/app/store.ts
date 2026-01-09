import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './features/formsSlice';
import countriesReducer from './features/countriesSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    countries: countriesReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
