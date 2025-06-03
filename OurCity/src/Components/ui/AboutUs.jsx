import React from "react";
import { motion } from "framer-motion";
import Footer from "../Page/Footer"; // Make sure Footer.jsx is in the same folder

const AboutUs = () => {
  return (
    <>
      <motion.div
        className="max-w-4xl mx-auto p-6 mt-12 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">
          About Us
        </h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          <strong>Welcome to Burhanpur – The Historical City!</strong>
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Burhanpur is an ancient and historic city located in the heart of Madhya Pradesh.
          This city has witnessed significant events and heritage from the Mughal era to the Maratha period.
          Burhanpur is especially known for its royal forts, mosques, and exquisite art and architecture.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          The purpose of this website is to showcase Burhanpur’s rich heritage, local culture, and historical monuments to people around the world.
          Here you will find information about Burhanpur’s main tourist attractions, folk tales, and the city’s growth story.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          We aim to digitally preserve Burhanpur’s beautiful history and culture so everyone can appreciate its grandeur and feel inspired to visit.
        </p>

        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          What you will find on this website:
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Introduction to famous historical sites like Shahi Qila, Farah Mahal, and Tulsi Manas Mandir</li>
          <li>Local folk songs, dances, and unique festivals of Burhanpur</li>
          <li>Special food traditions and famous local dishes</li>
          <li>Information about upcoming events and cultural festivals</li>
          <li>Stories of the people and social life of Burhanpur</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          Our Team
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This website is created by a passionate group connected to Burhanpur, aiming to highlight the city on digital platforms and spread awareness about its cultural and historical significance.
        </p>

        <p className="text-lg font-semibold text-pink-700 text-center">
          Join us in exploring Burhanpur and enjoy the rich history and culture of this beautiful city!
        </p>
      </motion.div>

    
    </>
  );
};

export default AboutUs;
