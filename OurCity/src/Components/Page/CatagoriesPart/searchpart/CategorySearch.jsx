
import { useState, useEffect } from "react";
import axios from "../../../../../axios";


const CategorySearch = ({ searchTerm, setSearchTerm }) => {
  const [inputText, setInputText] = useState(searchTerm || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setInputText(searchTerm);
  }, [searchTerm]);

  const handleSearch = async () => {
    const trimmedSearch = inputText.trim();
    setSearchTerm(trimmedSearch); // Send trimmed search term to parent

    if (!trimmedSearch) {
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Optional backend check – can be removed if not needed
      await axios.get('/category/searchCategory', {
        params: { search: trimmedSearch.toLowerCase() },
      });
    } catch (err) {
      setError('Search failed, try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    setSearchTerm(value.trim()); // Real-time local filtering
    if (!value.trim()) {
      setError('');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search categories..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <svg
            className="animate-spin h-4 w-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span>Finding matching categories...</span>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CategorySearch;

