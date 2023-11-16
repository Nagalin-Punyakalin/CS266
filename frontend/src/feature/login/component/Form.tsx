import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';

export default function LoginForm() {

    const {
        handleLogin,
        username,
        password,
        error,
    } = useLogin()

    return (
        <div className="mb-3 row">
            <Form className="col-md-3" onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        ref={username}
                        type="text"
                        placeholder="Enter username"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={password}
                        type="password"
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>
            { error && 
                <div className="alert alert-danger" >
                    {error}
                </div>
        }
        </div>
    )
}