// import first from '../img/slider_image_2.jpg';

export default function ImageSlider() {
  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg relative">
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* Item 1 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src='https://files.oaiusercontent.com/file-FZ2FUoGNAMuDaqAEMe4Vft?se=2025-05-05T10%3A22%3A20Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dad86697a-1fba-4aa0-a97b-c385dde0fe36.png&sig=xU3l0nq4kizvehQ6YeqLKZd0v%2BUOC3sxLGCl1cFc0PY%3D'
              className="absolute block w-full h-56 md:h-96 object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Burhanpur"
            />
          </div>

          {/* Other slides */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://files.oaiusercontent.com/file-LGdysBFXw2rEecqCYABR8o?se=2025-05-05T10%3A22%3A21Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D27a8b643-26c7-4fba-aebd-1982207ad38f.jpg&sig=B0/%2B%2B%2BCM5ySxN0Qqa4b2whuWYNrFtlrmMOJ4dy337/E%3D"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Slide 2"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="/docs/images/carousel/carousel-3.svg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Slide 3"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://files09.oaiusercontent.com/file-55BV3myHMQLUBGka55e5T2?se=2025-05-05T10%3A22%3A20Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3DIMG-20250428-WA0016.jpg&sig=/mx0/Bfa1Wp0ZAFWtxgjGfnK1iZmCuY7TgjnBvqGfNU%3D"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Slide 4"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="/docs/images/carousel/carousel-5.svg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Slide 5"
            />
          </div>
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              type="button"
              className="w-3 h-3 rounded-full bg-white"
              aria-label={`Slide ${i + 1}`}
              data-carousel-slide-to={i}
            ></button>
          ))}
        </div>

        {/* Controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
