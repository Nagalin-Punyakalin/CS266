import React from 'react';
import { Button, Image, Table, Form } from 'react-bootstrap';
import { useShoppingCart } from '../../../context/ShoppingCartContext';
import { formatCurrency } from '../../../utilities/formatCurrency';
import Swal from 'sweetalert2';
import useConfirmOrder from '../hook/useConfirmOrder';
export default function ProductCon() {
  const {
    cartItems,
    getItemQuantity
  } = useShoppingCart()

  const {
    handleOrder
  } = useConfirmOrder()

  const centerContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20vh',
  };

  const Paymethod: React.CSSProperties = {
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

      <div className="Paymethod" style={Paymethod}>
        <Form>
          <Form.Group>
            <Form.Label>Payment Method</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                id="cashOnDelivery"
              />
              <Form.Check
                type="radio"
                label="Debit/Credit Card"
                name="paymentMethod"
                id="debitCreditCard"
              />
              <Form.Check
                type="radio"
                label="Paypal"
                name="paymentMethod"
                id="paypal"
              />
            </div>
          </Form.Group>
        </Form>
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
          }).then((result) => {
            if (result.isConfirmed) {
              handleOrder()
            }
          });
        }} variant="primary" type="submit" className="mx-2">
          Order
        </Button>
        <Button variant="danger" type="submit" className="mx-2">
          Cancel
        </Button>
      </div>
    </>
  );
}