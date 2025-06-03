// src/pages/Contact.tsx
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (You can replace this with actual email logic)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us - Burhanpur</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-xl shadow"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-xl shadow"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 border rounded-xl shadow"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info & Map */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Akrypt IT Solution, Burhanpur</h3>
          <p><strong>Address:</strong> Near Nehru Chowk, Burhanpur, MP - 450331</p>
          <p><strong>Phone:</strong> +91-91314-36643</p>
          <p><strong>Email:</strong> info@akryptitsolution.in</p>
          <p><strong>Hours:</strong> Mon - Sat, 10AM to 6PM</p>

          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.566877265029!2d76.22544541493342!3d21.308408885839834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd85b9055555555%3AAkrypt%20IT%20Solution!5e0!3m2!1sen!2sin!4v1660000000000"
              width="100%"
              height="250"
              className="rounded-xl shadow"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
