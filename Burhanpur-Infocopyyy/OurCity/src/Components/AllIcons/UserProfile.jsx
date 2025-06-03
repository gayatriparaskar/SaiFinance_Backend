import { useEffect, useState } from "react";
import axios from "./../../../axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        navigate("/registar");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        console.log("Decoded userId:", userId);

        const res = await axios.get("/Users/userDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User Details Response:", res.data);

        if (res.data.success && Array.isArray(res.data.result)) {
          const currentUser = res.data.result.find((u) => u._id === userId);
          setUser(currentUser);
          console.log("Matched User:", currentUser);
        } else {
          console.warn("Failed to fetch user:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token");
        navigate("/registar");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/registar");
  };

  if (!user) {
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
