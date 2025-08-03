import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export function userSetUp(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(<Provider store={store}>{jsx}</Provider>),
  };
}

export const customRender = (elem: React.ReactNode) => {
  render(<Provider store={store}>{elem}</Provider>);
};
