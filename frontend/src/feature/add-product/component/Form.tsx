import React from 'react'
import useAddProduct from '../hook/useAddProduct'
import FormAddPro from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Form() {
  const {
    handleSubmit,
    name,
    error,
    price,
    handleFileChange
  } = useAddProduct()

  return (
    <form onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <FormAddPro.Group className="ProName">
        <FormAddPro.Label >Product Name</FormAddPro.Label>
        <FormAddPro.Control ref={name} required type="text" placeholder='Enter your Product Name' />
        </FormAddPro.Group>
        <p />
        <FormAddPro.Group className="ProPrice">
        <FormAddPro.Label>Product Price</FormAddPro.Label>
        <FormAddPro.Control ref={price} required type="number" placeholder='Enter Product Price' />
        <FormAddPro.Text>Product Price must be number.</FormAddPro.Text>
        </FormAddPro.Group>
        <p />
        <FormAddPro.Group className="ProPrice">
        <FormAddPro.Label>Product Picture</FormAddPro.Label>
        <FormAddPro.Control required type="file" onChange={handleFileChange} />
        </FormAddPro.Group>
        <p />
        <div className="d-flex flex-column align-items-center ">
        { error && 
          <div className="alert alert-danger mt-4" >
                {error}
          </div>
        }
        <div className="text-center">
       
        <Button  variant="primary" type="submit">
          Submit
        </Button>
        </div>
        </div>
       
        
    </form>
  )
}