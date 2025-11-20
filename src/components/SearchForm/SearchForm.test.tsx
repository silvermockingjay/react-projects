import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import type { FormProps } from './SearchForm';
import { userSetUp } from '../../test-utils/test-utils';

const mockOnChange = vi.fn();
const mockOnSubmit = vi.fn();

const mockData: FormProps = {
  value: 'Morty',
  onChange: mockOnChange,
  onSubmit: (e) => {
    e.preventDefault();
    mockOnSubmit();
  },
};

describe('SearchForm', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnSubmit.mockClear();
  });

  test('renders form with input and button', () => {
    render(<SearchForm {...mockData} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  test('calls onSubmit when form is submitted', async () => {
    const { user } = userSetUp(<SearchForm {...mockData} />);
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
