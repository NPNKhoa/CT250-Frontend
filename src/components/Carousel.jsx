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
    <div className='relative w-full' data-carousel='slide'>
      <div className='relative h-96 overflow-hidden md:h-128'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 duration-700 ease-in-out ${
              currentSlide === index ? 'block' : 'hidden'
            }`}
          >
            <Link to={slide.link} rel='noopener noreferrer'>
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className='w-full h-96 md:h-128 object-cover'
              />
            </Link>
          </div>
        ))}
      </div>

      <div className='absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse'>
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
        className='absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        onClick={() => changeSlide(-1)}
      >
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
          <svg
            className='w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180'
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
        </span>
      </button>

      <button
        type='button'
        className='absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        onClick={() => changeSlide(1)}
      >
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
          <svg
            className='w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180'
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
        </span>
      </button>
    </div>
  );
};

export default Carousel;
