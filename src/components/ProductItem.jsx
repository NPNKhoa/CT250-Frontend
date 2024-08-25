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
      className='block bg-white rounded-lg shadow-md overflow-hidden w-60 h-80'
    >
      <div className='flex justify-center w-full h-2/3'>
        <img src={imageUrl} alt={name} className='w-auto h-full object-cover' />
      </div>
      <div className='p-4 h-1/3'>
        <h3 className='h-2/3 text-sm text-gray-800'>{name}</h3>
        <p className='h-1/3 text-red-600 font-bold'>{formattedPrice}</p>
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
