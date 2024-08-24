import BreadcrumbsComponent from '@components/Breadcrumb';
import { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Vnpay from '@assets/Vnpay.png';

const ProductDetail = () => {
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Vợt cầu lông', href: '/product/vot' },
    { label: 'Vợt cầu lông Yonex', href: '/product/vot-yonex' },
    {
      label: 'Vợt cầu lông Yonex Arcsaber 1 Feel (Lavender) chính hãng',
      href: '/product/vot-yonex/vot-yonex-arcsaber1',
    },
  ];

  const images = [
    'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang_1709061799.webp',
    'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang-4_1709061807.webp',
    'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang-3_1709061821.webp',
    'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang-1_1709061829.webp',
  ];

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

  const [currentImage, setCurrentImage] = useState(images[0]);
  const handleImageClick = image => {
    setCurrentImage(image);
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

  const handleInputChange = event => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= Infinity) {
      setQuantity(newValue);
    }
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='container mx-auto py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <div className='flex flex-col items-center  p-2'>
              <img
                src={currentImage}
                alt='Vợt cầu lông Yonex'
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
            <h1 className='text-3xl font-bold mb-2'>
              Vợt Cầu Lông Yonex Arcsaber 1 Feel (Lavender) Chính Hãng
            </h1>
            <p className='text-gray-600  mb-2'>Mã: VNB019090</p>
            <p className=' mb-2'>
              Thương hiệu: <span className='text-primary'>Yonex</span> | Tình
              trạng: <span className='text-primary'>Còn hàng</span>
            </p>
            <div className='flex items-center gap-3  mb-8'>
              <p className='text-2xl font-bold text-primary'>559.000 ₫</p>
              <p className='line-through text-gray-400'>
                Giá niêm yết: 670.000 ₫
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
              <input
                type='number'
                className='w-20 text-center px-4 py-2 border mx-1 border-primary rounded-lg'
                value={quantity}
                readOnly
                onChange={handleInputChange}
              />
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
              <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full ml-2'>
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
            <button className=' bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-4 rounded-lg mt-4 flex flex-col items-center'>
              THANH TOÁN BẰNG VÍ VNPAY
              <img src={Vnpay} alt='' className='w-24 ' />
            </button>
          </div>
        </div>

        <div className='mt-8'>
          <h2 className='text-xl font-bold'>Thông tin thêm</h2>
          <p>
            Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay)
          </p>
          <p>Mua hàng tại VNB Premium để nhận thêm nhiều ưu đãi</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
