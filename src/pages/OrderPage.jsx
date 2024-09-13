import { getUserAddressThunk } from '@redux/thunk/addressThunk';
import { getCartByUser } from '@redux/thunk/cartThunk';
import { getLoggedInUser } from '@redux/thunk/userThunk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    image:
      'https://shopvnb.com/img/180x180//uploads/gallery/tui-cau-long-yonex-bag2326t01r-black-light-lime-chinh-hang_1721681701.webp',
    name: 'Túi cầu lông Yonex BAG2326T01R-Black/Light lime chính hãng',
    price: 519000,
  },
  {
    id: 2,
    image:
      'https://shopvnb.com/img/180x180//uploads/gallery/tui-cau-long-yonex-bag2326t01r-black-light-lime-chinh-hang_1721681701.webp',
    name: 'Túi cầu lông Yonex BA253 Xám - Gia công',
    price: 850000,
  },
];

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.user);
  const { addresses } = useSelector(state => state.address);

  const { cart } = useSelector(state => state.cart);
  const cartItems = cart?.cartItems || [];
  const defaultAddress = addresses.find(address => address.isDefault) || {};
  const accessToken = localStorage.getItem('accessToken');
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    dispatch(getLoggedInUser(accessToken));
    dispatch(getCartByUser(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || '',
        phone: user.phone || '',
        address: addresses.length > 0 ? addresses[0].address : '', // Lấy địa chỉ đầu tiên nếu có
        email: user.email || '',
        notes: user.notes || '',
      });
    }
  }, [user, addresses]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = e => {
    const { value } = e.target;
    setFormData({ ...formData, address: value });
  };

  const formattedAddress = defaultAddress?.detail
    ? `${defaultAddress.commune}, ${defaultAddress.district}, ${defaultAddress.province}, ${defaultAddress.detail}`
    : 'Chưa cập nhật';

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );
  };

  return (
    <div className='container mx-auto py-8 px-4'>
      <h1 className='text-3xl font-bold text-center mb-4'>VNBSports</h1>
      <h2 className='text-xl font-semibold text-center mb-6'>
        Đơn hàng ( {cartItems.length} sản phẩm)
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Thông tin nhận hàng */}
        <div className='bg-white shadow-md rounded-lg p-6'>
          <h3 className='text-xl font-semibold mb-4'>Thông tin nhận hàng</h3>
          <div className='space-y-4'>
            <input
              type='text'
              name='fullname'
              value={formData.fullname}
              onChange={handleChange}
              placeholder='Họ và tên'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Số điện thoại'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              name='address'
              value={formattedAddress}
              onChange={handleAddressChange}
              placeholder='Địa chỉ'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              placeholder='Ghi chú'
              className='w-full p-2 border border-gray-300 rounded'
              rows='4'
            />
          </div>
        </div>

        {/* Thanh toán */}
        <div className='bg-white shadow-md rounded-lg p-6'>
          <h3 className='text-xl font-semibold mb-4'>Thanh toán</h3>
          <div className='flex flex-col space-y-2 mb-4'>
            <label className='flex items-center'>
              <input type='radio' name='payment' value='cod' defaultChecked />
              <span className='ml-2'>Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className='flex items-center'>
              <input type='radio' name='payment' value='bank' />
              <span className='ml-2'>Thanh toán qua ví VNPay</span>
            </label>
          </div>

          {/* Bảng sản phẩm */}
          <div className='mb-4'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='text-left py-2 px-4 border-b'>Sản phẩm</th>
                  <th className='text-right py-2 px-4 border-b'>Giá</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className='border-b'>
                    <td className='py-2 px-4 flex items-center space-x-4'>
                      <img
                        src={item.product.productImagePath?.[0] || ''}
                        alt={item.product.productName}
                        className='w-16 h-16 object-cover rounded-md'
                      />
                      <span> {item.product.productName}</span>
                    </td>
                    <td className='text-right py-2 px-4'>
                      {(item.itemPrice * item.quantity).toLocaleString(
                        'vi-VN',
                        {
                          style: 'currency',
                          currency: 'VND',
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className='font-bold'>
                  <td className='text-right py-2 px-4 border-t'>Tổng cộng</td>
                  <td className='text-right py-2 px-4 border-t'>
                    {calculateTotal().toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Nút hành động */}
          <div className='flex justify-end space-x-4'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => navigate('/cart')}
            >
              Sửa giỏ hàng
            </button>
            <button
              className='bg-primary hover:bg-hover-primary text-white font-bold py-2 px-4 rounded'
              onClick={() => navigate('/thankyou')}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
