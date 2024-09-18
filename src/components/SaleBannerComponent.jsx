import Vot from '../assets/SaleBanner/Vot.webp';
// import Giay from '../assets/SaleBanner/giay.webp';
// import Quanao from '../assets/SaleBanner/quanao.webp';

const saleItems = [
  {
    image: Vot,
    alt: 'Vợt cầu lông',
    title: 'Vợt cầu lông',
    discount: 'Giảm giá đến 50%',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
  },
  {
    image: Vot,
    alt: 'Vợt cầu lông',
    title: 'Vợt cầu lông',
    discount: 'Giảm giá đến 20%',
    bgColor: 'bg-gray-800',
    textColor: 'text-white',
  },
  {
    image: Vot,
    alt: 'Vợt cầu lông',
    title: 'Vợt cầu lông',
    discount: 'Giảm giá đến 30%',
    bgColor: 'bg-white',
    textColor: 'text-black',
    subTextColor: 'text-gray-700',
  },
];

function SaleBannerComponent() {
  return (
    <div className='bg-gray-100'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {saleItems.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300`}
          >
            <img
              src={item.image}
              alt={item.alt}
              className='w-full object-cover'
            />
            <div className='p-2'>
              <h3 className={`text-xl font-semibold ${item.textColor} mb-1`}>
                {item.title}
              </h3>
              <p className={`${item.textColor || item.subTextColor}`}>
                {item.discount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SaleBannerComponent;
