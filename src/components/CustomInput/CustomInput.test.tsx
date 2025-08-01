import { render, screen } from '@testing-library/react';
import type { InputProps } from './CustomInput';
import { CustomInput } from './CustomInput';
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
    customClass: 'searchBar',
    placeholder: 'Search for character',
  },
];

describe('CustomInput', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  mockData.forEach((setOfAttributes) => {
    test('input renders successfully with provided attributes', () => {
      render(<CustomInput {...setOfAttributes} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', setOfAttributes.type);
      expect(input).toHaveValue(setOfAttributes.value);
      if (setOfAttributes.customClass) {
        expect(input).toHaveClass(setOfAttributes.customClass);
      }
      if (setOfAttributes.placeholder) {
        expect(
          screen.getByPlaceholderText(setOfAttributes.placeholder)
        ).toBeInTheDocument();
      }
    });
  });
  test('calls the onChange callback handler', async () => {
    const { user } = userSetUp(<CustomInput {...mockData[1]} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Morty');
    expect(mockOnChange).toHaveBeenCalled();
  });
});
