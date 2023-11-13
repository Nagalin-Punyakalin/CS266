import React from 'react';
import { Button, Image, Table, Form } from 'react-bootstrap';

export default function ProductCon() {
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
            <tr>
              <td><Image src="holder.js/171x180" rounded /></td>
              <td>Product #1</td>
              <th>1</th>
              <td>$9,999.00</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="Total" style={rightAlignedStyle}>
        <h4>Total $9,999.00</h4>
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
        <Button variant="primary" type="submit" className="mx-2">
          Order
        </Button>
        <Button variant="danger" type="submit" className="mx-2">
          Cancel
        </Button>
      </div>
    </>
  );
}
