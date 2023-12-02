import { renderHook, act } from '@testing-library/react'; 
import useUpload from './useUpload';
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

jest.mock('../../../lib/axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Unit test useUpload hook', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a slip to database', async () => {
    const { result } = renderHook(() => useUpload());

    axios.post.mockResolvedValue({
      status: 200,
      data: { message: 'Your slip have been uploaded' }
    });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/user/order',expect.anything())
    expect(Swal.fire).toHaveBeenCalledWith('Your slip have been uploaded', '', 'success');
    expect(result.current.error).toBe('');
  });

 

 it('should handle internal server error',async()=>{
    const { result } = renderHook(() => useUpload());

    axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: {
          message: 'Internal server error, please try again later'
        }
      }
    });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.put).toHaveBeenCalledWith('/user/order',expect.anything())
    expect(result.current.error).toBe('Internal server error, please try again later');
  })

  
});
