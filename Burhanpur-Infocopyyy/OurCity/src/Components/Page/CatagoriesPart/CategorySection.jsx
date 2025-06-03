// // ... baki import & code same

// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "../../../../axios";
// // import { motion } from 'framer-motion';
// import React, { useState, useEffect } from 'react';
// import axios from '../../../../axios';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import CategorySearch from './searchpart/CategorySearch';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
//   hover: {
//     scale: 1.05,
//     boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
//     transition: { duration: 0.3 },
//   },
// };

// const MAX_VISIBLE = 10;


// const CategorySection = () => {
//   const [data, setData] = useState([]);
//   const [showMore, setShowMore] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`/category/getCategory?ts=${Date.now()}`)
//       .then((res) => {
//         setData(res?.data?.data || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching categories:", err);
//       });
//   }, []);
// const MAX_VISIBLE = 10;
//   // Agar search term hai, toh data ko filter karo wahan se jo match ho
//   const filteredData = searchTerm
//     ? data.filter((category) =>
//         (category.title || category.name || "")
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())
//       )
//     : data;

//   // Show limited ya all depend karta hai showMore pe
//   const visibleCategories = !showMore ? filteredData.slice(0, MAX_VISIBLE) : filteredData;

//   return (
//     <div className="px-4 py-6 relative">
//       <h1 className="text-2xl font-bold mb-6 text-center">Explore Categories</h1>

//       {filteredData.length > 0 ? (
//         <motion.div
//           className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-6 justify-items-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {visibleCategories.map((category, index) => (
//             <motion.div
//               key={category._id || index}
//               className="flex flex-col items-center justify-center text-center p-3 bg-white rounded-lg cursor-pointer select-none"
//               onClick={() => navigate(`/subcategory/${category._id}`)}
//               variants={itemVariants}
//               whileHover="hover"
//               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//             >
//               <img
//                 src={category.image}
//                 alt={category.title || 'category'}
//                 className="w-12 h-12 object-contain mb-2"
//               />
//               <p className="text-sm font-semibold text-gray-800">
//                 {category.title || category.name}
//               </p>
//             </motion.div>
//           ))}

//           {!showMore && filteredData.length > MAX_VISIBLE && (
//             <motion.div
//               className="flex flex-col items-center justify-center text-center p-3 bg-gray-100 rounded-lg cursor-pointer select-none hover:bg-gray-200"
//               onClick={() => setShowMore(true)}
//               variants={itemVariants}
//               whileHover="hover"
//             >
//               <p className="text-sm font-semibold text-blue-600">+ Show More</p>
//             </motion.div>
//           )}
//         </motion.div>
//       ) : (
//         <p className="text-center text-gray-500">Loading or No Categories Found</p>
//       )}

//       {/* Modal for hidden categories (only when showMore is true) */}
//       {showMore && (
//         <div className="fixed inset-0 backdrop-blur-sm bg-transparent z-50 flex items-center justify-end pr-6">
//           <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[95vh] shadow-lg overflow-y-auto">
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
//               <h2 className="text-xl font-semibold">More Categories</h2>
//               <div className="flex items-center gap-2 w-full sm:w-auto">
//                 {/* Pass searchTerm and setSearchTerm as props */}
//                 <CategorySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//                 <button
//                   onClick={() => {
//                     setShowMore(false);
//                     setSearchTerm(""); // Clear search on modal close
//                   }}
//                   className="text-gray-600 hover:text-red-500 text-2xl"
//                 >
//                   &times;
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
//               {filteredData.length > 0 ? (
//                 filteredData.map((category, index) => (
//                   <div
//                     key={category._id || index}
//                     className="flex flex-col items-center justify-center text-center p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
//                     onClick={() => {
//                       navigate(`/subcategory/${category._id}`);
//                       setShowMore(false);
//                       setSearchTerm("");
//                     }}
//                   >
//                     <img
//                       src={category.image}
//                       alt={category.title || 'category'}
//                       className="w-12 h-12 object-contain mb-2"
//                     />
//                     <p className="text-xs font-semibold text-gray-800">
//                       {category.title || category.name}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="col-span-full text-center text-gray-500">No categories found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategorySection;



import React, { useState, useEffect } from 'react';
import axios from '../../../../axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategorySearch from './searchpart/CategorySearch';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 },
  },
};

const MAX_VISIBLE = 10;

const CategorySection = () => {
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/category/getCategory?ts=${Date.now()}`)
      .then((res) => {
        setData(res?.data?.data || []);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  const filteredData = searchTerm
    ? data.filter((category) =>
        (category.title || category.name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : data;

  const visibleCategories = !showMore
    ? filteredData.slice(0, MAX_VISIBLE)
    : filteredData;

  return (
    <div className="px-4 py-6 relative">
      <h1 className="text-2xl font-bold mb-4 text-center">Explore Categories</h1>

      {/* Search input always visible */}
      <div className="flex justify-center mb-6">
        <CategorySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {filteredData.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visibleCategories.map((category, index) => (
            <motion.div
              key={category._id || index}
              className="flex flex-col items-center justify-center text-center p-3 bg-white rounded-lg cursor-pointer select-none"
              onClick={() => navigate(`/subcategory/${category._id}`)}
              variants={itemVariants}
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={category.image}
                alt={category.title || 'category'}
                className="w-12 h-12 object-contain mb-2"
              />
              <p className="text-sm font-semibold text-gray-800">
                {category.title || category.name}
              </p>
            </motion.div>
          ))}

          {!showMore && filteredData.length > MAX_VISIBLE && (
            <motion.div
              className="flex flex-col items-center justify-center text-center p-3 bg-gray-100 rounded-lg cursor-pointer select-none hover:bg-gray-200"
              onClick={() => setShowMore(true)}
              variants={itemVariants}
              whileHover="hover"
            >
              <p className="text-sm font-semibold text-blue-600">+ Show More</p>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">No matching categories found</p>
      )}

      {/* Modal for More Categories */}
      {showMore && (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent z-50 flex items-center justify-end pr-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[95vh] shadow-lg overflow-y-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              <h2 className="text-xl font-semibold">More Categories</h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <CategorySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <button
                  onClick={() => {
                    setShowMore(false);
                    setSearchTerm('');
                  }}
                  className="text-gray-600 hover:text-red-500 text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filteredData.length > 0 ? (
                filteredData.map((category, index) => (
                  <div
                    key={category._id || index}
                    className="flex flex-col items-center justify-center text-center p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      navigate(`/subcategory/${category._id}`);
                      setShowMore(false);
                      setSearchTerm('');
                    }}
                  >
                    <img
                      src={category.image}
                      alt={category.title || 'category'}
                      className="w-12 h-12 object-contain mb-2"
                    />
                    <p className="text-xs font-semibold text-gray-800">
                      {category.title || category.name}
                    </p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No categories found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySection;