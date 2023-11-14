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
            // Add onChange handler if needed
          />
        </Form.Group>

        <Form.Group controlId="formSurname" className="col-md-4">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your surname"
            // Add onChange handler if needed
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber" className="col-md-4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            // Add onChange handler if needed
          />
        </Form.Group>
      </div>

      <div className="mb-3 row">
        <Form.Group controlId="formAddress" className="col-md-12">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter your address"
            // Add onChange handler if needed
          />
        </Form.Group>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
