import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../ui/Navbar";

import gurudwara from "../MainSlider/mainslideImg/gurudwara.jpg";
import rajakichatri from "../MainSlider/mainslideImg/rajakichatri.jpg";
import shanwara from "../MainSlider/mainslideImg/shanwaraMain.jpg";
import shahiqila from "../MainSlider/mainslideImg/shahiqila.jpg";
import railway from "../MainSlider/mainslideImg/detailrailway1.png";

const images = [gurudwara, rajakichatri, shanwara, shahiqila, railway];

function ArchitectureLanding() {
  const [showFlipText, setShowFlipText] = useState(false);
  const [showFadeText, setShowFadeText] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const headingRef = useRef(null);

  const triggerAnimations = () => {
    setShowFlipText(false);
    setShowFadeText(false);
    setShowSearchBox(false);
    setTimeout(() => setShowFlipText(true), 100);
    setTimeout(() => setShowFadeText(true), 400);
    setTimeout(() => setShowSearchBox(true), 700);
  };

  useEffect(() => {
    triggerAnimations();
    if (!headingRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) triggerAnimations();
        });
      },
      { root: null, threshold: 0.5 }
    );
    observer.observe(headingRef.current);
    return () => headingRef.current && observer.unobserve(headingRef.current);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes panBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes flipInX {
          0% {
            transform: perspective(400px) rotateX(90deg);
            opacity: 0;
          }
          100% {
            transform: perspective(400px) rotateX(0deg);
            opacity: 1;
          }
        }
        .animate-flipInX {
          animation: flipInX 0.8s ease forwards;
        }

        .search-box {
          background: rgba(255 255 255 / 0.9);
          border-radius: 2rem;
          box-shadow: 0 8px 24px rgb(0 0 0 / 0.25);
          padding: 1rem 1.5rem;
          max-width: 700px;
          width: 70%;
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          user-select: none;
          transition: box-shadow 0.3s ease;
          margin: -4rem auto 0;
          z-index: 20;
          position: relative;
        } 

        .search-box:hover {
          box-shadow: 0 12px 36px rgb(0 0 0 / 0.4);
        }

        .search-box input,
        .search-box select {
          flex: 1;
          border: none;
          border-radius: 1.25rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          outline: none;
          color: #111827;
          background-color: #f9fafb;
        }

        .search-box input::placeholder {
          color: #6b7280;
        }

        .search-box input:focus,
        .search-box select:focus {
          box-shadow: 0 0 0 3px rgb(236 72 153 / 0.5);
          background-color: white;
        }

        .search-box select {
          max-width: 130px;
          cursor: pointer;
        }

        .search-box button {
          background: linear-gradient(to right, #ec4899, #f97316, #eab308);
          border-radius: 1.5rem;
          border: none;
          padding: 0.75rem 1.75rem;
          font-weight: 700;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 8px 20px rgb(236 72 153 / 0.7);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          user-select: none;
        }

        .search-box button:hover {
          background: linear-gradient(to right, #db2777, #ea580c, #ca8a04);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
            margin-bottom: 1.25rem;
            padding: 0 1rem;
          }
          .search-box {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
            padding: 1rem;
            width: 90%;
            margin-top: 0;
          }
          .search-box input,
          .search-box select,
          .search-box button {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 400px) {
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="relative w-full h-screen overflow-hidden">
        <Navbar />

        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Background"
              className={`absolute w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${i === currentBg ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div
          ref={headingRef}
          className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 mt-10 h-full"
        >
          <div style={{
        padding:'-500px',
        marginTop:'-100px',
            // border:'2px solid red'
          }}>
            <h1
              className={`text-2xl md:text-5xl font-bold mb-8 max-w-2xl ${showFlipText ? "animate-flipInX" : "opacity-0"
                } text-yellow-400`}
            >
              Welcome to <br /> The Historical City of Heritage & Glory
            </h1>

            <p
              className={`text-md max-w-xl mb-5 mt-5 transition-opacity duration-700 ${showFadeText ? "opacity-100" : "opacity-0"
                }`}
            >
              Discover the hidden gems of Mughal brilliance, majestic forts, and
              sacred shrines that have gracefully stood the test of time in the
              heart of Madhya Pradesh. Immerse yourself in a journey where history
              whispers from every stone, unveiling stories of valor, culture, and
              timeless heritage that await your exploration around every corner.
            </p>

          </div>


          {showSearchBox && (
            <form
              className="search-box mb-2 "
              onSubmit={(e) => {
                e.preventDefault();
                alert("Search submitted!");
              }}
            >
              <input
                type="text"
                placeholder="What are you looking for?"
                spellCheck={false}
                required
                aria-label="Search query"
              />
              <select aria-label="Select category" defaultValue="Places">
                <option value="Places">🏰 Places</option>
                <option value="Hotels">🏨 Hotels</option>
                <option value="Restaurants">🍽 Restaurants</option>
                <option value="Events">🎉 Events</option>
                <option value="Shops">🛍 Shops</option>
              </select>
              <button type="submit">
                Search <FaSearch />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ArchitectureLanding;