import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Atom } from 'react-loading-indicators';
import axios from '../../../../axios';

const SingleSubcategoryPage = () => {
    const { id } = useParams();
    const [subcategory, setSubcategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Captured ID from useParams:", id); // ✅ check this!

        axios
            .get(`/subcategory/getSubCategory/${id}`)
            .then((res) => {
                console.log(res.data)
                setSubcategory(res.data.result || null); // ✅ FIXED THIS LINE
                setLoading(false);
            })
            .catch((err) => {
                console.error('Subcategory detail fetch failed:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
                <Atom color="#fa0606" size="medium" />
            </div>
        );
    }

    if (!subcategory) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Subcategory Not Found</h2>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
                <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="w-full h-60 object-cover rounded-md mb-4"
                />
                <h2 className="text-3xl font-bold mb-2">{subcategory.name}</h2>
                <p className="text-gray-600 mb-2">{subcategory.description}</p>
                <p className="text-gray-800 font-medium">{subcategory.address}</p>
            </div>
        </div>
    );
};

export default SingleSubcategoryPage;
