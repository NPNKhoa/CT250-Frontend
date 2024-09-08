import { useEffect, useState } from 'react';

import Carousel from '@components/Carousel';
import ProductItem from '@components/ProductItem';

import productService from '@services/product.service';
import FeatureBoxes from '@components/FeatureBoxes';
import SaleBannerComponent from '@components/SaleBannerComponent';
import ProductList from '@components/ProductList';

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

  const productsBMT = [
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp',
      name: 'Vợt cầu lông',
      link: '/products?productType=Vợt%20cầu%20lông',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/5.webp',
      name: 'Túi vợt cầu lông',
      link: '/products?productType=Túi%20vợt%20cầu%20lông',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/6.webp',
      name: 'Balo cầu lông',
      link: '/products?productType=Balo%20cầu%20lông',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/7.webp',
      name: 'Phụ kiện cầu lông',
      link: '#',
    },
  ];

  const productsTN = [
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/bvot-tennis.jpg',
      name: 'Vợt TENNIS',
      link: '#',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/b-tui-tennis.jpg',
      name: 'Túi tennis',
      link: '#',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/b-balo-tennis.jpg',
      name: 'Balo tennis',
      link: '#',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/cuoc-tennis.jpg',
      name: 'Phụ kiện tennis',
      link: '#',
    },
  ];

  const productsBKB = [
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/vot-pickleball_1718941016.jpg',
      name: 'Vợt pickleball',
      link: '#',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/tui-pickleball_1718941360.jpg',
      name: 'Túi pickleball',
      link: '#',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/bong-pickleball_1718941306.jpg',
      name: 'Bóng pickleball',
      link: '#',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/phu-kien-pickleball-2_1719190265.jpg',
      name: 'Phụ kiện pickleball',
      link: '#',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* slider */}
      <section className='relative'>
        <Carousel />
      </section>

      {/* feature */}
      <FeatureBoxes />

      {/* products saleeee*/}
      <section className='py-4'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center hover:text-primary mb-4 uppercase'>
            Flash Sale
          </h2>
          <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[30vw] mx-auto'></span>
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

      {/* products */}
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
          <h2 className='text-3xl font-bold text-center hover:text-primary mb-4'>
            Sản phẩm nổi bật
          </h2>
          <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[30vw] mx-auto'></span>
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

      {/* Sale banner */}
      <div className='container mx-auto px-4 py-6'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Khuyến mãi cực lớn
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[30vw] mx-auto'></span>
        <SaleBannerComponent />
      </div>

      {/* Product List */}
      <div className='container mx-auto py-4'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Sản phẩm cầu lông
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[30vw] mx-auto'></span>
        <ProductList products={productsBMT} />
      </div>

      <div className='container mx-auto py-4'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Sản phẩm Tennis
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[30vw] mx-auto'></span>
        <ProductList products={productsTN} />
      </div>

      <div className='container mx-auto py-4'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Sản phẩm Pickleball
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[30vw] mx-auto'></span>
        <ProductList products={productsBKB} />
      </div>
    </div>
  );
};

export default HomePage;
