// pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ phone: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/Users/adminlogin", credentials);
      localStorage.setItem("token", res.data.token);
      navigate("/dash");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
  <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

    <div className="flex flex-col gap-4">
      <input
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Phone"
        onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
      />

      <input
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        type="password"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />

      <button
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md px-4 py-2 hover:scale-105 transition-transform duration-200"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  </div>
</div>

  );
};

export default Login;
