import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { formatCurrency } from '../../../utilities/formatCurrency';
import imgQR from '../../../../public/imgs/QR.png';
import useUpload from '../hook/useUpload';

type LocationState = {
  totalPrice: number;
  orderID : number
}
export default function SlipPayment() {
  const location = useLocation()
  const [totalPrice,setTotalPrice] = useState<number>(0)
  const [orderID,setOrderID] = useState<number>(0)

  useEffect(() => {
    const state = location.state as LocationState;
    if (state) {
      setTotalPrice(state.totalPrice);
      setOrderID(state.orderID)
    }
  }, []);

  


  const { handleSubmit, error: uploadError ,handleFileChange} = useUpload(orderID);

  const center: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  const imgStyle: React.CSSProperties = {
    width: '10%',
    height: 'auto',
    marginBottom: '10px',
  };

  
  const inputStyle: React.CSSProperties = {
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  };

  return (
    <>
      <div className='Header' style={center}>
        <h1>Payment</h1>
      </div>

      <section style={center}>
        <p>Payment method</p>
        <div>
          <p>1. Select a banking app</p>
          <p>2. Scan the QR code below</p>
          <p>3. Send slip</p>
        </div>
        <img src={imgQR} alt="QR Code" style={imgStyle} />
      </section>

      <strong className='TotalPrice' style={center}>
        Price: {formatCurrency(totalPrice)}
      </strong>

      <div style={center}>
        <input type="file" onChange={handleFileChange}  style={inputStyle} />
        <Button
          variant='light'
          style={{ marginBottom: '10px' }}
        >
         
        </Button>
        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
        <Form onSubmit={handleSubmit}>

        <Button type='submit' variant='primary' style={{ marginBottom: '10px' }}>
          Submit
        </Button>
        </Form>
      </div>
    </>
  );
}
