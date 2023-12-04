import { renderHook, act } from '@testing-library/react';
import useUpload from './useUpload';
import axios from '../../../lib/axios';
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

  it('should save a slip to the database', async () => {
    const { result } = renderHook(() => useUpload(1112));


    axios.post.mockResolvedValue({
      status: 201,
      data: { message: 'Your slip has been uploaded' },
    });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.post).toHaveBeenCalledWith('/user/slip', expect.any(FormData));
    expect(Swal.fire).toHaveBeenCalledWith('Your slip has been uploaded', '', 'success');
    expect(result.current.error).toBe('');
  });

  it('should handle internal server error', async () => {
    const { result } = renderHook(() => useUpload(1112));

    axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: {
          message: 'Internal server error, please try again later',
        },
      },
    });

    await act(async () => {
      result.current.handleSubmit(mockEvent);
    });

    expect(axios.post).toHaveBeenCalledWith('/user/slip', expect.any(FormData));
    expect(result.current.error).toBe('Internal server error, please try again later');
  });
});
