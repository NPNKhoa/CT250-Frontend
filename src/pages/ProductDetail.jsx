import BreadcrumbsComponent from '@components/Breadcrumb';
import { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Vnpay from '@assets/Vnpay.png';
import { Link } from 'react-router-dom';
import RatingSection from '@components/RatingSection';

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

  const productData = [
    {
      specificationName: 'Trình Độ Chơi:',
      specificationDesc: 'Trung Bình',
    },
    {
      specificationName: 'Chiều dài vợt:',
      specificationDesc: '675 mm',
    },
    {
      specificationName: 'Phong Cách Chơi:',
      specificationDesc: 'Tấn Công',
    },
    {
      specificationName: 'Độ Cứng Đũa:',
      specificationDesc: 'Trung Bình',
    },
    {
      specificationName: 'Điểm Cân Bằng:',
      specificationDesc: 'Nặng Đầu',
    },
    {
      specificationName: 'Nội Dung Chơi:',
      specificationDesc: 'Cả Đơn và Đôi',
    },
    {
      specificationName: 'Trọng Lượng:',
      specificationDesc: '3U: 85 - 89g',
    },
  ];
  const [activeTab, setActiveTab] = useState(true);
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

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

      {/* product detail */}
      <div className='container mx-auto py-8'>
        {/* product top */}
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

        {/* product bottom */}
        <div className='container mx-auto mt-5'>
          <div className='grid grid-cols-2 font-semibold text-2xl py-2 border-b-2'>
            <button
              className={`button ${
                activeTab === 'description' ? ' text-primary' : ' text-gray-700'
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
          {/* Hiển thị nội dung dựa trên activeTab */}
          {activeTab === 'description' ? (
            <div className='p-4 space-y-4 text-gray-800'>
              <p>
                <strong>Vợt cầu lông Apacs EDGE SABER 10 (Black)</strong> chính
                hãng thuộc phân khúc vợt giá rẻ dành cho đối tượng người chơi
                phong trào yêu thích lối chơi công thủ toàn diện, linh hoạt
                trong tấn công cũng như phòng thủ. Mặc dù là cây vợt cầu lông
                giá rẻ nhưng <strong>Edge Saber 10 đỏ</strong>
                lại được trang bị những công nghệ hiện đại nhất của hãng có thể
                kể đến như:
              </p>

              <ul className='list-disc list-inside pl-4 space-y-2'>
                <li>GRAPHITE T-THROAT</li>
                <li>NEW CONTROL SUPPORT CAP</li>
                <li>ARMOR POWER FRAME</li>
              </ul>

              <p>
                Chất liệu khung vợt luôn là điểm nhấn của hãng{' '}
                <strong>Apacs</strong>, bộ khung carbon Nhật Bản cho mức căng
                tối đa siêu khủng lên đến 38Lbs. Thiết kế màu sắc trắng phối đỏ
                của <strong>vợt cầu lông Apacs EDGE SABER 10 (Black)</strong>
                chính hãng tựa dòng Arcsaber 11 của hãng Yonex.
              </p>

              <p>
                Thân vợt có độ dẻo trung bình, trợ lực tốt cho người chơi. Phần
                cán cầm vợt khá vừa tay, phù hợp với đại đa số người chơi phong
                trào tại Việt Nam. Nhìn chung, nếu bạn đang tìm kiếm một cây vợt
                giá rẻ, bộ khung chịu được mức căng cao thì{' '}
                <strong>Apacs EDGE SABER 10</strong> không thể thiếu trong danh
                sách tham khảo của bạn. Ngoài ra, các bạn cũng có thể tham khảo
                thêm các sản phẩm vợt cầu lông Apacs khác để chọn cho mình một
                cây vợt phù hợp với lối đánh của mình nhé.
              </p>

              <p className='font-semibold'>Thông số kỹ thuật:</p>

              <ul className='list-disc list-inside pl-4 space-y-2'>
                <li>Thương hiệu: Apacs</li>
                <li>Chất liệu khung vợt: 30 Tonne Japan HM Graphite</li>
                <li>Chất liệu đũa vợt: 24 Tonne Japan HM Graphite</li>
                <li>Trọng lượng: 4U (84g)</li>
                <li>Điểm cân bằng: 285 ± 3mm (Cân bằng)</li>
                <li>Chu vi cán vợt: G2</li>
                <li>Sức căng tối đa: 38 LBS ~ 17.2 kg</li>
                <li>Màu sắc: Đỏ - Trắng</li>
                <li>Hệ thống lỗ gen: 76 lỗ</li>
                <li>Nơi sản xuất: Malaysia</li>
              </ul>

              <p>
                <strong>GRAPHITE T-THROAT:</strong> Công nghệ khớp nối tại vị
                trí giữa khung và đũa vợt được Apacs nghiên cứu và chế tạo đem
                lại hiệu quả trong việc giảm thiểu độ xoắn, từ đó tăng độ chính
                xác sau mỗi pha đánh.
              </p>

              <p>
                <strong>SLIM SHAFT:</strong> Công nghệ đũa vợt siêu mỏng giúp
                cắt giảm lực cản không khí, tăng tốc độ đánh cây vợt cầu lông{' '}
                <strong>Apacs EDGE SABER 10 (Black)</strong> chính hãng.
              </p>

              <p>
                <strong>JAPAN HM GRAPHITE:</strong> Chất liệu siêu cứng và bền
                của Nhật Bản được sử dụng nhiều trên các dòng vợt hiện nay, đem
                lại độ bền cho khung và chịu được mức căng lớn, giảm thiểu trọng
                lượng đáng kể so với các vật liệu Carbon truyền thống.
              </p>

              <p>
                <strong>76 Grommets System:</strong> Hệ thống gen cho phép khung
                vợt có nhiều lỗ gen hơn thông thường với 76 lỗ (so với 72 lỗ),
                tăng sức bền dây vợt lên đến 7%.
              </p>

              <p>
                <strong>Vợt cầu lông Apacs EDGE SABER 10 (Black)</strong> chính
                hãng thích hợp cho lối chơi công thủ toàn diện nhưng hơi thiên
                về lối đánh phản tạt điều cầu để ép đối thủ mắc lỗi để ra đòn
                tấn công ghi điểm.
              </p>

              <p>
                Apacs EDGE SABER 10 sử dụng trong cả đánh đơn và đánh đôi ở vị
                trí trên lưới. Giá cả phù hợp cho các đối tượng người chơi như
                học sinh, sinh viên, người mới tập chơi hay người chơi giải trí
                ngoài trời.
              </p>

              <p>
                <span className='font-bold '>Xem thêm: </span>
                Những mẫu
                <span className='font-bold text-primary'>
                  {' '}
                  <Link to='#'> vợt cầu lông </Link>
                </span>{' '}
                chất lượng chính hãng tại ShopVNB.
              </p>
            </div>
          ) : (
            <table className='table-auto w-full mt-3'>
              <tbody>
                {productData.map((item, index) => (
                  <tr key={index} className='border border-gray-300 '>
                    <td className='w-2/5 p-3 border border-gray-300 font-bold'>
                      {item.specificationName}
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

        <RatingSection />
      </div>
    </>
  );
};

export default ProductDetail;
