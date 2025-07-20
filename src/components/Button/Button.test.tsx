import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import type { ButtonProps } from './Button';
import styles from './Button.module.css';
import { userSetUp } from '../../test-utils/test-utils';

const onClick = vi.fn();

const mockData: ButtonProps[] = [
  {
    type: 'submit',
    className: 'mockButton',
    text: 'Search',
    onClick: onClick,
  },
  {
    text: 'Search',
  },
];

describe('Button', () => {
  beforeEach(() => {
    onClick.mockClear();
  });

  test('button renders successfully with all props', () => {
    render(<Button {...mockData[0]} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', mockData[0].type);
    expect(button).toHaveTextContent(mockData[0].text);
    if (mockData[0].className) {
      expect(button).toHaveClass(mockData[0].className);
    }
  });

  test('calls the onClick callback handler', async () => {
    const { user } = userSetUp(<Button {...mockData[0]} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('button renders successfully only with required props', () => {
    render(<Button {...mockData[1]} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(() => button.click()).not.toThrow();
    expect(button).toHaveTextContent(mockData[1].text);
    expect(button).toHaveClass(styles.button);
  });
});
