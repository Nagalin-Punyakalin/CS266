import { renderHook, act } from '@testing-library/react'; 
import useAddProduct from './useAddProduct';
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

jest.mock('../../../lib/axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Unit test useAddProduct hook', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should allow admin to add a new product', async () => {
    const { result } = renderHook(() => useAddProduct());

    axios.put.mockResolvedValue({ status: 201 });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/add-product',expect.anything())
    expect(Swal.fire).toHaveBeenCalledWith('Product added successfully', '', 'success');
    expect(result.current.error).toBe('');
  });

  it('should not allow admin to add a new product', async () => {
    const { result } = renderHook(() => useAddProduct());

    axios.put.mockRejectedValue({ response: { status: 409 } });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/add-product',expect.anything())
    expect(result.current.error).toBe('Your product is already exists in the store');
  });

 it('should handle internal server error',async()=>{
    const { result } = renderHook(() => useAddProduct());

    axios.put.mockRejectedValue({ response: { status: 500 } });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/add-product',expect.anything())
    expect(result.current.error).toBe('Internal server error, please try again later');
  })
});
