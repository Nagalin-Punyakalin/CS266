import React from 'react';
import { Button, Table, Form } from 'react-bootstrap';

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
  };

  const borderedCellLeft: React.CSSProperties = {
    border: '4px solid #F8F9FA',
    background: '#ffff',
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '12px',
    textAlign: 'center',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
  };

  const borderedCellRight: React.CSSProperties = {
    border: '4px solid #F8F9FA',
    background: '#ffff',
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
    padding: '12px',
    textAlign: 'center',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
    borderRight: 'none'
  }



  const borderMiddle: React.CSSProperties = {
    border: '4px solid #F8F9FA',
    background: '#ffff',
    padding: '12px',
    textAlign: 'center',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
  };


  const borderProductLeft: React.CSSProperties = {
    border: '4px solid #F8F9FA',
    background: '#ffff',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    padding: '4px',
    textAlign: 'center',
    
  }

  const borderProductMiddle: React.CSSProperties = {
    border: '4px solid #F8F9FA',
    background: '#ffff',
    padding: '4px',
    textAlign: 'center',
    
  }

  const borderProductRight: React.CSSProperties = {
    border: '4px solid #F8F9FA',
    background: '#ffff',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    padding: '4px',
    textAlign: 'center',
    
  }


  const centerText: React.CSSProperties = {
    textAlign: 'center',
  };

  const ButtonAttachslip: React.CSSProperties = {
    border: '4px solid #F8F9FA',
    padding: '4px',
    textAlign: 'center',
    height: '',
    width: '112px', 
  };

  const HeadList: React.CSSProperties = {
    marginBottom: '20px',
  };
  
  const List: React.CSSProperties = {
    marginBottom: '15px',
  };

  const SpaceAfterList: React.CSSProperties = {
    marginBottom: '20px',
  };

  const RemoveLine: React.CSSProperties = {
    border: '#F8F9FA'
  }

  const DeletText: React.CSSProperties = {
    visibility: 'hidden',
  }

  return (
    <>
      <div className="Header" style={centerContentStyle}>
        <h1>Purchase list</h1>
        <p>List the status of your ordered products.</p>
      </div>
      

      <div className="ProductList" style={centerContentStyle}>
        <div>
          <h1></h1>
        </div>
        <Table>
          <thead>
            <tr className='HeadList' style={HeadList}>
              <th style={borderedCellLeft}>Order no.</th> 
                <th style={borderMiddle}>Order Status</th> 
                <th style={borderedCellRight}>Order price</th>
            </tr>
          </thead>
          <p style={RemoveLine}></p>
          <tbody style={RemoveLine}>
            {data?.map((currItems, index) => (
              <tr key={index} className='List'  style={{ ...List, ...SpaceAfterList }}>
                <td style={{ ...borderProductLeft, ...centerText,}}><strong>{++index}</strong>
                <p>Product Name</p>
                <p>{currItems.name}</p>
                </td>
                <td style={{ ...borderProductMiddle, ...centerText }}>
                <p style={DeletText}> - </p>
                <strong>{currItems.status}</strong></td>
                <td style={{ ...borderProductRight, ...centerText }}>
                <strong>{formatCurrency(currItems.total)}</strong>
                <p>Price of each product</p>
                <p>{formatCurrency(currItems.total)}</p></td>
                <td style={ButtonAttachslip}>
                  <Button variant="success">Attach slip</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
