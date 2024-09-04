import { useEffect, useState, useMemo } from 'react';
import BreadcrumbsComponent from '@components/Breadcrumb';
import { Link, useParams } from 'react-router-dom';

import CheckIcon from '@mui/icons-material/Check';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Vnpay from '@assets/vnpay.png';
import RatingSection from '@components/RatingSection';
import Alert from '@components/Alert';

import productService from '@services/product.service';
import productTypeService from '@services/productType.service';
import brandService from '@services/brand.service';
import cartService from '@services/cart.service';

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);

  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await productService.getById(id);
        setProducts(productResponse.data);
        const productTypeResponse = await productTypeService.getAll();
        setProductTypes(productTypeResponse.data);
        const brandResponse = await brandService.getAll();
        setBrands(brandResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [id]);

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

  const giftsData = [
    {
      id: 1,
      content: 'Tặng 2 Quấn cán vợt Cầu Lông: VNB 001, VS002 hoặc Joto 001',
    },
    {
      id: 2,
      content: 'Sản phẩm cam kết chính hãng',
    },
    {
      id: 3,
      content: 'Một số sản phẩm sẽ được tặng bao đơn hoặc bao nhung bảo vệ vợt',
    },
    {
      id: 4,
      content: 'Thanh toán sau khi kiểm tra và nhận hàng (Giao khung vợt)',
    },
    {
      id: 5,
      content:
        'Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay)',
    },
  ];

  const benefitsData = [
    {
      id: 1,
      content: 'Sơn logo mặt vợt miễn phí',
    },
    {
      id: 2,
      content: 'Bảo hành lưới đan trong 72 giờ',
    },
    {
      id: 3,
      content: 'Thay gen vợt miễn phí trọn đời',
    },
    {
      id: 4,
      content: 'Tích lũy điểm thành viên Premium',
    },
    {
      id: 5,
      content: 'Voucher giảm giá cho lần mua hàng tiếp theo',
    },
  ];

  const productData = products.technicalSpecification || [];

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

  // const handleInputChange = event => {
  //   const newValue = parseInt(event.target.value);
  //   if (!isNaN(newValue) && newValue >= 0 && newValue <= Infinity) {
  //     setQuantity(newValue);
  //   }
  // };
  const accessToken = localStorage.getItem('accessToken');
  const handleAddToCart = () => {

    cartService.addToCart(accessToken, {
      productId: products._id,
      quantity: quantity,
    });
    setNotification({ message: 'Đã thêm vào giỏ hàng!', type: 'success' });

  };

  const [openTypeIndices, setOpenTypeIndices] = useState([]);

  const toggleMenu = index => {
    setOpenTypeIndices(prevIndices =>
      prevIndices.includes(index)
        ? prevIndices.filter(i => i !== index)
        : [...prevIndices, index]
    );
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />

      {/* product detail */}
      <div className='container mx-auto py-8 px-4'>
        {/* product top */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <div className='flex flex-col items-center  p-2'>
              <img
                src={currentImage}
                alt={products.productName}
                className='w-96 h-96 object-contain'
              />
              <div className='flex space-x-4 mt-4'>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Hình ảnh ${index + 1}`}
                    className={`w-20 h-24 cursor-pointer object-contain border  rounded-lg
                        ${
                          currentImage === image
                            ? 'border-primary'
                            : 'border-gray-300'
                        } hover:border-primary`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{products.productName}</h1>
            <p className='text-gray-600  mb-2'>Mã: VNB019090</p>
            <p className=' mb-2'>
              Thương hiệu:{' '}
              <span className='text-primary'>
                {products.productBrand?.brandName}
              </span>{' '}
              | Tình trạng:{' '}
              <span className='text-primary'>
                {products.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </p>
            <div className='flex items-center gap-3  mb-8'>
              <p className='text-2xl font-bold text-primary'>
                {products.price &&
                  (products.price * 0.8)
                    .toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })
                    .replace('₫', 'đ')}
              </p>
              <p className='line-through text-gray-400'>
                Giá niêm yết:{' '}
                {products.price &&
                  products.price
                    .toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })
                    .replace('₫', 'đ')}
              </p>
            </div>

            <div className='bg-gray-100 p-4 rounded-md border border-primary relative'>
              <div className='absolute -top-5 border px-3 py-1 rounded-lg bg-gray-100  border-primary'>
                <h2 className='text-xl font-bold text-primary flex items-center gap-3'>
                  <CardGiftcardIcon /> Ưu đãi
                </h2>
              </div>

              <ul className='list-disc space-y-2 mt-4'>
                {giftsData.map(benefit => (
                  <li key={benefit.id} className='list-none gap-5'>
                    <CheckIcon className='text-primary font-bold' />
                    {benefit.content}
                  </li>
                ))}
              </ul>

              <h2 className='text-xl font-bold mt-4'>
                Ưu đãi thêm khi mua sản phẩm tại{' '}
                <span className='text-primary'>VNB Premium</span>
              </h2>

              <ul className='list-disc space-y-2'>
                {benefitsData.map(benefit => (
                  <li key={benefit.id} className='list-none gap-5'>
                    <CheckBoxIcon className='text-green-500 ' />
                    {benefit.content}
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex  items-center mt-5'>
              <button
                className='bg-primary hover:bg-hover-primary text-white font-bold py-2 px-4 rounded-full'
                onClick={decrement}
              >
                -
              </button>
              {/* <input
                type='number'
                className='w-20 text-center px-4 py-2 border mx-1 border-primary rounded-lg'
                value={quantity}
                readOnly
                onChange={handleInputChange}
              /> */}
              <span
                className='w-20 text-center px-4 py-2 border mx-1 border-primary rounded-lg'
                value={quantity}
              >
                {quantity}
              </span>
              <button
                className='bg-primary hover:bg-hover-primary text-white font-bold py-2 px-4 rounded-full'
                onClick={increment}
              >
                +
              </button>
            </div>

            <div className='flex mt-4'>
              <button className='bg-primary hover:bg-hover-primary text-white font-bold p-4 rounded-lg w-full'>
                MUA NGAY
              </button>
              <button
                onClick={handleAddToCart}
                className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full ml-2'
              >
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
            <button className=' bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-4 rounded-lg mt-4 flex flex-col items-center'>
              THANH TOÁN BẰNG VÍ VNPAY
              <img src={Vnpay} alt='' className='w-24 ' />
            </button>
          </div>
        </div>

        {/* product bottom */}
        <div className='flex'>
          <div className='container w-3/4 mt-5 px-4'>
            <div className='grid grid-cols-2 font-semibold text-2xl py-2 border-b-2'>
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
            </div>
            {/* Hiển thị nội dung dựa trên activeTab */}{' '}
            {activeTab === 'description' ? (
              <div className='p-10 space-y-4 text-gray-800  flex justify-center items-center'>
                <div
                  className='product-description'
                  dangerouslySetInnerHTML={{ __html: products.description }}
                />
              </div>
            ) : (
              <table className='table-auto w-full mt-3'>
                <tbody>
                  {productData.map((item, index) => (
                    <tr key={index} className='border border-gray-300 '>
                      <td className='w-2/5 p-3 border border-gray-300 font-bold'>
                        {item.specificationName.specificationName}
                      </td>
                      <td className='px-4 py-2 border border-gray-300'>
                        {item.specificationDesc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className='w-1/4 pt-3'>
            <div className='w-full max-w-xs p-4 bg-white rounded-lg shadow'>
              <h2 className='text-lg font-bold flex justify-center items-center'>
                DANH MỤC SẢN PHẨM
              </h2>
              <h3 className='m-2'>
                {productTypes.map((type, index) => (
                  <div key={index}>
                    <div className='flex justify-between items-center my-4'>
                      <Link to={'/'}>{type.productTypeName}</Link>
                      <button
                        onClick={() => toggleMenu(index)}
                        className='text-lg'
                      >
                        {openTypeIndices.includes(index) ? '-' : '+'}
                      </button>
                    </div>
                    <ul>
                      {openTypeIndices.includes(index) &&
                        brands.map((brand, idx) => (
                          <li key={idx} className='m-4'>
                            <Link
                              to={`/products?productType=${encodeURIComponent(
                                type.productTypeName
                              )}&brand=${encodeURIComponent(brand.brandName)}`}
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
          </div>
        </div>
        <RatingSection />
      </div>
      <Alert message={notification.message} type={notification.type} />
    </>
  );
};

export default ProductDetail;
