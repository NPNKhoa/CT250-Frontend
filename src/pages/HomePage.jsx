import Carousel from '@components/Carousel';
import ProductItem from '@components/ProductItem';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <section className='relative'>
        <Carousel />
      </section>

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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <ProductItem
              imageUrl='https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-arcsaber-1-feel-lavender-chinh-hang_1715113370.webp'
              name='Vợt cầu lông Yonex Arcsaber 1 Feel (Lavender) chính hãng'
              price={1000000}
              productLink='/product/vot-yonex/vot-yonex-arcsaber1'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
