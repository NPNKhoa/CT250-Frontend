import { useEffect, useState, useMemo } from 'react';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';

import CheckIcon from '@mui/icons-material/Check';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// import Vnpay from '@assets/vnpay.png';
import RatingSection from '@components/RatingSection';
// import Alert from '@components/Alert';

import productService from '@services/product.service';
import cartService from '@services/cart.service';

import { setSelectedProduct } from '@redux/slices/cartSlice';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@redux/thunk/cartThunk';
import ViewedProducts from '@components/ViewedProducts';
import { toast } from 'react-toastify';

import { ToVietnamCurrencyFormat } from '../helpers/ConvertCurrency';
import CountdownTimer from '@components/CountdownTimer';

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [promotion, setPromotion] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem('loggedInUserId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await productService.getById(id);
        setProducts(productResponse.data);
        setPromotion(productResponse.data.promotion);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
    saveViewedProductForUser(userId, id);
  }, [id, userId]);

  const saveViewedProductForUser = (userId, productId) => {
    let viewedProducts = localStorage.getItem(`viewedProducts_${userId}`)
      ? JSON.parse(localStorage.getItem(`viewedProducts_${userId}`))
      : [];

    if (!viewedProducts.includes(productId)) {
      viewedProducts.push(productId);
    }

    viewedProducts = viewedProducts.slice(-3);

    localStorage.setItem(
      `viewedProducts_${userId}`,
      JSON.stringify(viewedProducts)
    );
  };

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    {
      label: `${products.productType?.productTypeName}`,
      href: `/products?productType=${products.productType?.productTypeName}`,
    },
    {
      label: `${products.productType?.productTypeName} ${products.productBrand?.brandName}`,
      href: `/products?productType=${products.productType?.productTypeName}&brand=${products.productBrand?.brandName}`,
    },
    {
      label: `${products.productName}`,
      href: `/products/${id}`,
    },
  ];

  const images = useMemo(
    () => products.productImagePath || [],
    [products.productImagePath]
  );
  const [currentImage, setCurrentImage] = useState(images[0]); // Khởi tạo với giá trị an toàn

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]); // Cập nhật currentImage khi images thay đổi

  const handleImageClick = image => {
    setCurrentImage(image);
  };

  const giftsData = promotion?.productIds || [];
  const benefitsData = promotion?.serviceIds || [];

  const productData = products?.technicalSpecification;

  const [activeTab, setActiveTab] = useState('description');
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.authUser);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Bạn cần phải đăng nhập để thêm sản phẩm vào giỏ hàng!');
      // navigate('/login');
      return;
    }
    dispatch(
      addToCart({
        accessToken: localStorage.getItem('accessToken'),
        data: {
          productId: products._id,
          quantity: quantity,
        },
      })
    );
    toast.success('Đã thêm vào giỏ hàng!');
  };

  // const [openTypeIndices, setOpenTypeIndices] = useState([]);

  // const toggleMenu = index => {
  //   setOpenTypeIndices(prevIndices =>
  //     prevIndices.includes(index)
  //       ? prevIndices.filter(i => i !== index)
  //       : [...prevIndices, index]
  //   );
  // };

  const handleBuyNow = async () => {
    if (!user) {
      toast.error('Bạn cần phải đăng nhập để mua hàng');
      // navigate('/login');
      return;
    }
    const response = await cartService.createCartDetail(
      localStorage.getItem('accessToken'),
      {
        productId: products._id,
        quantity: quantity,
      }
    );
    dispatch(setSelectedProduct([response.data._id]));
    toast.success('Thanh toán ngay');
    navigate('/order');
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />

      {/* product detail */}
      <div className='container mx-auto py-8 px-4'>
        {/* product top */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <div className='flex flex-col items-center p-2'>
              <img
                src={
                  String(currentImage).startsWith('http')
                    ? currentImage
                    : `http://localhost:5000/${String(currentImage).replace(/\\/g, '/')}`
                }
                alt={products.productName}
                className='w-96 h-96 object-contain'
              />
              {/* Thêm container cho hình ảnh nhỏ có thể cuộn ngang khi màn hình nhỏ */}
              <div className='flex space-x-4 mt-4 overflow-x-auto no-scrollbar'>
                {/* Đặt chiều rộng cố định cho các hình ảnh để chúng không co lại quá nhiều */}
                {images.slice(0, 5).map((image, index) => (
                  <img
                    key={index}
                    src={
                      String(image).startsWith('http')
                        ? image
                        : `http://localhost:5000/${String(image).replace(/\\/g, '/')}`
                    }
                    alt={`Hình ảnh ${index + 1}`}
                    className={`w-20 h-24 cursor-pointer object-contain border rounded-lg
        ${currentImage === image ? 'border-primary' : 'border-gray-300'}
        hover:border-primary`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className=''>
            {/* Tên sản phẩm và mã sản phẩm */}
            <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-2'>
              {products.productName}
            </h1>
            <p className='text-gray-600 mb-2 text-sm sm:text-base'>
              Mã: VNB019090
            </p>

            {/* Thương hiệu và tình trạng */}
            <p className='mb-2 text-sm sm:text-base'>
              Thương hiệu:{' '}
              <span className='text-primary'>
                {products.productBrand?.brandName}
              </span>{' '}
              | Tình trạng:{' '}
              <span className='text-primary'>
                {products.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </p>

            {/* Giá sản phẩm */}
            <div className='flex flex-row items-center gap-1 sm:gap-3 mb-1'>
              <p className='text-xl sm:text-2xl font-bold text-primary'>
                {products.price &&
                  ToVietnamCurrencyFormat(
                    products.price *
                      ((100 - products.discount.discountPercent) / 100)
                  )}
              </p>
              <p className='line-through text-gray-400 text-sm sm:text-base'>
                Giá niêm yết:{' '}
                {products.price && ToVietnamCurrencyFormat(products.price)}
              </p>
              <p className=' text-white font-bold bg-primary p-1 rounded-xl text-sm sm:text-base'>
                -{products.discount?.discountPercent}%
              </p>
            </div>
            <CountdownTimer
              targetDate={products.discount?.discountExpiredDate}
              label='Kết thúc trong:'
            />

            {(giftsData?.length > 0 || benefitsData?.length > 0) && (
              <div className='bg-gray-100 p-4 rounded-md border border-primary relative mt-10'>
                <div className='absolute -top-8 border px-3 py-1 rounded-lg bg-gray-100 border-primary'>
                  <h2 className='text-lg sm:text-xl font-bold text-primary flex flex-col items-left gap-1'>
                    <div className=''>
                      <CardGiftcardIcon /> Ưu đãi{' '}
                    </div>
                    <span className='text-sm'>
                      (từ{' '}
                      {new Date(
                        products.promotion?.promotionStartDate
                      ).toLocaleDateString('vi-VN')}{' '}
                      đến{' '}
                      {new Date(
                        products.promotion?.promotionExpiredDate
                      ).toLocaleDateString('vi-VN')}
                      )
                    </span>
                  </h2>
                </div>

                {/* Danh sách ưu đãi */}
                {giftsData?.length > 0 && (
                  <>
                    <h3 className='text-lg sm:text-xl font-bold mt-6'>
                      Quà tặng kèm:
                    </h3>
                    <ul className='list-disc space-y-2 mt-2'>
                      {giftsData.map((gift, index) => (
                        <li
                          key={index}
                          className='list-none flex items-center gap-2'
                        >
                          <CheckIcon className='text-primary font-bold' />
                          <Link
                            className='hover:text-primary'
                            to={`/products/detail/${gift._id}`}
                          >
                            {gift.productName}
                          </Link>
                          <p className='italic text-red-600'>
                            (trị giá: {ToVietnamCurrencyFormat(gift.price)})
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {/* Ưu đãi thêm */}
                {benefitsData?.length > 0 && (
                  <>
                    <h3 className='text-lg sm:text-xl font-bold mt-4'>
                      Dịch vụ kèm theo:
                    </h3>
                    <ul className='list-disc space-y-2 mt-2'>
                      {benefitsData.map((benefit, index) => (
                        <li
                          key={index}
                          className='list-none flex items-center gap-2'
                        >
                          <CheckBoxIcon className='text-green-500' />
                          {benefit.serviceName}
                          <p className='italic text-red-600'>
                            (trị giá:{' '}
                            {ToVietnamCurrencyFormat(benefit.servicePrice)})
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {/* Nút tăng/giảm số lượng */}
            <div className='flex items-center mt-5'>
              <button
                className='bg-primary hover:bg-hover-primary text-white font-bold py-2 px-3 rounded-full'
                onClick={decrement}
              >
                -
              </button>
              <span className='w-16 sm:w-20 text-center px-2 sm:px-4 py-2 border mx-1 border-primary rounded-lg'>
                {quantity}
              </span>
              <button
                className='bg-primary hover:bg-hover-primary text-white font-bold py-2 px-3 rounded-full'
                onClick={increment}
              >
                +
              </button>
            </div>

            {/* Nút mua ngay và thêm vào giỏ hàng */}
            <div className='flex flex-col sm:flex-row mt-4 gap-2'>
              <button
                className='bg-primary hover:bg-hover-primary text-white font-bold py-3 rounded-lg w-full'
                onClick={handleBuyNow}
              >
                MUA NGAY
              </button>
              <button
                onClick={handleAddToCart}
                className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg w-full'
              >
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>

        {/* product bottom */}
        <div className='flex flex-col lg:flex-row'>
          <div className='container w-full lg:w-3/4 mt-5 px-4'>
            {/* Tabs for description and specifications */}
            <div className='grid grid-cols-2 font-semibold text-lg sm:text-2xl lg:text-2xl py-2 border-b-2'>
              <button
                className={`button ${
                  activeTab === 'description'
                    ? ' text-primary'
                    : ' text-gray-700'
                }`}
                onClick={() => handleTabChange('description')}
              >
                Mô tả sản phẩm
              </button>
              {productData != '' && (
                <button
                  className={`button ${
                    activeTab === 'specifications'
                      ? ' text-primary'
                      : ' text-gray-700'
                  }`}
                  onClick={() => handleTabChange('specifications')}
                >
                  Thông số kỹ thuật
                </button>
              )}
            </div>

            {activeTab === 'description' ? (
              <div className='p-2 sm:p-4 lg:p-10 space-y-4 text-gray-800 flex justify-center items-center'>
                <div
                  className='product-description'
                  dangerouslySetInnerHTML={{ __html: products.description }}
                />
              </div>
            ) : products.technicalSpecification ? (
              <table className='table-auto w-full mt-3 text-sm sm:text-base'>
                <tbody>
                  {productData.map((item, index) => (
                    <tr key={index} className='border border-gray-300'>
                      <td className='w-2/5 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 font-bold'>
                        {item.specificationName.specificationName}
                      </td>
                      <td className='px-3 py-2 sm:px-4 sm:py-2 border border-gray-300'>
                        {item.specificationDesc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className='text-gray-700'>Thông số kỹ thuật không có sẵn.</p>
            )}
          </div>

          {/* <div className='w-full sm:w-1/4 pt-3 hidden lg:block'>
            <div className='w-full max-w-xs p-4 bg-white rounded-lg shadow'>
              <h2 className='text-base sm:text-lg font-bold text-center'>
                DANH MỤC SẢN PHẨM
              </h2>
              <h3 className='m-2'>
                {productTypes.map((type, index) => (
                  <div key={index}>
                    <div className='flex justify-between items-center my-4'>
                      <Link
                        to={'/'}
                        className='text-sm sm:text-base hover:text-primary'
                      >
                        {type.productTypeName}
                      </Link>
                      <button
                        onClick={() => toggleMenu(index)}
                        className='text-lg sm:text-xl'
                      >
                        {openTypeIndices.includes(index) ? '-' : '+'}
                      </button>
                    </div>
                    <ul className='pl-4'>
                      {openTypeIndices.includes(index) &&
                        brands.map((brand, idx) => (
                          <li key={idx} className='m-2'>
                            <Link
                              to={`/products?productType=${encodeURIComponent(
                                type.productTypeName
                              )}&brand=${encodeURIComponent(brand.brandName)}`}
                              className='text-sm sm:text-base hover:text-primary'
                            >
                              {`${type.productTypeName} ${brand.brandName}`}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </h3>
            </div>
          </div> */}
        </div>

        <div className='flex flex-col lg:flex-row'>
          <div className='container w-full lg:w-3/4 mt-5 px-4'>
            <RatingSection productId={id} />
          </div>
          <div className='w-full sm:w-1/4 pt-3 '>
            <ViewedProducts />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
