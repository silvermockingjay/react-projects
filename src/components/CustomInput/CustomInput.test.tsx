import { render, screen } from '@testing-library/react';
import type { InputProps } from './CustomInput';
import { CustomInput } from './CustomInput';
import { userSetUp } from '../../test-utils/test-utils';

const mockOnChange = vi.fn();
const mockData: InputProps[] = [
  {
    type: 'text',
    value: 'Rick',
    onChange: mockOnChange,
  },
  {
    type: 'text',
    value: '',
    onChange: mockOnChange,
    customClass: 'searchBar',
    placeholder: 'Search for character',
  },
];

const mockDataForCheckbox: InputProps = {
  type: 'checkbox',
  onChange: mockOnChange,
  customClass: 'checkbox',
  isChecked: false,
};

describe('CustomInput', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  mockData.forEach((setOfAttributes) => {
    test('input of type "text" renders successfully with provided attributes', () => {
      render(<CustomInput {...setOfAttributes} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', setOfAttributes.type);
      if (setOfAttributes.value) {
        expect(input).toHaveValue(setOfAttributes.value);
      }
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
  test('input of type "text" calls the onChange callback handler', async () => {
    const { user } = userSetUp(<CustomInput {...mockData[1]} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Morty');
    expect(mockOnChange).toHaveBeenCalled();
  });
  test('input of type "checkbox" renders successfully, initially checkbox is not checked', async () => {
    const { user } = userSetUp(<CustomInput {...mockDataForCheckbox} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
  });
});
