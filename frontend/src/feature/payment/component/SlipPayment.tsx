import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../../utilities/formatCurrency';
import imgQR from '../../../../public/imgs/QR.png';
import useUpload from '../hook/useUpload';

export default function SlipPayment() {
  const { totalPrice } = useParams();
  const totalPriceNumber = totalPrice ? Number(totalPrice) : 0;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const { handleSubmit, loading, error: uploadError } = useUpload({ orderID: '123' });

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
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
        Price: {formatCurrency(totalPriceNumber)}
      </strong>

      <div style={center}>
        <input type="file" onChange={handleFileChange} style={inputStyle} />
        <Button
          variant='light'
          style={{ marginBottom: '10px' }}
          onClick={handleUploadClick}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload slip file'}
        </Button>
        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
        <Button variant='primary' style={{ marginBottom: '10px' }}>
          Submit
        </Button>
      </div>
    </>
  );
}
