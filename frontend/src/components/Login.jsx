import React, { useState } from 'react';
import api from '../api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/users/login', { username, password });
            // Save JWT token if your backend returns it
            localStorage.setItem('token', res.data.token);
            setError('');
            alert('Login successful!');
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default Login;