import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Status from './Status';

jest.mock('../../../hooks/useFetch', () => () => [[], null]);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
describe('Status Component', () => {
  test('renders purchase list header', () => {
    render(<Status />);
    const headerElement = screen.getByText(/Purchase list/i);
    expect(headerElement).toBeInTheDocument('Header Not Found');
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

    
    jest.mock('./Status', () => () => [orderData, null]);

    render(<Status />);

    
    const orderNumber = screen.getByText(/Order no\./i);
    const orderStatus = screen.getByText(/Order Status/i);
    const orderPrice = screen.getByText(/Order price/i);

    expect(orderNumber).toBeInTheDocument('Number Not Found');
    expect(orderStatus).toBeInTheDocument('Status Not Found');
    expect(orderPrice).toBeInTheDocument('Price Not Found');
  });

  

});
