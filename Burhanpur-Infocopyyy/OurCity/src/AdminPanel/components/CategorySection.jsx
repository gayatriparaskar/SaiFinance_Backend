import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "./../../../axios";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/getCategory");
      setCategories(res.data?.data || []);
    } catch (error) {
      console.error(
        "Error fetching categories:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ name: "", description: "", image: "" });
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setIsEditMode(true);
    setCurrentCategoryId(category._id);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setModalOpen(true);
  };

  const handleAddSubcategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    console.log("Selected Category ID for Subcategory:", categoryId);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`/category/deleteCategory/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("Error deleting category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, image } = formData;
    if (!name.trim() || !image.trim()) {
      alert("Please fill in required fields: Name and Image URL");
      return;
    }
    setLoading(true);
    const payload = {
      name: name.trim(),
      description: description.trim() || "No description",
      image: image.trim(),
      isActive: true,
    };
    try {
      if (isEditMode) {
        await axios.put(
          `/category/updateCategory/${currentCategoryId}`,
          payload
        );
        alert("Category updated successfully!");
      } else {
        await axios.post("/category/createCategory", payload);
        alert("Category added successfully!");
      }
      fetchCategories();
      setModalOpen(false);
    } catch (err) {
      console.error(
        "Error saving category:",
        err.response?.data || err.message
      );
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Server error while saving category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
 
 
    <div className="w-full mx-0">
      <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-800">
          Category Manager
        </h1>
 
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          + Add Category
        </button>
      </div>

      <div className="w-full mx-0 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-purple-600 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-0">Image</th>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="p-0 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500 italic"
                >
                  Loading
                </td>
              </tr>
            ) : (
              categories.map((cat, idx) => (
                <tr
                  key={cat._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-purple-100 transition-colors duration-150`}
                >
                  <td className="p-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-lg object-contain shadow-sm"
                    />
                  </td>
                  <td className="p-0 font-semibold text-gray-800">
                    {cat.name}
                  </td>
                  <td className="p-0 text-gray-600">{cat.description}</td>
                  <td className="p-0 text-center space-x-3">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition"
                      title="Edit Category"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                      title="Delete Category"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-start overflow-y-auto px-4 pt-16 pb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 border rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
