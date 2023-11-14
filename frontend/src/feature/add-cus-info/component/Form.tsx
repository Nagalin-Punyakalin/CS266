import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function InformationForm() {
  return (
    <Form>
      <div className="mb-3 row">
        <Form.Group controlId="formName" className="col-md-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group controlId="formSurname" className="col-md-4">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your surname"
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber" className="col-md-4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            
          />
        </Form.Group>
      </div>

      <div className="mb-3 row">
        <Form.Group controlId="formHouseNumber" className="col-md-3">
          <Form.Label>House Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your house number"
          />
        </Form.Group>

        <Form.Group controlId="formVillage" className="col-md-3">
          <Form.Label>Village</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your village"
          />
        </Form.Group>

        <Form.Group controlId="formAlley" className="col-md-3">
          <Form.Label>Alley</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your alley"
          />
        </Form.Group>

        <Form.Group controlId="formStreet" className="col-md-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your street"
          />
        </Form.Group>
      </div>

      <div className="mb-3 row">
        <Form.Group controlId="formSubDistric" className="col-md-3">
          <Form.Label>Sub-Distric</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your sub-distric"
          />
        </Form.Group>

        <Form.Group controlId="formSubArea" className="col-md-3">
          <Form.Label>Sub-Area</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your sub-area"
          />
        </Form.Group>

        <Form.Group controlId="formProvince" className="col-md-3">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your province"
          />
        </Form.Group>

        <Form.Group controlId="formPostalCode" className="col-md-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your postal code"
          />
        </Form.Group>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
