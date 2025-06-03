import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { motion } from "framer-motion";

const SubCategorySection = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formState, setFormState] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    speciality: "",
    rating: "",
    address: "",
    timing: "",
    calling: "",
  });

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("/subcategory/getSubCategory");
      setData(res.data?.result || []);
    } catch {
      console.error("Failed to fetch subcategories");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/getCategory");
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormState({
      name: "",
      image: "",
      category: "",
      description: "",
      speciality: "",
      rating: "",
      address: "",
      timing: "",
      calling: "",
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setCurrentId(item._id);
    setFormState({
      name: item.name,
      image: item.image,
      category: item.category,
      description: item.description,
      speciality: item.speciality,
      rating: item.rating,
      address: item.address,
      timing: item.timing,
      calling: item.calling,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      await axios.delete(`/subcategory/deleteSubCategory/${id}`);
      fetchSubCategories();
    } catch (err) {
      alert("Error deleting subcategory");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formState.name ||
        !formState.image ||
        !formState.category ||
        !formState.speciality ||
        !formState.address
      ) {
        alert("Please fill all required fields.");
        return;
      }

      if (isEditMode) {
        await axios.put(`/subcategory/updateSubCategory/${currentId}`, formState);
        alert("Subcategory updated successfully");
      } else {
        await axios.post("/subcategory/createSubCategory", formState);
        alert("Subcategory added successfully");
      }
      fetchSubCategories();
      setShowModal(false);
    } catch (err) {
      alert("Error saving subcategory");
    }
  };

  return (
    <div className="w-full mx-0">
      <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-800">
          SubCategory Manager
        </h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          + Add SubCategory
        </button>
      </div>

      <div className="w-full mx-0 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-purple-600 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-2 py-2">Image</th>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-left">Category</th>
              <th className="px-2 py-2 text-left">Speciality</th>
              <th className="px-2 py-2 text-left">Address</th>
              <th className="px-2 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500 italic">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-purple-100 transition-colors duration-150`}
                >
                  <td className="p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-contain shadow-sm"
                    />
                  </td>
                  <td className="p-2 font-semibold text-gray-800">{item.name}</td>
                  <td className="p-2 text-gray-600">
                    {
                      categories.find((cat) => cat._id === item.category)?.name ||
                      "Unknown"
                    }
                  </td>
                  <td className="p-2 text-gray-600">{item.speciality}</td>
                  <td className="p-2 text-gray-600">{item.address}</td>
                  <td className="p-2 text-center space-x-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-start justify-center pt-16 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
          >
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit SubCategory" : "Add SubCategory"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Name"
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                name="image"
                value={formState.image}
                onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                placeholder="Image URL"
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <select
                name="category"
                value={formState.category}
                onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="speciality"
                value={formState.speciality}
                onChange={(e) =>
                  setFormState({ ...formState, speciality: e.target.value })
                }
                placeholder="Speciality"
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                name="address"
                value={formState.address}
                onChange={(e) =>
                  setFormState({ ...formState, address: e.target.value })
                }
                placeholder="Address"
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 border rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SubCategorySection;
