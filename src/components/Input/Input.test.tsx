import { render, screen } from '@testing-library/react';
import type { InputProps } from './Input';
import { Input } from './Input';
import { userSetUp } from '../../test-utils/test-utils';

const mockOnChange = vi.fn();
const mockData: InputProps[] = [
  {
    type: 'text',
    value: 'Rick',
  },
  {
    type: 'text',
    value: '',
    onChange: mockOnChange,
    className: 'searchBar',
    placeholder: 'Search for character',
  },
];

describe('Input', () => {
  mockData.forEach((setOfAttributes) => {
    test('input renders successfully with provided attributes', () => {
      render(<Input {...setOfAttributes} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', setOfAttributes.type);
      expect(input).toHaveValue(setOfAttributes.value);
      if (setOfAttributes.className) {
        expect(input).toHaveClass(setOfAttributes.className);
      }
      if (setOfAttributes.placeholder) {
        expect(
          screen.getByPlaceholderText(setOfAttributes.placeholder)
        ).toBeInTheDocument();
      }
    });
  });
  test('calls the onChange callback handler', async () => {
    const { user } = userSetUp(<Input {...mockData[1]} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Morty');
    expect(mockOnChange).toHaveBeenCalled();
  });
});
