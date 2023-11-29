import React from 'react';
import { Table } from 'react-bootstrap';

import { formatCurrency } from '../../../utilities/formatCurrency';
import useFetch from '../../../hooks/useFetch';

export default function ProductCon() {
  interface OrderItems {
    name: string;
    total: number;
    quantity: number;
    status: string;
  }

  const [data, error] = useFetch<OrderItems[]>('/user/order', []);

  console.log(data);

  const centerContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20vh',
  };

  const rightAlignedStyle: React.CSSProperties = {
    textAlign: 'right',
  };

  return (
    <>
      <div className="Header" style={centerContentStyle}>
        <h1>Purchase list</h1>
      </div>

      <div className="ProductList" style={centerContentStyle}>
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Total amount</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((currItems, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{currItems.name}</td>
                <th>{currItems.quantity}</th>
                <td>{formatCurrency(currItems.total)}</td>
                <td>{currItems.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="Total" style={rightAlignedStyle}>
        <h4>{formatCurrency(data?.reduce((total, currData) => total + (currData?.total ?? 0), 0) ?? 0)}</h4>
      </div>
    </>
  );
}
