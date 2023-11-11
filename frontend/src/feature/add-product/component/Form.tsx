import React from 'react'
import useAddProduct from '../hook/useAddProduct'

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
        <input required ref={name}  type="text" className="form-control" placeholder='Enter your product name' />
        <input required ref={price} type="number" className="form-control" placeholder='Enter your product price'/>
        <input required onChange={handleFileChange}  type='file'  className="form-control"/>
        <button data-testid="submit-button"  type="submit" className="btn btn-success">Submit</button>
        { error && 
          <div className="alert alert-danger" >
                {error}
          </div>
        }
    </form>
  )
}
