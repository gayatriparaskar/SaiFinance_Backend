// MobileMenu.jsx
import React, { useState } from 'react';
import { Menu, X, ChevronRight, ArrowLeft } from 'lucide-react';

const menuData = [
  { title: 'Home', submenu: [] },
  { 
    title: 'Services', 
    submenu: [
      { title: 'Web Design', submenu: [] },
      { title: 'SEO', submenu: [] },
    ]
  },
  { title: 'Contact', submenu: [] },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(menuData);
  const [history, setHistory] = useState([]);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(menuData);
    setHistory([]);
  };

  const goForward = (submenu) => {
    setHistory(prev => [...prev, activeMenu]);
    setActiveMenu(submenu);
  };

  const goBack = () => {
    const prev = history[history.length - 1];
    setHistory(history.slice(0, history.length - 1));
    setActiveMenu(prev || menuData);
  };

  return (
    <div className="relative">
      <button
        onClick={openMenu}
        aria-label="Open menu"
        className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              {history.length > 0 ? (
                <button
                  onClick={goBack}
                  aria-label="Go back"
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <ArrowLeft size={20} />
                </button>
              ) : (
                <div></div>
              )}
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="flex flex-col space-y-2 overflow-auto">
              {activeMenu.map((item, index) => (
                <li key={index}>
                  <button
                    className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded"
                    onClick={() => {
                      if (item.submenu && item.submenu.length > 0) {
                        goForward(item.submenu);
                      } else {
                        alert(`You clicked on ${item.title}`);
                        closeMenu();
                      }
                    }}
                  >
                    <span>{item.title}</span>
                    {item.submenu && item.submenu.length > 0 && (
                      <ChevronRight size={20} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
