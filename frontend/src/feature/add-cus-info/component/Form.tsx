import React from 'react';
import Button from 'react-bootstrap/Button';
import AddUserData from '../hook/useAddUserData'
import Form from 'react-bootstrap/Form';
import useAddUserData from '../hook/useAddUserData';

export default function InformationForm() {
  const {
    name,
    surname,
    phone,
    houseNumber,
    village,
    alley,
    street,
    subDistric,
    subArea,
    province,
    postalCode,
    error,
    handleSubmit //เรียกใช้ด้วย
  } = useAddUserData()
  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-3 row">
        <Form.Group controlId="formName" className="col-md-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            ref = {name}
            type="text"
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group controlId="formSurname" className="col-md-4">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            ref = {surname}
            type="text"
            placeholder="Enter your surname"
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber" className="col-md-4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            ref = {phone}
            type="text"
            placeholder="Enter your phone number"
            
          />
        </Form.Group>
      </div>

      <div className="mb-3 row">
        <Form.Group controlId="formHouseNumber" className="col-md-3">
          <Form.Label>House Number</Form.Label>
          <Form.Control
            ref = {houseNumber}
            type="text"
            placeholder="Enter your house number"
          />
        </Form.Group>

        <Form.Group controlId="formVillage" className="col-md-3">
          <Form.Label>Village</Form.Label>
          <Form.Control
            ref = {village}
            type="text"
            placeholder="Enter your village"
          />
        </Form.Group>

        <Form.Group controlId="formAlley" className="col-md-3">
          <Form.Label>Alley</Form.Label>
          <Form.Control
            ref = {alley}
            type="text"
            placeholder="Enter your alley"
          />
        </Form.Group>

        <Form.Group controlId="formStreet" className="col-md-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            ref = {street}
            type="text"
            placeholder="Enter your street"
          />
        </Form.Group>
      </div>

      <div className="mb-3 row">
        <Form.Group controlId="formSubDistric" className="col-md-3">
          <Form.Label>Sub-Distric</Form.Label>
          <Form.Control
            ref = {subDistric}
            type="text"
            placeholder="Enter your sub-distric"
          />
        </Form.Group>

        <Form.Group controlId="formSubArea" className="col-md-3">
          <Form.Label>Sub-Area</Form.Label>
          <Form.Control
            ref = {subArea}
            type="text"
            placeholder="Enter your sub-area"
          />
        </Form.Group>

        <Form.Group controlId="formProvince" className="col-md-3">
          <Form.Label>Province</Form.Label>
          <Form.Control
            ref = {province}
            type="text"
            placeholder="Enter your province"
          />
        </Form.Group>

        <Form.Group controlId="formPostalCode" className="col-md-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            ref = {postalCode}
            type="text"
            placeholder="Enter your postal code"
          />
        </Form.Group>
      </div>
     

      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && 
         <div className="alert alert-danger mt-4" >
         {error}
        </div>
      }
    </Form>
  );
}
