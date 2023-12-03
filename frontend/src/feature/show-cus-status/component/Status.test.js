import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Status from './Status';

// Mock the useFetch hook
jest.mock('../../../hooks/useFetch', () => () => [[], null]);

describe('Status Component', () => {
  test('renders purchase list header', () => {
    render(<Status />);
    const headerElement = screen.getByText(/Purchase list/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders order details', () => {
    const orderData = [
      [
        {
          quantity: 2,
          status: 'Shipped',
          total: 100,
          productName: 'Product A',
          orderID: 1,
        },
      ],
    ];

    // Mock the Status hook to return the sample orderData
    jest.mock('./Status', () => () => [orderData, null]);

    render(<Status />);

    // Check if order details are rendered
    const orderNumber = screen.getByText(/Order no\./i);
    const orderStatus = screen.getByText(/Order Status/i);
    const orderPrice = screen.getByText(/Order price/i);

    expect(orderNumber).toBeInTheDocument();
    expect(orderStatus).toBeInTheDocument();
    expect(orderPrice).toBeInTheDocument();
  });

});
