
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('Users/adminLogin', {
                phone,
                password,
            });

            const token = res.data.token;
            localStorage.setItem('authToken', token); // Save token

            setError('');
            navigate('/AdminDashboard'); // ✅ Redirect to home
        } catch (err) {
            console.error(err);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>

            <input
                type="tel"
                placeholder="Phone"
                className="w-full p-2 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button
                onClick={handleLogin}
                
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Login
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
    );
}



 