import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const formatPriceToVND = price => {
  return price
    .toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    .replace('₫', 'đ');
};

const ProductItem = ({ imageUrl, name, price, productLink }) => {
  const formattedPrice = formatPriceToVND(price);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='flex justify-center items-center w-full h-80'>
        {' '}
        {/* Đặt chiều cao cố định */}
        <Link to={`/${productLink}`}>
          <img
            src={imageUrl}
            alt={name}
            className='w-full h-full object-cover'
          />
        </Link>
      </div>

      <div className='p-4 flex flex-col justify-between h-32'>
        {' '}
        <Link to={`/${productLink}`}>
          <h3 className='text-sm text-gray-800 line-clamp-2'>{name}</h3>
        </Link>
        <p className='text-primary font-bold'>{formattedPrice}</p>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productLink: PropTypes.string.isRequired,
};

export default ProductItem;
