import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Atom } from 'react-loading-indicators';
import axios from '../../../../axios';

const SubcategoryPage = () => {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/subcategory/getSubCategory/${categoryId}`)
      .then((res) => {

        setSubcategories(res?.data?.result || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Subcategory fetch failed', err);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <Atom color="#fa0606" size="medium" />
        </div>
      ) : (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Subcategories</h2>

          {subcategories.length > 0 ? (
            <div className="space-y-6">
              {subcategories.map((sub, index) => (
                <div
                  key={sub._id}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-40 object-cover rounded-md sm:w-40 sm:h-40"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold">{sub.name}</h3>
                    <p className="text-gray-500 text-sm">{sub.description}</p>
                    <p className="text-gray-800 text-sm font-medium">{sub.address}</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary shadow-md transition">
                        📞 Call Now
                      </button>

                      <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 shadow-md transition">
                        Send Enquiry
                      </button>
                      <Link to={`/subcategorydetail/${sub._id}`}>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md transition">
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
              <p className="text-gray-600 mb-6">Oops! No subcategories found.</p>
              <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Go Home
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SubcategoryPage;
