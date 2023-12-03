import { renderHook, act } from '@testing-library/react';
import useConfirmOrder from './useConfirmOrder';
import axios from '../../../lib/axios';
import Swal from 'sweetalert2';
import React from 'react';
jest.mock('../../../context/ShoppingCartContext', () => ({
  useShoppingCart: jest.fn(() => ({
    cartItems: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ],
    getItemQuantity: jest.fn(),
    getItemTotal: jest.fn(),
    removeCart: jest.fn()
  })),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../../lib/axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Unit test useConfirmOrder hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to confirm the order', async () => {
    const { result } = renderHook(() =>useConfirmOrder());

    axios.put.mockResolvedValue({
      status: 200,
      data: { message: 'Your orders have been confirmed' },
    });

    await act(async () => {
      result.current.handleOrder();
    });

    expect(axios.put).toHaveBeenCalledWith('/user/purchase', expect.anything());
    expect(Swal.fire).toHaveBeenCalledWith('Your orders have been confirmed', '', 'success');
  });

  it('should not be able to confirm the order that does not exist', async () => {
    const { result } = renderHook(() => useConfirmOrder());

    axios.put.mockRejectedValue({
        response: {
          status: 404,
          data: {
            message: 'Product not found'
          }
        }
      });

    await act(async () => {
      result.current.handleOrder();
    });

    expect(axios.put).toHaveBeenCalledWith('/user/purchase', expect.anything());
    expect(Swal.fire).toHaveBeenCalledWith('Product not found', '', 'error');
  });

  it('should handle internal server error', async () => {
    const { result } = renderHook(() => useConfirmOrder());

    axios.put.mockRejectedValue({
        response: {
          status: 500,
          data: {
            message: 'Internal server error, please try again later'
          }
        }
      });

    await act(async () => {
      result.current.handleOrder();
    });

    expect(axios.put).toHaveBeenCalledWith('/user/purchase', expect.anything());
    expect(Swal.fire).toHaveBeenCalledWith('Internal server error, please try again later', '', 'error');
  });
});
