// src/components/NewsSection.js
import React from "react";

const NewsSection = () => {
    const newsData = [

        {
            id: 1,
            title: "Burhanpur Mein Naya Park Khula",
            description: "Shahar mein ek naya eco-park khula jahan log walk aur yoga kar sakte hain.",
            date: "2025-05-18",
        },
        {
            id: 2,
            title: "Burhanpur Railway Station Ka Sundarikaran",
            description: "Railway station ka renovation complete ho gaya hai modern design ke sath.",
            date: "2025-05-17",
        },
    ];

    return (
        <div className="bg-gray-100 py-10 px-4 sm:px-8 lg:px-20">
            <h1 className="text-center text-4xl font-bold text-blue-900 py-8">🌆 Burhanpur City News</h1>

            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">📢 Latest News</h2>

            <div className="grid gap-6 md:grid-cols-2">
                {newsData.map((news) => (
                    <div key={news.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-l-4 border-blue-600">
                        <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
                        <p className="mt-2 text-gray-600">{news.description}</p>
                        <p className="mt-4 text-sm text-gray-500">📅 {news.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
