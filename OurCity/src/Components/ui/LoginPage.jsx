
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state add kiya
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLogin = async () => {
    setLoading(true);        // Login start hote hi loading true karo
    setError('');
    try {
      const res = await axios.post(
        'https://burhanpur-city-backend.vercel.app/api/Users/adminLogin',
        { phone, password }
      );
      const token = res.data.token;
      localStorage.setItem('authToken', token);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    } finally {
      setLoading(false);     // Login process complete hone ke baad loading false karo
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Watercolor background animation */}
      <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 opacity-30 blur-[60px]" />

      <div
        className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
        data-aos="zoom-in"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Admin Login
        </h2>

        <div className="space-y-4">
          {/* Phone Input */}
          <input
            type="tel"
            placeholder="Phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={loading}  // Loading me inputs disable kar do
          />

          {/* Password Input with Icons */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiLock size={20} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}  // Loading me inputs disable kar do
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className={`w-full py-2 rounded-lg transition duration-300
              ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('https://burhanpur-city-backend.vercel.app/api/Users/adminLogin', {
//         phone,
//         password,
//       });

//       const token = res.data.token;
//       localStorage.setItem('authToken', token); // Save token

//       setError('');
//       navigate('/home'); // ✅ Redirect to home
//     } catch (err) {
//       console.error(err);
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="p-6 max-w-sm mx-auto space-y-4">
//       <h2 className="text-2xl font-bold text-center">Login</h2>

//       <input
//         type="tel"
//         placeholder="Phone"
//         className="w-full p-2 border rounded"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-2 border rounded"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         onClick={handleLogin}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//       >
//         Login
//       </button>

//       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//     </div>
//   );
// };

// export default LoginPage;
