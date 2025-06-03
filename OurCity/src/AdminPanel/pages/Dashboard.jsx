import React, { useState, useRef, useEffect } from "react";
import SubCategorySection from "../components/SubCategorySection";
import UserSection from "../components/UserSection";
import CategorySection from "../components/CategorySection";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("category");
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  // Load avatar from localStorage on component mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("adminAvatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setAvatar(imageDataUrl);
        localStorage.setItem("adminAvatar", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSection = () => {
    switch (activeTab) {
      case "category":
        return <CategorySection />;
      case "subcategory":
        return <SubCategorySection />;
      case "users":
        return <UserSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-md">
        <div className="p-6 text-2xl font-bold border-b border-purple-700 tracking-wide">
          Burhanpur Admin
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <button
            className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === "category"
                ? "bg-purple-700 font-semibold shadow-inner"
                : "hover:bg-purple-700"
            }`}
            onClick={() => setActiveTab("category")}
          >
            📁 Categories
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === "subcategory"
                ? "bg-purple-700 font-semibold shadow-inner"
                : "hover:bg-purple-700"
            }`}
            onClick={() => setActiveTab("subcategory")}
          >
            📂 Subcategories
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === "users"
                ? "bg-purple-700 font-semibold shadow-inner"
                : "hover:bg-purple-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            👥 Users
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage all sections from one place</p>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />

            {avatar ? (
              <img
                src={avatar}
                alt="Admin Avatar"
                className="w-12 h-12 rounded-full object-cover shadow cursor-pointer border-2 border-purple-600"
                onClick={handleAvatarClick}
                title="Click to change avatar"
              />
            ) : (
              <div
                onClick={handleAvatarClick}
                title="Click to upload avatar"
                className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold cursor-pointer border-2 border-purple-600"
              >
                P
              </div>
            )}

            <div className="text-right">
              <p className="font-medium text-gray-800">Admin</p>
              <p className="text-sm text-gray-500">admin@burhanpur.com</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 animate-fade-in">{renderSection()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
