import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ProductList({ products }) {
  return (
    <div className='container mx-auto py-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {products.map(product => (
          <Link
            key={product.name}
            to={product.link}
            className='bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 uppercase hover:text-primary'
            aria-label={`Xem chi tiết ${product.name}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-56 object-cover'
            />
            <div className='p-4 text-center'>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {product.name}
              </h3>
              <button className='text-sm bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-colors'>
                Mua ngay
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
