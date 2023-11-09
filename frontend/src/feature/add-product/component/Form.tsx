import React from 'react'

export default function Form() {
 
  return (
    <form  role="form">
        <input  required type="text" className="form-control" placeholder='Enter your product name' />
        <input required type="number" className="form-control" placeholder='Enter your product price'/>
        <input required type='file'  className="form-control"/>
        Please fill out this field.
        <button data-testid="your-form-id" type="submit" className="btn btn-success">Submit</button>
    </form >
  )
}
