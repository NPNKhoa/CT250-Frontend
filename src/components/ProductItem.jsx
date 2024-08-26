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
    <div className='block bg-white rounded-lg shadow-md overflow-hidden w-auto'>
      <div className='flex justify-center w-full h-2/3'>
        <Link to={`/${productLink}`}>
          <img
            src={imageUrl}
            alt={name}
            className='w-auto h-full object-cover'
          />
        </Link>
      </div>
      <div className='p-4 h-1/3'>
        <Link to={`/${productLink}`}>
          <h3 className='h-2/3 text-sm text-gray-800'>{name}</h3>
        </Link>
        <p className='h-1/3 text-red-600 font-bold'>{formattedPrice}</p>
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
