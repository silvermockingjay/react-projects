import { render, screen } from '@testing-library/react';
import { CustomButton } from './CustomButton';
import type { CustomButtonProps } from './CustomButton';
import styles from './CustomButton.module.css';
import { userSetUp } from '../../test-utils/test-utils';

const onClick = vi.fn();

const mockData: CustomButtonProps[] = [
  {
    type: 'submit',
    customClass: 'mockButton',
    text: 'Search',
    onClick: onClick,
  },
  {
    text: 'Search',
  },
];

describe('CustomButton', () => {
  beforeEach(() => {
    onClick.mockClear();
  });

  test('button renders successfully with all props', () => {
    render(<CustomButton {...mockData[0]} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', mockData[0].type);
    expect(button).toHaveTextContent(mockData[0].text);
    if (mockData[0].customClass) {
      expect(button).toHaveClass(mockData[0].customClass);
    }
  });

  test('calls the onClick callback handler', async () => {
    const { user } = userSetUp(<CustomButton {...mockData[0]} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('button renders successfully only with required props', () => {
    render(<CustomButton {...mockData[1]} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(() => button.click()).not.toThrow();
    expect(button).toHaveTextContent(mockData[1].text);
    expect(button).toHaveClass(styles.button);
  });
});
