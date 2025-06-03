import React from 'react';

const CityMap = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Burhanpur Location</h2>
      <div className="w-full h-96">
        <iframe
          title="Burhanpur Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.079445548986!2d76.22897837470907!3d21.30716958041256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd823bdbdfb9d4b%3A0x26a0a3ad0a55327b!2sBurhanpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1681456390662!5m2!1sen!2sin"
        ></iframe>
      </div>
    </div>
  );
};

export default CityMap;
