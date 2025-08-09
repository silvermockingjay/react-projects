import { screen } from '@testing-library/react';
import { Flyout } from './Flyout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { allCleared } from '../../features/cards/cardsSlice';
import { customRender, userSetUp } from '../../test-utils/test-utils';

vi.mock('../../app/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Flyout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockDispatch = vi.fn();

  test('Flyout renders and displays correct amount of selected items', () => {
    const mockedUseAppSelector = vi.mocked(useAppSelector);
    mockedUseAppSelector.mockReturnValue(3);
    customRender(<Flyout />);
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByTestId('flyout')).toHaveTextContent(/3 items/i);
  });
  test('Click on unselect button clears all selected cards', async () => {
    const mockedUseAppDispatch = vi.mocked(useAppDispatch);
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    const { user } = userSetUp(<Flyout />);
    const unselectBtn = screen.getByRole('button', { name: /unselect all/i });
    await user.click(unselectBtn);
    expect(mockDispatch).toHaveBeenCalledWith(allCleared());
  });
});
