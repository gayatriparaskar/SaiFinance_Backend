import React from 'react';
import { Link } from 'react-router-dom';

const CityCategories = () => {
  const categories = [
    { title: 'B2B', image: '/icons/b2b.png', link: '/b2b' },
    { title: 'Doctors', image: '/icons/doctor.png', link: '/doctors' },
    { title: 'Travel', image: '/icons/travel.png', link: '/travel' },
    { title: 'Car Hire', image: '/icons/car.png', link: '/car-hire' },
    { title: 'Beauty', image: '/icons/beauty.png', link: '/beauty' },
    { title: 'Wedding Planning', image: '/icons/wedding.png', link: '/wedding' },
    { title: 'Gyms', image: '/icons/gym.png', link: '/gyms' },
    { title: 'Education', image: '/icons/education.png', link: '/education' },
    { title: 'Packers & Movers', image: '/icons/movers.png', link: '/packers' },
    { title: 'Repairs & Services', image: '/icons/repair.png', link: '/repairs' },
    { title: 'Rent or Hire', image: '/icons/rent.png', link: '/rent' },
    { title: 'Jobs', image: '/icons/jobs.png', link: '/jobs' },
    { title: 'Loans', image: '/icons/loans.png', link: '/loans' },
    { title: 'Real Estate', image: '/icons/realestate.png', link: '/realestate' },
    { title: 'PG/Hostel', image: '/icons/hostel.png', link: '/pg' },
    { title: 'Show More', image: '/icons/more.png', link: '/more' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2
        className="text-2xl mb-6 text-center text-gray-900 border-b border-gray-300 pb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Explore Categories
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
        {categories.map((cat) => (
          <Link to={cat.link} key={cat.title} className="flex flex-col items-center hover:scale-105 transition">
            <div className="w-14 h-14 mb-2">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-medium text-gray-800">{cat.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityCategories;
