import React, { useState, useEffect } from 'react';

export const AddListing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <i
        className="fa-solid fa-plus"
        style={{
          color: scrolled ? "black" : "white",
          boxShadow: scrolled ? "0 2px 6px rgba(0, 0, 0, 0.2)" : "none",
          transition: "all 0.3s ease"
        }}
      ></i>
    </div>
  );
};

