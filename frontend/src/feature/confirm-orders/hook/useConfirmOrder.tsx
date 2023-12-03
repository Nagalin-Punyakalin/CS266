import React from 'react'
import { useShoppingCart } from '../../../context/ShoppingCartContext'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function useConfirmOrder() {
  const navigate = useNavigate();
  const { cartItems, getItemTotal, removeCart } = useShoppingCart();

  const handleOrder = async () => {
    try {
      const order = cartItems.map((currItem) => {
        return {
          id: currItem.id,
          quantity: currItem.quantity,
          total: getItemTotal(currItem.id),
        };
      });

      const response = await axios.put('/user/purchase', order);

      await Swal.fire(response.data.message, '', 'success');

      navigate('/order');
      removeCart();
    } catch (err : any) {
      console.log(err);
      Swal.fire(err.response?.data.message || 'An error occurred', '', 'error');
    }
  };

  return {
    handleOrder,
  };
}

