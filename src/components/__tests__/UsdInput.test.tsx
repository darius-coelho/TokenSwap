import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsdInput from '../UsdInput';

describe('UsdInput', () => {
  const defaultProps = {
    value: '100',
    onChange: jest.fn(),
  };

  it('renders correctly with initial value', () => {
    render(<UsdInput {...defaultProps} />);
    
    // Check if the input field is rendered
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(100);
    
    // Check if all preset buttons are rendered
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('$10000')).toBeInTheDocument();
  });

  it('handles user input correctly', () => {
    render(<UsdInput {...defaultProps} />);
    
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '250' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('250');
  });

  it('shows error message for invalid input', () => {
    const { rerender } = render(<UsdInput {...defaultProps} value="" />);
    expect(screen.getByText('Input is invalid. Amount must be a positive number.')).toBeInTheDocument();

    rerender(<UsdInput {...defaultProps} value="-100" />);
    expect(screen.getByText('Input is invalid. Amount must be a positive number.')).toBeInTheDocument();

    rerender(<UsdInput {...defaultProps} value="abc" />);
    expect(screen.getByText('Input is invalid. Amount must be a positive number.')).toBeInTheDocument();
  });

  it('handles preset button clicks correctly', async () => {
    render(<UsdInput {...defaultProps} />);
    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // Click $100 button
    expect(defaultProps.onChange).toHaveBeenCalledWith('100');

    fireEvent.click(buttons[1]); // Click $500 button
    expect(defaultProps.onChange).toHaveBeenCalledWith('500');

    fireEvent.click(buttons[2]); // Click $1000 button
    expect(defaultProps.onChange).toHaveBeenCalledWith('1000');

    fireEvent.click(buttons[3]); // Click $10000 button
    expect(defaultProps.onChange).toHaveBeenCalledWith('10000');
  });
}); 