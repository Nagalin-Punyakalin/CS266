import React from 'react'
import { useShoppingCart } from '../../../context/ShoppingCartContext'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function useConfirmOrder() {
  const navigate = useNavigate()
    const {cartItems,getItemTotal,removeCart} = useShoppingCart()
  const handleOrder = ()=>{
    const order = cartItems.map(currItem=>{
        return {
            id : currItem.id,
            quantity : currItem.quantity,
            total : getItemTotal(currItem.id)

        }
    })
    axios.put('/user/purchase',order)
    .then(async response=>{
        Swal.fire(response.data.message, '', 'success')
        .then(()=>{
          navigate('/order')
          removeCart()
        })
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
