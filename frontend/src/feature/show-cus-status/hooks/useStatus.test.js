import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { act } from '@testing-library/react-hooks';
import useStatus from './useStatus';

// Mock axios
jest.mock('axios');

describe('useStatus component', () => {
  it('renders without crashing', () => {
    const { result } = renderHook(() => useStatus());
    expect(result.error).toBeUndefined();
  });

  it('renders the header and purchase list', () => {
    const { result } = renderHook(() => useStatus());
    expect(result.current).toBeTruthy();
  });

  it('renders order items', async () => {
    const mockData = [
      {
        name: 'Product 1',
        total: 10,
        quantity: 2,
        status: 'Pending',
      },
      {
        name: 'Product 2',
        total: 20,
        quantity: 1,
        status: 'Completed',
      },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useStatus());

    await act(async () => {
      await waitForNextUpdate();
    });

    // Check if product names, statuses, and total prices are rendered
    mockData.forEach((item) => {
      expect(result.current.data.some((product) => product.name === item.name)).toBe(true);
      expect(result.current.data.some((product) => product.total === item.total)).toBe(true);
      expect(result.current.data.some((product) => product.quantity === item.quantity)).toBe(true);
      expect(result.current.data.some((product) => product.status === item.status)).toBe(true);
    });
  });
});
