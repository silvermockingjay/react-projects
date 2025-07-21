import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';

export function userSetUp(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
