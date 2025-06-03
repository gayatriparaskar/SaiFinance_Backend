import { useState } from "react";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ phone: "", password: "" });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Yahan tumhara login API call logic dalein (jo tumne diya tha)
    // Agar login success ho to onLoginSuccess call karo
    // Agar fail to error dikhao

    // Example simplified:
    try {
      // const res = await axios.post(...)
      // agar success:
      onLoginSuccess && onLoginSuccess(/* user data here */);
      onClose();
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
          aria-label="Close login modal"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
