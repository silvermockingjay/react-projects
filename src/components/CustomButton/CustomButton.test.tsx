import { render, screen } from '@testing-library/react';
import { CustomButton } from './CustomButton';
import type { CustomButtonProps } from './CustomButton';
import styles from './CustomButton.module.css';
import { userSetUp } from '../../test-utils/test-utils';

const onClick = vi.fn();

const mockAllProps: CustomButtonProps = {
  type: 'submit',
  style: 'primary',
  text: 'Search',
  onClick: onClick,
  isDisabled: false,
};

const mockRequiredProps: CustomButtonProps = {
  style: 'primary',
  text: 'Search',
};

describe('CustomButton', () => {
  beforeEach(() => {
    onClick.mockClear();
  });

  test('button renders successfully with all props', () => {
    render(<CustomButton {...mockAllProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent(/search/i);
    expect(button).toHaveClass(styles.primary);
  });

  test('calls the onClick callback handler', async () => {
    const { user } = userSetUp(<CustomButton {...mockAllProps} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('button renders successfully only with required props', () => {
    render(<CustomButton {...mockRequiredProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(() => button.click()).not.toThrow();
    expect(button).toHaveTextContent(/search/i);
    expect(button).toHaveClass(styles.button);
  });
});
