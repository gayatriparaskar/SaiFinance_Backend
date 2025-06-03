import React from 'react';

const CultureSection = () => {
  const cultureItems = [
    {
      icon: '🕌',
      title: 'Religious Harmony',
      description: 'Burhanpur is home to grand mosques, temples, and dargahs reflecting its spiritual unity.',
    },
    {
      icon: '🎉',
      title: 'Festivals',
      description: 'Festivals like Diwali, Eid, and Urs at Dargah-e-Hakimi are celebrated with vibrant energy.',
    },
    {
      icon: '🎭',
      title: 'Folk Performances',
      description: 'Local fairs and cultural events showcase traditional music, dance, and storytelling.',
    },
    {
      icon: '🎨',
      title: 'Handicrafts & Art',
      description: 'Famous for its handloom, zari work, and Mughal-era artistic legacy.',
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-900 to-yellow-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 font-serif">Culture & Festivals of Burhanpur</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cultureItems.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
