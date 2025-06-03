import React, { useState } from 'react';
import axios from '../../../../axios';
import toast from 'react-hot-toast';

const Register = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    email: '',
    role: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/createUser', formData);
      if (res.data.success) {
        toast.success('🎉 Account created successfully!');
 
      setFormData({ name: '', phone: '', password: '', email: '', role: '', address: '' });
        setIsLogin(true); // Switch to login mode
         
    
 
      } else {
        toast.error('Registration failed: ' + res.data.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
      toast.error('An error occurred during registration.');
    }
  };



const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/users/adminLogin', {
      phone: formData.phone,
      password: formData.password,
    });

    console.log('Login response:', res.data);

    // Token is in res.data.result directly as string
    const token = res.data.result;

    if (!token) {
      toast.error("Token missing in response.");
      return;
    }

    // Store token
    localStorage.setItem("token", token);
    toast.success('✅ Login successful!');

    // User info - since token only contains token, 
    // fallback to manual user object as before or fetch user details separately later
    let user = null;
    if (formData.phone === '9981443156' && formData.password === 'gayu123') {
      user = { role: 'admin', phone: formData.phone };
    } else {
      user = { role: 'user', phone: formData.phone };
    }

    localStorage.setItem('user', JSON.stringify(user));

    onLoginSuccess?.(user);
    onClose?.();

    setTimeout(() => {
      if (user.role === 'admin') {
        window.location.href = '/dash';
      } else {
        window.location.href = '/';
      }
    }, 100);
  } catch (err) {
    console.error('Login error:', err);
    toast.error('An error occurred during login.');
  }
};




  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        aria-label="Close Modal"
      >
        &times;
      </button>

      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
        className="p-7 rounded-3xl max-w-md w-full space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          {isLogin ? 'Login to your Account' : 'Create an Account'}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {isLogin && (
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-medium cursor-pointer"
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;