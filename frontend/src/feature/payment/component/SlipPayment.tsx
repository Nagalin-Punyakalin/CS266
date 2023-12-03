import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../../utilities/formatCurrency';
import imgQR from '../../../../public/imgs/QR.png';

export default function SlipPayment() {
  const { totalPrice } = useParams();
  const totalPriceNumber = totalPrice ? Number(totalPrice) : 0;

  const center: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  const details: React.CSSProperties = {
    textAlign: 'left',
  };

  const buttonStyle = {
    marginBottom: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
  };

  const imgStyle: React.CSSProperties = {
    width: '10%',
    height: 'auto',
    marginBottom: '10px',
  };

  return (
    <>
      <div className='Header' style={center}>
        <h1>Payment</h1>
        <p></p>
      </div>

      <div className='details' style={center}>
        <p>Payment method</p>
        <td>
        <p>1. Select a banking app</p>
        <p>2. Scan the QR code below</p>
        <p>3. Send slip</p>
        </td>
        <img src={imgQR} alt="QR Code" style={imgStyle} />
      </div>
      <p></p>
      

      <strong className='TotalPrice' style={center}>
        Price : {formatCurrency(totalPriceNumber)}
      </strong>
      <p></p>
      <div style={center}>
        <Button variant='light' style={buttonStyle}>
          Upload slip file
        </Button>
        <p></p>
        <Button variant='primary' style={buttonStyle}>
          Submit
        </Button>
      </div>
    </>
  );
}
