import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    image:
      'https://cdn.shopvnb.com/img/300x300/uploads/gallery/vot-cau-long-yonex-nanoflare-555-chinh-hang_1722472563.webp',
    name: 'Vợt cầu lông Yonex NanoFlare 370 Speed (Blue) chính hãng',
    price: '1.919.000 ₫',
    link: '#',
  },
  {
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-555-chinh-hang_1722472563.webp',
    name: 'Vợt cầu lông Yonex NanoFlare 555 chính hãng',
    price: '3.349.000 ₫',
    link: '#',
  },
  {
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-astrox-88s-pro-ch-noi-dia-trung-limited-5.webp',
    name: 'Vợt cầu lông Yonex Astrox 88S Pro Limited',
    price: '7.200.000 ₫',
    link: '#',
  },
  {
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-wex-noi-dia-trung_1719176769.webp',
    name: 'Vợt Cầu Lông Yonex Nanoflare Wex',
    price: '1.750,000₫',
    link: '#',
  },
  {
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-astrox-3-dg-hf-blwt-chinh-hang_1704853437.webp',
    name: 'Vợt cầu lông Yonex Astrox 3 DG',
    price: '1.349.000 ₫ ',
    link: '#',
  },
];

// Countdown Timer
// eslint-disable-next-line react/prop-types
const CountdownTimer = ({ hours }) => {
  const [timeLeft, setTimeLeft] = useState(hours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = seconds => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-center border border-primary px-2 rounded-lg text-lg font-bold'>
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

function SaleOffComponent() {
  return (
    <div className='container mx-auto py-4'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center space-x-4'>
          <h2 className='text-2xl font-bold uppercase text-primary'>
            Flash Sale
          </h2>

          <CountdownTimer hours={24} />
        </div>

        <div>
          <a href='/products' className='text-primary hover:underline'>
            Xem tất cả »
          </a>
        </div>
      </div>

      <div className='lg:grid lg:grid-cols-5 gap-6 overflow-x-auto lg:overflow-x-visible no-scrollbar whitespace-nowrap lg:whitespace-normal'>
        {products.map((product, index) => (
          <div
            key={index}
            className='inline-block lg:block bg-white rounded-lg shadow-md overflow-hidden w-48 lg:w-auto'
          >
            <Link to={product.link}>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-44 sm:h-80 object-cover'
              />
            </Link>
            <div className='p-4 flex flex-col justify-between h-32'>
              <Link to={product.link}>
                <h3 className='text-xs sm:text-sm text-gray-800 line-clamp-2'>
                  {product.name}
                </h3>
              </Link>
              <p className='text-primary text-xs sm:text-sm font-bold'>
                {product.price}
              </p>

              <div className='flex items-center'>
                <span
                  role='img'
                  aria-label='fire'
                  className='text-red-500 mr-2'
                >
                  🔥
                </span>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-red-500 h-2 rounded-full'
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SaleOffComponent;
