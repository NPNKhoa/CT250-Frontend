import { ToVietnamCurrencyFormat } from '../helpers/ConvertCurrency';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductItem = ({ imageUrl, name, price, productLink, discount }) => {
  const formattedPrice = ToVietnamCurrencyFormat(price);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='flex justify-center items-center w-full h-44 md:h-64 lg:h-80'>
        {/* Điều chỉnh chiều cao theo kích thước màn hình */}
        <Link to={`/${productLink}`}>
          <img
            src={imageUrl}
            alt={name}
            className='w-full h-full object-cover'
          />
        </Link>
      </div>

      <div className='p-4 flex flex-col justify-between h-28 md:h-32'>
        {/* Điều chỉnh padding và chiều cao theo kích thước màn hình */}
        <Link to={`/${productLink}`}>
          <h3 className='text-xs md:text-base text-gray-800 sm:line-clamp-2 line-clamp-3'>
            {name}
          </h3>
        </Link>
        <div className='flex gap-2 items-center'>
          <p className='text-primary font-bold text-sm md:text-lg'>
            {formattedPrice}
          </p>
          <p className=' text-white font-bold bg-primary px-2 py-1 rounded-xl text-sm sm:text-base'>
            -{discount}%
          </p>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productLink: PropTypes.string.isRequired,
  discount: PropTypes.string,
};

export default ProductItem;
