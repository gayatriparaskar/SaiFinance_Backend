import React, { useState, useEffect } from 'react';
import axios from '../../../../axios';
import { useNavigate } from 'react-router-dom';

const AdminCategory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://burhanpur-city-backend.vercel.app/api/subcategory/getSubCategory')
      .then((res) => {
        console.log("API Response:", res.data);
        setData(res?.data?.result || []);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        'https://burhanpur-city-backend.vercel.app/api/category/deleteSubCategory',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: id }),
        }
      );

      if (!res.ok) throw new Error('Failed to delete subcategory');

      setData(data.filter((item) => item._id !== id));
      alert('Subcategory deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleAddCategory = () => {
    navigate('/admin/add-category');
  };

  return (
    <div className="px-6 py-8 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 animate-slideDown">
        <h1 className="text-3xl font-bold text-gray-800">All Subcategories</h1>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded shadow-md hover:scale-105 hover:from-green-600 hover:to-green-700 transition duration-300"
        >
          <span>➕</span> Add Category
        </button>
      </div>

      {/* Subcategory Table */}
      {Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                  <th className="px-6 py-3 border-b">Image</th>
                  <th className="px-6 py-3 border-b">Title</th>
                  <th className="px-6 py-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-300 animate-fadeUp"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
                  >
                    <td className="px-6 py-4 border-b">
                      <img
                        src={category.image}
                        alt={category.title || 'subcategory'}
                        className="w-12 h-12 object-cover rounded shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800 font-medium">
                      {category.title || category.name}
                    </td>
                    <td className="px-6 py-4 border-b text-center space-x-2">
                      <button
                        onClick={() => navigate(`/edit-subcategory/${category._id}`)}
                        className="inline-block px-4 py-1 bg-blue-500 text-white text-sm rounded shadow hover:bg-blue-600 hover:scale-105 transition transform duration-200"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="inline-block px-4 py-1 bg-red-500 text-white text-sm rounded shadow hover:bg-red-600 hover:scale-105 transition transform duration-200"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500 animate-pulse">
          {data.length === 0 ? 'No Subcategories Found' : 'Loading...'}
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
