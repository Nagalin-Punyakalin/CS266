import { renderHook, act } from '@testing-library/react'; 
import AddAddress from './AddAddress';
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

jest.mock('../../../lib/axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Unit test AddAddress hook', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should allow user to add an address', async () => {
    const { result } = renderHook(() => AddAddress());

    axios.put.mockResolvedValue({
      status: 201,
      data: { message: 'Address added successfully' }
    });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/user/address',expect.anything())
    expect(Swal.fire).toHaveBeenCalledWith('Address added successfully', '', 'success');
    expect(result.current.error).toBe('');
  });

 it('should handle internal server error',async()=>{
    const { result } = renderHook(() => AddAddress());

    axios.put.mockRejectedValue({
      response: {
        status: 409,
        data: {
          message: 'Internal server error, please try again later'
        }
      }
    });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/user/address',expect.anything())
    expect(result.current.error).toBe('Internal server error, please try again later');
  })

  it('should handle 400 bad request',async()=>{
    const { result } = renderHook(() => AddAddress());

    axios.put.mockRejectedValue({
      response: {
        status: 409,
        data: {
          message: 'Something went wrong , please try again later'
        }
      }
    });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/user/address',expect.anything())
    expect(result.current.error).toBe('Something went wrong , please try again later');
  })
});
