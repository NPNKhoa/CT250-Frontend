import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp',
    link: '#',
  },
  {
    url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/banner-sale-12_1695182579.webp',
    link: '#',
  },
  {
    url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/nanoflare-800_1698800723.webp',
    link: '#',
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const changeSlide = direction => {
    setCurrentSlide(
      prevSlide => (prevSlide + direction + totalSlides) % totalSlides
    );
  };

  const goToSlide = index => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full overflow-hidden'>
      <div className='relative h-64 md:h-80 lg:h-96 xl:h-[500px]'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Link to={slide.link} rel='noopener noreferrer'>
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className='w-full h-full object-cover'
              />
            </Link>
          </div>
        ))}
      </div>

      <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 rtl:space-x-reverse'>
        {slides.map((_, index) => (
          <button
            key={index}
            type='button'
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            aria-current={currentSlide === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      <button
        type='button'
        className='absolute top-1/2 -left-4 z-30 flex items-center justify-center h-10 w-10 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none'
        onClick={() => changeSlide(-1)}
      >
        <svg
          className='w-4 h-4 text-gray-800'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 6 10'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 1L1 5l4 4'
          />
        </svg>
        <span className='sr-only'>Previous</span>
      </button>

      <button
        type='button'
        className='absolute top-1/2 -right-4 z-30 flex items-center justify-center h-10 w-10 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none'
        onClick={() => changeSlide(1)}
      >
        <svg
          className='w-4 h-4 text-gray-800'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 6 10'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M1 9l4-4-4-4'
          />
        </svg>
        <span className='sr-only'>Next</span>
      </button>
    </div>
  );
};

export default Carousel;
