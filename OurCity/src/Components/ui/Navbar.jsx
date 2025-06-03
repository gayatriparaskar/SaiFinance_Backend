import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { AddListing } from "../AllIcons/AddListing";
import UserIcon from "../AllIcons/UserIcon";
import { NavLink } from "react-router-dom";
import axios from "./../../../axios";
import Register from "./Images/Register";
import logo from "../ui/Images/logo.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const dropdownRef = useRef();


  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // Click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Fetch user on mount if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/Users/userDetails", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) {
            setUser(res.data.result[0]);
          }

        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowProfileDropdown(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-15 h-15 rounded-full border-2 border-blue-500 hover:scale-110 transition" />
            <span className={`font-bold text-xl ${scrolled ? "text-gray-900" : "text-white drop-shadow-lg"}`}>Burhanpur</span>
          </NavLink>


          <nav className="hidden md:flex items-center gap-8 relative">
            <NavLink to="/" className={({ isActive }) =>
              `text-xl font-semibold hover:text-blue-600 transition ${isActive ? "text-blue-600" : scrolled ? "text-gray-700" : "text-white"}`}>
              Home
            </NavLink>

            <div className="relative group">
              <button className={`text-xl font-semibold transition ${scrolled ? "text-gray-700" : "text-white"} group-hover:text-blue-600`}>
                Explore
              </button>
              <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md py-2 w-40 z-50">
                <NavLink to="/explore-more" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">More Explore</NavLink>
                <NavLink to="/category" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category</NavLink>
              </div>
            </div>

            <div className="relative group">
              <button className={`text-xl font-semibold transition ${scrolled ? "text-gray-700" : "text-white"} group-hover:text-blue-600`}>
                Pages
              </button>
              <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md py-2 w-40 z-50">
                <NavLink to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</NavLink>
                <NavLink to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Us</NavLink>
              </div>
            </div>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowProfileDropdown((prev) => !prev)} className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center hover:bg-blue-700">
                  {user.name?.charAt(0).toUpperCase()}
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md p-4 z-50 text-left">
                    <p className="font-semibold">👤 {user.name}</p>
                    <p className="text-sm text-gray-700">📧 {user.email}</p>
                    <p className="text-sm text-gray-700 mb-2">📱 {user.phone}</p>
                    <button onClick={handleLogout} className="w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowRegisterModal(true)} className="text-white font-semibold hover:text-blue-300 transition">
                <UserIcon fill={scrolled ? "#1f2937" : "white"} />
              </button>
            )}

            <AddListing fill={scrolled ? "#1f2937" : "white"} />

            <button onClick={() => setSidebarOpen(true)} className="block md:hidden">
              <img src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png" alt="menu" className="w-10 h-5 md:w-8 md:h-8 lg:w-8 lg:h-8 bg-white" />

            </button>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="h-20" />

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative">
            <Register
              onClose={() => {
                setShowRegisterModal(false);
                // Fetch user again after modal close
                const fetchUser = async () => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    try {

                      const res = await axios.get("/Users/adminLogin", {
                        headers: { Authorization:`Bearer ${token}` }

                      });
                      if (res.data.success) {
                        setUser(res.data.result[0]);
                      }

                    } catch (err) {
                      console.error("Error fetching user after modal close", err);
                    }
                  }
                };
                fetchUser();
              }}
            />

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
