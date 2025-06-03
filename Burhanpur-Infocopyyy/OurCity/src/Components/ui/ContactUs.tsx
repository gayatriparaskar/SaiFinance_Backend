import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from '../Page/Footer';

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const ContactUs = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        <h1 className="text-4xl font-bold text-blue-700">Contact Us</h1>
        <p className="text-gray-600 mt-3">
          We'd love to hear from you — reach out to us with questions, feedback, or suggestions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-500"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Official Contact Info</h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>📍 Address:</strong> Akrypt IT Solution, Amravati Road, Burhanpur - 450331</p>
            <p><strong>📞 Phone:</strong> <a href="tel:+9770362271" className="text-blue-600">97703-62271</a></p>
            <p><strong>✉️ Email:</strong> <a href="mailto:dmburhanpur@nic.in" className="text-blue-600">dmburhanpur@nic.in</a></p>
            <p><strong>🌐 Website:</strong> <a href="https://burhanpur.nic.in" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">burhanpur.nic.in</a></p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Message submitted successfully!');
          }}
          className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500 space-y-4"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Send a Message</h2>

          <motion.div variants={fadeIn} custom={3}>
            <label className="block text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div variants={fadeIn} custom={4}>
            <label className="block text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div variants={fadeIn} custom={5}>
            <label className="block text-gray-700 mb-1">Your Message</label>
            <textarea
              rows="4"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            variants={fadeIn}
            custom={6}
          >
            Submit
          </motion.button>
        </motion.form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
