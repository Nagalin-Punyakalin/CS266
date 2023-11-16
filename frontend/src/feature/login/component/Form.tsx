import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function LoginForm() {
    return (
        <div className="mb-3 row">
            <Form className="col-md-3">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>
        </div>
    )
}