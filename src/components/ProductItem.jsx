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
    <Link
      to={productLink}
      className='block bg-white rounded-lg shadow-md overflow-hidden w-64 h-96'
    >
      <div className='w-full h-2/3'>
        <img src={imageUrl} alt={name} className='w-full h-full object-cover' />
      </div>
      <div className='p-4 h-1/3'>
        <h3 className='text-base text-gray-800'>{name}</h3>
        <p className='text-red-600 font-bold'>{formattedPrice}</p>
      </div>
    </Link>
  );
};

ProductItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productLink: PropTypes.string.isRequired,
};

export default ProductItem;
