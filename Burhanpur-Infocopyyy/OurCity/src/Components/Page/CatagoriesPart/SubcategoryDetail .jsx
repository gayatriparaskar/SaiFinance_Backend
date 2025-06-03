// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SubcategoryDetail = () => {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubCategory = async () => {
//       try {
//         const response = await axios.get(
//           "https://burhanpur-city-backend.vercel.app/api/subcategory/getSubCategory"
//         );
//         const allSubcategories = response?.data?.result || [];
//         const matched = allSubcategories.find((item) => item._id === id);
//         setData(matched || null);
//       } catch (error) {
//         console.error("Error fetching subcategory:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubCategory();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10 animate-pulse">Loading...</p>;
//   if (!data) return <p className="text-center mt-10">No subcategory data found.</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6 animate-fade-in">
//       <h1 className="text-3xl font-bold text-green-700 text-center">{data.name}</h1>

//       {data.image && (
//         <div className="flex justify-center">
//           <img
//             src={data.image}
//             alt={data.name}
//             className="w-72 h-72 object-cover rounded-2xl shadow-lg border-2 border-green-500"
//           />
//         </div>
//       )}

//       {data.description && (
//         <p className="text-gray-700 text-lg text-center">{data.description}</p>
//       )}

//       <div className="space-y-2 mt-4 text-gray-700">
//         {/* Contact Info */}
//         <h2 className="text-xl font-semibold text-green-700">Contact Information</h2>
//         {data.contact?.phone && <p>📞 <strong>Phone:</strong> {data.contact.phone}</p>}
//         {data.contact?.email && <p>✉️ <strong>Email:</strong> {data.contact.email}</p>}
//         {data.contact?.website && <p>🌐 <strong>Website:</strong> {data.contact.website}</p>}

//         {/* Personal Info */}
//         <h2 className="text-xl font-semibold mt-4 text-green-700">Personal Information</h2>
//         {data.personal_info?.type && <p>👤 <strong>Type:</strong> {data.personal_info.type}</p>}
//         {data.personal_info?.medium && <p>🎓 <strong>Medium:</strong> {data.personal_info.medium}</p>}
//         {data.personal_info?.board && <p>🏫 <strong>Board:</strong> {data.personal_info.board}</p>}
//         {data.personal_info?.classes && <p>📘 <strong>Classes:</strong> {data.personal_info.classes}</p>}

//         {/* Extra Fields */}
//         {data.facility && <p>🏢 <strong>Facility:</strong> {data.facility}</p>}
//         {data.timing && <p>⏰ <strong>Timing:</strong> {data.timing}</p>}
//         {data.calling && <p>📱 <strong>Calling:</strong> {data.calling}</p>}
//         {data.services && <p>🛠️ <strong>Services:</strong> {data.services}</p>}
//         {data.emergency && <p>🚨 <strong>Emergency Contact:</strong> {data.emergency}</p>}
//         {data.count && <p>🔢 <strong>Count:</strong> {data.count}</p>}
//         {data.isActive !== undefined && (
//           <p>✅ <strong>Status:</strong> {data.isActive ? "Active" : "Inactive"}</p>
//         )}
//         {data.createdAt && (
//           <p>📅 <strong>Created At:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>
//         )}
//       </div>

//       {/* Membership Plans */}
//       {data.membership_plans?.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold mt-6 text-green-700">Membership Plans</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
//             {data.membership_plans.map((plan, idx) => (
//               <div key={idx} className="border rounded-lg p-4 shadow-md">
//                 <h3 className="text-lg font-bold text-gray-800">
//                   {plan.planName} - ₹{plan.price}
//                 </h3>
//                 <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
//                   {plan.benefits?.map((b, i) => <li key={i}>{b}</li>)}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Gallery Images */}
//       {data.images?.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold mt-6 text-green-700">Gallery</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
//             {data.images.map((src, index) => (
//               <img
//                 key={index}
//                 src={src}
//                 alt={`Image ${index + 1}`}
//                 className="w-full h-60 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubcategoryDetail;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SubcategoryDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.get(
          "https://burhanpur-city-backend.vercel.app/api/subcategory/getSubCategory"
        );
        const allSubcategories = response?.data?.result || [];

        const matched = allSubcategories.find(
          (item) => item._id?.trim() === id?.trim()
        );

        setData(matched || null);
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 animate-pulse">Loading...</p>;

  if (!data)
    return <p className="text-center mt-10">No subcategory data found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-green-700 text-center">{data.name}</h1>

      {data.image && (
        <div className="flex justify-center">
          <img
            src={data.image}
            alt={data.name}
            className="w-72 h-72 object-cover rounded-2xl shadow-lg border-2 border-green-500"
          />
        </div>
      )}

      {data.description && (
        <p className="text-gray-700 text-lg text-center">{data.description}</p>
      )}

      <div className="space-y-2 mt-4 text-gray-700">
        <h2 className="text-xl font-semibold text-green-700">Contact Information</h2>
        {data.contact?.phone && <p>📞 <strong>Phone:</strong> {data.contact.phone}</p>}
        {data.contact?.email && <p>✉️ <strong>Email:</strong> {data.contact.email}</p>}
        {data.contact?.website && <p>🌐 <strong>Website:</strong> {data.contact.website}</p>}

        <h2 className="text-xl font-semibold mt-4 text-green-700">Personal Information</h2>
        {data.personal_info?.type && <p>👤 <strong>Type:</strong> {data.personal_info.type}</p>}
        {data.personal_info?.medium && <p>🎓 <strong>Medium:</strong> {data.personal_info.medium}</p>}
        {data.personal_info?.board && <p>🏫 <strong>Board:</strong> {data.personal_info.board}</p>}
        {data.personal_info?.classes && <p>📘 <strong>Classes:</strong> {data.personal_info.classes}</p>}

        {data.facility && <p>🏢 <strong>Facility:</strong> {data.facility}</p>}
        {data.timing && <p>⏰ <strong>Timing:</strong> {data.timing}</p>}
        {data.calling && <p>📱 <strong>Calling:</strong> {data.calling}</p>}
        {data.services && <p>🛠️ <strong>Services:</strong> {data.services}</p>}
        {data.emergency && <p>🚨 <strong>Emergency Contact:</strong> {data.emergency}</p>}
        {data.count && <p>🔢 <strong>Count:</strong> {data.count}</p>}
        {data.isActive !== undefined && (
          <p>✅ <strong>Status:</strong> {data.isActive ? "Active" : "Inactive"}</p>
        )}
        {data.createdAt && (
          <p>📅 <strong>Created At:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>
        )}
      </div>

      {data.membership_plans?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6 text-green-700">Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {data.membership_plans.map((plan, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-bold text-gray-800">
                  {plan.planName} - ₹{plan.price}
                </h3>
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                  {plan.benefits?.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.images?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6 text-green-700">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
            {data.images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-60 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubcategoryDetail;

