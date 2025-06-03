import React from 'react';

const BurhanpurBlog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-purple-800 animate-fade-in">
            Discover Burhanpur: The Hidden Gem of Madhya Pradesh
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            A city rich in history, culture, and architectural beauty.
          </p>
        </header>

        <div className="rounded-xl overflow-hidden shadow-lg mb-12 transition-transform duration-500 hover:scale-105">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Shahi_Qila%2C_Burhanpur.jpg/1280px-Shahi_Qila%2C_Burhanpur.jpg"
            alt="Shahi Qila"
            className="w-full h-72 object-cover"
          />
        </div>

        <div className="space-y-12 text-gray-800 text-lg leading-relaxed">
          <section className="bg-white/70 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:translate-y-1">
            <h2 className="text-3xl font-semibold text-purple-700 mb-3">🏰 Royal Heritage</h2>
            <p>
              Burhanpur is home to majestic Mughal architecture including the Shahi Qila, Jama Masjid, and the Tomb of Shah Nawaz Khan. It was once a favorite city of Emperor Shah Jahan.
            </p>
          </section>

          <section className="bg-white/70 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:translate-y-1">
            <h2 className="text-3xl font-semibold text-purple-700 mb-3">💧 Ancient Water Systems</h2>
            <p>
              The city is famous for its underground water channels known as "Kundi Bhandara", an engineering marvel developed during the Mughal period that still functions today.
            </p>
          </section>

          <section className="bg-white/70 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:translate-y-1">
            <h2 className="text-3xl font-semibold text-purple-700 mb-3">🎨 Culture and Handicrafts</h2>
            <p>
              Burhanpur is known for its exquisite Zardozi embroidery, textile printing, and traditional handwork. It remains a hub for artisans who carry forward its cultural legacy.
            </p>
          </section>

          <section className="bg-white/70 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:translate-y-1">
            <h2 className="text-3xl font-semibold text-purple-700 mb-3">🌿 Natural Serenity</h2>
            <p>
              Nestled on the banks of the Tapti River, Burhanpur offers a peaceful atmosphere, surrounded by lush landscapes and spiritual landmarks such as Dargah-e-Hakimi.
            </p>
          </section>
        </div>

        <div className="mt-16 bg-purple-100/70 p-8 rounded-lg text-center shadow-xl animate-pulse">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">Why Visit Burhanpur?</h3>
          <ul className="text-gray-800 space-y-2 text-lg">
            <li>✨ Marvelous Mughal Architecture</li>
            <li>🚿 Ingenious Water Supply System</li>
            <li>🧵 Traditional Craftsmanship</li>
            <li>🏞️ Spiritual Peace and Beauty</li>
          </ul>
        </div>

        <footer className="mt-20 text-center text-sm text-gray-600">
          &copy; 2025 | Blog by Pooja Gaykvad | Burhanpur City | Skill Exchange Project
        </footer>
      </div>
    </div>
  );
};

export default BurhanpurBlog;
