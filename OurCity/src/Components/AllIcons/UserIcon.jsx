import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserIcon = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      {/* <Link to={'/registar'}> */}
      <i
        className="fa-regular fa-user"
        style={{
          color: scrolled ? "black" : "white",
          boxShadow: scrolled ? "0 2px 6px rgba(0, 0, 0, 0.2)" : "none"
        }}
      ></i>        {/* </Link> */}
</div>
  )
}

export default UserIcon 