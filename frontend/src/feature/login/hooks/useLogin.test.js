import axios from '../../../lib/axios';
import { useNavigate } from 'react-router-dom';
import useLogin from './useLogin';
import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react'; 
import * as router from 'react-router'
// Mocking the axios module
jest.mock('../../../lib/axios');
const navigate = jest.fn()

// Mocking the react-router-dom module
jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  
// Mocking the useAuth hook
jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    setRole: jest.fn(),
  })),
}));

describe('useLogin', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle user login successfully', async () => {
    const mockToken = 'fakeToken';
    const mockRole = 'user';

    axios.post.mockResolvedValue({
      status: 200,
      data: {
        token: mockToken,
        role: mockRole,
      },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.handleLogin(mockEvent);
    });

    expect(navigate).toHaveBeenCalledWith('/homepage');
    expect(axios.post).toHaveBeenCalledWith('/login',expect.anything())
  });

  

  it('should handle admin login successfully', async () => {
    const mockToken = 'fakeToken';
    const mockRole = 'admin';

    axios.post.mockResolvedValue({
      status: 200,
      data: {
        token: mockToken,
        role: mockRole,
      },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.handleLogin(mockEvent);
    });

    expect(navigate).toHaveBeenCalledWith('/store');
    expect(axios.post).toHaveBeenCalledWith('/login',expect.anything())
  });

  it('should handle invalild login', async () => {
    const mockToken = 'fakeToken';
    const mockRole = 'admin';

    axios.post.mockRejectedValue({
        response: {
          status: 401,
          data: {
            message: 'Invalid username or password'
          }
        }
      });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.handleLogin(mockEvent);
    });

    expect(navigate).not.toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith('/login',expect.anything())
    expect(result.current.error).toBe('Invalid username or password')
  });


});
