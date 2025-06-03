import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  const navItemBase = "block px-4 py-2 rounded-md transition duration-200";
  const activeClass = "bg-blue-600 text-white font-semibold";
  const inactiveClass = "text-gray-700 hover:bg-blue-100 hover:text-blue-600";

  const sectionButtonClass =
    "flex items-center justify-between w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow transition duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-white via-blue-50 to-white shadow-xl z-50 p-6 flex flex-col gap-5"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="self-end text-3xl text-gray-500 hover:text-blue-600 font-bold"
              aria-label="Close menu"
            >
              &times;
            </button>

            {/* NAV LINKS */}
            <ul className="flex flex-col gap-5 text-lg font-semibold text-gray-700">

              {/* HOME */}
              <li>
                <NavLink
                  to="/"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `${navItemBase} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* EXPLORE */}
              <li>
                <button
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className={sectionButtonClass}
                >
                  <span>Explore</span>
                  <FaChevronRight
                    className={`transform transition-transform duration-300 ${
                      exploreOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {exploreOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 overflow-hidden"
                    >
                      <li>
                        <NavLink
                          to="/explore"
                          onClick={onClose}
                          className={({ isActive }) =>
                            `${navItemBase} ${
                              isActive ? activeClass : inactiveClass
                            }`
                          }
                        >
                          Explore Main
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/category"
                          onClick={onClose}
                          className={({ isActive }) =>
                            `${navItemBase} ${
                              isActive ? activeClass : inactiveClass
                            }`
                          }
                        >
                          Categories
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/railway-station"
                          onClick={onClose}
                          className={({ isActive }) =>
                            `${navItemBase} ${
                              isActive ? activeClass : inactiveClass
                            }`
                          }
                        >
                          Railway Station
                        </NavLink>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* PAGES */}
              <li>
                <button
                  onClick={() => setPagesOpen(!pagesOpen)}
                  className={sectionButtonClass}
                >
                  <span>Pages</span>
                  <FaChevronRight
                    className={`transform transition-transform duration-300 ${
                      pagesOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {pagesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 overflow-hidden"
                    >
                      <li>
                        <NavLink
                          to="/pages"
                          onClick={onClose}
                          className={({ isActive }) =>
                            `${navItemBase} ${
                              isActive ? activeClass : inactiveClass
                            }`
                          }
                        >
                          Main Pages
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/contact"
                          onClick={onClose}
                          className={({ isActive }) =>
                            `${navItemBase} ${
                              isActive ? activeClass : inactiveClass
                            }`
                          }
                        >
                          Contact
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/about"
                          onClick={onClose}
                          className={({ isActive }) =>
                            `${navItemBase} ${
                              isActive ? activeClass : inactiveClass
                            }`
                          }
                        >
                          About Us
                        </NavLink>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
