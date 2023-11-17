import React from 'react'
import { useShoppingCart } from '../../../context/ShoppingCartContext'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2'
export default function useConfirmOrder() {
    const {cartItems,getItemTotal} = useShoppingCart()
  const handleOrder = ()=>{
    const order = cartItems.map(currItem=>{
        return {
            id : currItem.id,
            quantity : currItem.quantity,
            total : getItemTotal(currItem.id)

        }
    })
    axios.put('/user/purchase',order)
    .then(response=>{
        Swal.fire(response.data.message, '', 'success')
    })
    .catch(err=>{
        Swal.fire(err.response.data.message, '', 'error')
        console.log(err)
    })
  }

  return {
    handleOrder
  }
}
