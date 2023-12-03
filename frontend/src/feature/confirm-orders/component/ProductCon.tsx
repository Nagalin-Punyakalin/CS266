import React, { useEffect } from 'react';
import { Button, Image, Table, Form } from 'react-bootstrap';
import { useShoppingCart } from '../../../context/ShoppingCartContext';
import { formatCurrency } from '../../../utilities/formatCurrency';
import Swal from 'sweetalert2';
import useConfirmOrder from '../hook/useConfirmOrder';
import { useNavigate, Link } from 'react-router-dom';
export default function ProductCon() {
  const navigate = useNavigate()
  const {
    cartItems,
    getItemQuantity,
    closeCart,
    removeCart
  } = useShoppingCart()

  const {
    handleOrder
  } = useConfirmOrder()

  useEffect(()=>{
    closeCart()
  },[])


  const centerContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20vh',
  };

  const flexContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
  };

  const rightAlignedStyle: React.CSSProperties = {
    textAlign: 'right',
  };

  return (
    <>
      <div className="Header" style={centerContentStyle}>
        <h1>Product list</h1>
        <label>This is a list of all the items you ordered.</label>
      </div>

      <div className="ProductList" style={centerContentStyle}>
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Total amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              cartItems.map((currItems,index)=>(
                <tr>
                <td>{++index}</td>
                <td>{currItems.name}</td>
                <th>{getItemQuantity(currItems.id)}</th>
                <td>{formatCurrency(currItems.price * currItems.quantity)}</td>
              </tr>
              ))
            }
           
            
          </tbody>
        </Table>
      </div>

      <div className="Total" style={rightAlignedStyle}>
        <h4>{formatCurrency(
          cartItems.reduce((total,cartItem)=>{
           const item = cartItems.find(i => i.id === cartItem.id)
           return total + (item?.price || 0) * cartItem.quantity
        },0))}
        </h4>
      </div>

      <div className="Button" style={flexContainerStyle}>
        <Button onClick={()=>{
          Swal.fire({
            title: "Are you sure you want to confirm this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then(async(result) => {
            if (result.isConfirmed) {
              handleOrder()
            }
          });
        }} variant="primary" type="submit" className="mx-2">
          Order
        </Button>
        <Button onClick={()=>navigate('/store')} variant="danger" type="submit" className="mx-2">
          Cancel
        </Button>
      </div>
    </>
  );
}