import { useEffect, useState } from 'react';

import Carousel from '@components/Carousel';
import ProductItem from '@components/ProductItem';

import productService from '@services/product.service';
import FeatureBoxes from '@components/FeatureBoxes';

const HomePage = () => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll(null, 1, 5);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100'>
      <section className='relative'>
        <Carousel />
      </section>
      <FeatureBoxes />

      <section className='py-6 bg-white'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            Chào mừng đến với cửa hàng của chúng tôi!
          </h1>
          <p className='text-gray-600 text-lg'>
            Khám phá những sản phẩm mới nhất và ưu đãi hấp dẫn dành riêng cho
            bạn.
          </p>
        </div>
      </section>

      <section className='py-4'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center text-primary mb-8'>
            Sản phẩm nổi bật
          </h2>
          <div className='grid grid-cols-5 gap-3'>
            {Array.isArray(products) &&
              products.map((product, index) => (
                <ProductItem
                  key={index}
                  imageUrl={product.productImagePath[0]}
                  name={product.productName}
                  price={product.price}
                  productLink={`products/detail/${product._id}`}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
