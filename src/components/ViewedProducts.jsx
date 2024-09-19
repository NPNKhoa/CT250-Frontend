import productService from '@services/product.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewedProducts() {
  const [products, setProducts] = useState([]);

  const userId = localStorage.getItem('loggedInUserId');

  const getViewedProductsForUser = userId => {
    const viewedProducts = localStorage.getItem(`viewedProducts_${userId}`)
      ? JSON.parse(localStorage.getItem(`viewedProducts_${userId}`))
      : [];
    return viewedProducts;
  };

  useEffect(() => {
    const viewedProductsId = getViewedProductsForUser(userId);

    const fetchProducts = async () => {
      try {
        const products = await Promise.all(
          viewedProductsId.map(productId => productService.getById(productId))
        );

        const reversedProducts = products
          .map(response => response.data)
          .reverse();

        setProducts(reversedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    if (viewedProductsId.length > 0) {
      fetchProducts();
    }
  }, [userId]);

  return (
    <div className='mx-auto px-4 border p-5 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Sản phẩm đã xem</h2>
      <div className='flex flex-col gap-4 justify-center items-center'>
        {Array.isArray(products) &&
          products.map(product => (
            <Link
              key={product?._id}
              to={`http://localhost:3000/products/detail/${product._id}`}
              className='bg-white shadow-md rounded-lg overflow-hidden flex items-center gap-4 no-underline'
            >
              <img
                src={product?.productImagePath[0]}
                alt={product?.productName}
                className='w-16 h-24 object-cover'
              />
              <div className='p-4'>
                <h3
                  className='sm:text-base text-sm font-medium'
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {product?.productName}
                </h3>
                <p className='text-primary font-semibold mt-2'>
                  {product?.price
                    .toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })
                    .replace('₫', 'đ')}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default ViewedProducts;
