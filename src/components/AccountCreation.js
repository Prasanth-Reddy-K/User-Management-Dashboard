import React, { useState } from 'react';
import axios from 'axios';
function AccountCreation() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const createAccount = (e) => {
        e.preventDefault();
        axios.post('/api/create-account', { username, password });
        console.log('Creating account with:', username, password);
    };

    return (
        <div>
            <form onSubmit={createAccount}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default AccountCreation;
