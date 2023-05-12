import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';

import { useAppContext } from '../lib/contextLib';
import './Login.css';

export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            nav('/');
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }
    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="d-grid gap-2 mt-2">
                    <LoaderButton block="true" size="lg" type="submit" isLoading={isLoading} disabled={!validateForm()}>
                        Login
                    </LoaderButton>
                </div>
            </Form>
        </div>
    );
}