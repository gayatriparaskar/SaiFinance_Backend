import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from '../Page/Footer';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const sections = [
    {
      title: "About Burhanpur City",
      content: "Burhanpur is a historically and culturally rich district in Madhya Pradesh, located on the banks of the Tapti River. It served as an important administrative center during the Mughal era and is renowned for its forts, mosques, dargahs, and architectural heritage."
    },
    {
      title: "History",
      content: "Burhanpur was the capital of the Khandesh Suba during the Mughal Empire. Shah Jahan’s wife Mumtaz Mahal died here and was temporarily buried before being moved to the Taj Mahal. The Asirgarh Fort, known as the 'Key to the Deccan', strategically connects North and South India."
    },
    {
      title: "Geography & Climate",
      content: "Located near the Satpura range, Burhanpur sits beside the Tapti River. It borders Khandwa to the north, Khargone to the west, and Maharashtra to the south. The climate is tropical with hot summers and mild winters."
    },
    {
      title: "Demographics",
      list: [
        "Population (2011): 757,847",
        "Sex Ratio: 900 females per 1000 males",
        "Literacy Rate: 65.28%",
        "Urban Population: 34.35%",
        "Tribal Population: 30.36%"
      ]
    },
    {
      title: "Economy",
      content: "Burhanpur is a leader in agriculture and industry. It's known for banana farming, with 17 lakh metric tons produced and 70,000 metric tons exported in 2024-25. The city also has cotton, oil mills, wood furniture, and the largest paper industry in Madhya Pradesh."
    },
    {
      title: "Main Attractions",
      list: [
        "Shahi Qila",
        "Asirgarh Fort",
        "Dargah-e-Hakimi",
        "Jama Masjid",
        "Black Taj Mahal"
      ]
    },
    {
      title: "Administration",
      list: [
        "Tehsils: Burhanpur, Nepanagar, Khaknar",
        "Panchayats: 167 Gram Panchayats, 2 Janpad Panchayats",
        "Urban Bodies: 1 Municipal Corporation, 1 Nagar Parishad, 1 Nagar Panchayat"
      ]
    },
    {
      title: "Contact",
      content: "Collector Office, Mohammadpura, Raver Road, Burhanpur - 450331\nPhone: 07325-255300\nEmail: dmburhanpur@nic.in\nWebsite: https://burhanpur.nic.in"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">{section.title}</h2>
          {section.content && (
            <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
          )}
          {section.list && (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {section.title === "Contact" && (
            <a
              href="https://burhanpur.nic.in"
              className="text-green-600 underline mt-2 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Official Website
            </a>
          )}
        </motion.div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default About;
