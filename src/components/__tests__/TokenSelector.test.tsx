import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TokenSelector from '../TokenSelector';
import { Token } from '../../types';

const mockTokens: Token[] = [
    { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin', chainId: '1' },
    { id: 'tether', symbol: 'USDT', name: 'Tether', chainId: '137' } 
];

describe('TokenSelector', () => {
  const defaultProps = {
    token: mockTokens[0],
    amount: '1.5',
    price: 50000,
    tokens: mockTokens,
    onTokenChange: jest.fn(),
    label: 'From',
  };

  it('renders correctly with all props', () => {
    render(<TokenSelector {...defaultProps} />);
    
    // Check if label is rendered
    expect(screen.getByText('From')).toBeInTheDocument();
    
    // Check if token selector is rendered with correct value
    expect(screen.getByRole('combobox')).toHaveTextContent('USDC (USD Coin)');
    
    // Check if amount field is rendered with correct value
    expect(screen.getByRole('spinbutton')).toHaveValue(1.5);
    
    // Check if price is displayed correctly
    expect(screen.getByText('Current price: $50,000.00')).toBeInTheDocument();
  });

  it('handles token selection change', () => {
    render(<TokenSelector {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    // Check for second token and select it
    const option = screen.getByText('USDT (Tether)');
    fireEvent.click(option);
    
    expect(defaultProps.onTokenChange).toHaveBeenCalled();
  });

  it('renders in readonly mode correctly', () => {
    render(<TokenSelector {...defaultProps} readOnly={true} />);
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('readonly');
  });

  it('displays formatted price correctly for different values', () => {
    // Check if the price is rounded down to 6 decimal places
    const { rerender } = render(<TokenSelector {...defaultProps} price={10000.9191919} />);
    expect(screen.getByText('Current price: $10,000.919192')).toBeInTheDocument();

    // Check if two zeros are added after a decimal point to the price if it is round
    rerender(<TokenSelector {...defaultProps} price={1000000} />);
    expect(screen.getByText('Current price: $1,000,000.00')).toBeInTheDocument();
  });
}); 