import React, { useState } from 'react';
import axios from 'axios';
import './AccountCreation.css';
function AccountCreation() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const response = await axios.post('/api/AIzaSyCRtUaQm4kgAyDCHw2RaCO8JEnz6pqARw8', {
                username,
                password,
            });

            console.log('Account created:', response.data);

            setIsProcessing(false);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error creating account:', error.message);
            setIsProcessing(false);
        }
    };

    return (
        <div className='account-form'>
            <h2>Account Creation</h2>
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
            </form>
            {isProcessing && <p>Processing your request...</p>}
        </div>
    );
}

export default AccountCreation;
