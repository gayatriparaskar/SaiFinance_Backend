import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/Users/userDetails")
      .then((res) => {
        setUsers(res?.data?.result || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user details.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <div className="p-0">
      <h2 className="text-2xl font-bold text-center mb-6">
        All Registered Users
      </h2>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && users.length > 0 ? (
        <motion.div
          className="overflow-x-auto shadow-lg px-0"
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <table className="min-w-full bg-white border border-gray-200 text-sm text-gray-700">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-3 text-left border-b">#</th>
                <th className="p-3 text-left border-b">Name</th>
                <th className="p-3 text-left border-b">Email</th>
                <th className="p-3 text-left border-b">Phone</th>
                <th className="p-3 text-left border-b">Role</th>
                <th className="p-3 text-left border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 border-b font-semibold text-gray-500">
                    {i + 1}
                  </td>
                  <td className="p-3 border-b font-medium flex items-center gap-2">
                    {/* Avatar or initials fallback */}
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    {user.name || "N/A"}
                  </td>
                  <td className="p-3 border-b">{user.email || "N/A"}</td>
                  <td className="p-3 border-b">{user.phone || "N/A"}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }
                    `}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        !loading && <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default UserSection;
