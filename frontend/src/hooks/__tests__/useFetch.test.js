import { renderHook, act } from '@testing-library/react-hooks'; // Note the import change
import axios from '../../lib/axios';
import useFetch from '../useFetch';

jest.mock('../../lib/axios');

describe('Unit test useFetch hook', () => {
  it('should retrieve the data correctly', async () => {
    axios.get.mockResolvedValue({
      data: {
        name: "John Doe",
      }
    });
    const { result, waitForNextUpdate } = renderHook(() => useFetch('url', []));
    
    
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe('')


    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current[0]).toEqual({name: "John Doe"})
    expect(result.current[1]).toBe('')
  });

  it('should handle internal server error',async()=>{
    axios.get.mockRejectedValue({
      response: {
        data: {
          message: "cannot fetch",
        }
      }
     
    });
    const { result, waitForNextUpdate } = renderHook(() => useFetch('url', []));
    
    
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe('')


    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current[0]).toEqual([])
    expect(result.current[1]).toBe('cannot fetch')

  })
});
