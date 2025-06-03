import React from "react";
import img from "../ui/Images/logo.jpg";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <footer className="bg-gradient-to-t from-gray-800 via-gray-900 to-gray-800 text-gray-200 pt-10 px-6 sm:px-10 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-gray-700">
            {/* Logo and Description */}
            <div className="text-center sm:text-left">
              <img
                className="mx-auto sm:mx-0 rounded-full"
                src={img}
                alt="logo"
                style={{ width: "60px" }}
              />
              <p className="text-md font-normal mt-4 mb-4 max-w-xs mx-auto sm:mx-0">
                Empowering your journeys with trusted travel services and
                unforgettable experiences.
              </p>
              <div className="flex space-x-6 justify-center sm:justify-start text-gray-400">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-[#1877F2] transition-colors duration-300"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#E1306C] transition-colors duration-300"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#0A66C2] transition-colors duration-300"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:text-[#1DA1F2] transition-colors duration-300"
                >
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex justify-center items-center sm:block">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                <ul className="text-md font-normal space-y-2">
                  <li>
                    <a
                      className="hover:text-pink-500 transition"
                      href="/community"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-pink-500 transition" href="/blog">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-pink-500 transition"
                      href="/community"
                    >
                      Forum
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-pink-500 transition"
                      href="/community"
                    >
                      Meetup
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Services */}
            <div className="flex justify-center items-center sm:block">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-4">Our Services</h3>
                <ul className="text-md font-normal space-y-2">
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      International Holidays
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      Bus Booking
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      Train Ticket Booking
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      Trip Ideas
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* About Us */}
            <div className="flex justify-center items-center sm:block">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-4">About Us</h3>
                <ul className="text-md font-normal space-y-2">
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      Cab Booking
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      Book Hotel From Burhanpur
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      Book Flights From
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-pink-500 transition" href="#">
                      Airlines
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex justify-center items-center sm:block">
              <div className="text-center max-w-xs mx-auto">
                <h3 className="font-bold text-xl mb-3">Newsletter</h3>
                <p className="text-md font-normal mb-4">
                  Stay updated with the latest travel deals and tips!
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your E-mail"
                    className="p-2 border border-gray-600 rounded-l bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <motion.button
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-r cursor-pointer"
                  >
                    ➤
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex flex-col items-center mt-8 text-pink-600 font-semibold space-y-2">
            <p className="text-lg text-center">
              © 2025 Burhanpur AkryptTech. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400">
              {/* Example payment icons or placeholders */}
              <span className="hover:text-pink-500 cursor-pointer">
                💳 Visa
              </span>
              <span className="hover:text-pink-500 cursor-pointer">
                💳 MasterCard
              </span>
              <span className="hover:text-pink-500 cursor-pointer">
                💳 Amex
              </span>
              <span className="hover:text-pink-500 cursor-pointer">📲 UPI</span>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default Footer;
