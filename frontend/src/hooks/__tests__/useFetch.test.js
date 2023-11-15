import { renderHook } from "@testing-library/react";
import axios from '../../lib/axios';
import useFetch from '../useFetch';
import { act } from "react-dom/test-utils";

jest.mock('../../lib/axios');

describe('Unit test useFetch hook', () => {
    it('should set the data properly', async () => {
        axios.get.mockResolvedValue({
            status: 200,
            data: {
                name: 'name',
                price: 100,
                imageName: 'image'
            }
        });

        let result;

        await act(async () => {
            const { result } = renderHook(() => useFetch({ url: '/user/product' }));
           
            expect(result.current.error)
        });

        expect(axios.get).toHaveBeenCalledWith('/user/product');
      
    });
});
