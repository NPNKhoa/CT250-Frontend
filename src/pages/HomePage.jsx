import { useEffect, useState } from 'react';

import Carousel from '@components/Carousel';
import ProductItem from '@components/ProductItem';

import FeatureBoxes from '@components/FeatureBoxes';
// import SaleBannerComponent from '@components/SaleBannerComponent';
import ProductList from '@components/ProductList';
import VoucherList from '@components/HomePage/VoucherList';
import recommendationService from '@services/recommendation.service';
import SuggestedProducts from '@components/HomePage/SuggestedProducts';
// import SaleOffComponent from '@components/SaleOffComponent';

const HomePage = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await recommendationService.getNewProduct(5);
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
      link: '/products?productType=Phụ%20kiện%20cầu%20lông',
    },
  ];

  const productsTN = [
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/bvot-tennis.jpg',
      name: 'Vợt TENNIS',
      link: '/products?productType=Vợt%20tennis',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/b-tui-tennis.jpg',
      name: 'Túi tennis',
      link: '/products?productType=Túi%20tennis',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/b-balo-tennis.jpg',
      name: 'Balo tennis',
      link: '/products?productType=Balo%20tennis',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/cuoc-tennis.jpg',
      name: 'Phụ kiện tennis',
      link: '/products?productType=Phụ%20kiện%20tennis',
    },
  ];

  const productsBKB = [
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/vot-pickleball_1718941016.jpg',
      name: 'Vợt pickleball',
      link: '/products?productType=Vợt%20PickleBall',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/tui-pickleball_1718941360.jpg',
      name: 'Túi pickleball',
      link: '/products?productType=Túi%20Pickleball',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/bong-pickleball_1718941306.jpg',
      name: 'Balo pickleball',
      link: '/products?productType=Balo%20Pickleball',
    },
    {
      image:
        'https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/phu-kien-pickleball-2_1719190265.jpg',
      name: 'Phụ kiện pickleball',
      link: '/products?productType=Phụ%20kiện%20Pickleball',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* slider */}
      <section className='relative'>
        <Carousel />
      </section>

      <section className='py-6 bg-white'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Chào mừng đến với cửa hàng của chúng tôi!
          </h1>
          <p className='text-sm sm:text-lg md:text-xl text-gray-600'>
            Khám phá những sản phẩm mới nhất và ưu đãi hấp dẫn dành riêng cho
            bạn.
          </p>
        </div>
      </section>

      {/* feature */}
      <FeatureBoxes />

      {/* products sale
      <section className='py-4'>
        <div className='container mx-auto px-4'>
          <SaleOffComponent />
        </div>
      </section> */}
      <section className='py-4'>
        <div className='container mx-auto px-4'>
          {/* Tiêu đề */}
          <h2 className='text-3xl font-bold text-center hover:text-primary mb-4'>
            Sản phẩm mới nhất
          </h2>
          <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[50vw] md:w-[30vw] mx-auto'></span>

          {/* Thanh điều hướng */}
          <div className='flex justify-between mb-4'>
            <div className='flex items-center space-x-4'></div>
            <div className='mt-2 sm:mt-0'>
              <a
                href='/products?productType=Vợt%20cầu%20lông'
                className='text-primary hover:underline'
              >
                Xem tất cả »
              </a>
            </div>
          </div>

          {/* Khu vực sản phẩm */}
          <div className='flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible scrollbar-hide'>
            {Array.isArray(products) &&
              products.map((product, index) => (
                <div
                  key={index}
                  className='flex-shrink-0 w-[calc(80vw/2)] sm:w-[calc(90vw/2)] md:w-auto'
                >
                  <ProductItem
                    imageUrl={product?.productImagePath[0]}
                    name={product?.productName}
                    price={
                      product?.price *
                      ((100 - (product?.discount?.discountPercent || 0)) / 100)
                    }
                    productLink={`products/detail/${product._id}`}
                    discount={product?.discount?.discountPercent}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className='py-4'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center hover:text-primary mb-4'>
            Sản phẩm nổi bật
          </h2>
          <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[50vw] md:w-[30vw] mx-auto'></span>
          <SuggestedProducts />
        </div>
      </section>

      <section className='py-4'>
        <h2 className='text-3xl font-bold text-center hover:text-primary mb-4'>
          Voucher hot nhất
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[50vw] md:w-[30vw] mx-auto'></span>
        <div className='mx-auto px-4'>
          <VoucherList />
        </div>
      </section>

      {/* Sale banner */}
      {/* <div className='container mx-auto px-4 py-6'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Khuyến mãi cực lớn
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[30vw] mx-auto'></span>
        <SaleBannerComponent />
      </div> */}

      {/* Product List */}
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Sản phẩm cầu lông
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[50vw] md:w-[30vw] mx-auto'></span>
        <ProductList products={productsBMT} />
      </div>

      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Sản phẩm Tennis
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[50vw] md:w-[30vw] mx-auto'></span>
        <ProductList products={productsTN} />
      </div>

      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-4 hover:text-primary'>
          Sản phẩm Pickleball
        </h2>
        <span className='mb-6 bg-primary h-2 rounded flex justify-center w-[50vw] md:w-[30vw] mx-auto'></span>
        <ProductList products={productsBKB} />
      </div>
    </div>
  );
};

export default HomePage;
