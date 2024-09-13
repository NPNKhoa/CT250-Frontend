import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAddressThunk } from '../redux/thunk/addressThunk';
import orderSevice from '../services/orderService';

function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const { addresses } = useSelector(state => state.address);
  const { cart } = useSelector(state => state.cart);
  const cartItems = cart?.cartItems || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    const defaultAddress = addresses.find(address => address.isDefault);
    if (user) {
      setFormData({
        fullname: defaultAddress?.fullname || '',
        phone: defaultAddress?.phone || '',
        address: defaultAddress
          ? `${defaultAddress.detail}, ${defaultAddress.commune}, ${defaultAddress.district}, ${defaultAddress.province}`
          : '',
        email: user.email || '',
        notes: '',
      });
    }
  }, [user, addresses]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSelect = index => {
    const selectedAddress = addresses[index];
    if (selectedAddress) {
      setFormData({
        ...formData,
        address: `${selectedAddress.detail}, ${selectedAddress.commune}, ${selectedAddress.district}, ${selectedAddress.province}`,
        fullname: selectedAddress.fullname || formData.fullname,
        phone: selectedAddress.phone || formData.phone,
      });
    }
    setIsModalOpen(false);
  };

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

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Thông tin nhận hàng */}
        <div className='bg-white shadow-lg rounded-lg p-6 md:col-span-1'>
          <h3 className='text-xl font-semibold mb-4'>Thông tin nhận hàng</h3>
          <div className='space-y-4'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='w-full p-3 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Chọn địa chỉ
            </button>
            <input
              type='text'
              name='fullname'
              value={formData.fullname}
              onChange={handleChange}
              placeholder='Họ và tên'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Số điện thoại'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Địa chỉ'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              placeholder='Ghi chú'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows='4'
            />
          </div>
        </div>

        {/* Thanh toán */}
        <div className='bg-white shadow-lg rounded-lg p-6 md:col-span-2'>
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
                  <th className='text-left py-2 px-4 border-b whitespace-nowrap'>
                    Sản phẩm
                  </th>
                  <th className='text-right py-2 px-4 border-b whitespace-nowrap'>
                    Số lượng
                  </th>
                  <th className='text-right py-2 px-4 border-b whitespace-nowrap'>
                    Giá
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className='border-b hover:bg-gray-50'>
                    <td className='py-2 px-4 flex items-center space-x-4'>
                      <img
                        src={item.product.productImagePath?.[0] || ''}
                        alt={item.product.productName}
                        className='w-16 h-16 object-cover rounded-md'
                      />
                      <span>{item.product.productName}</span>
                    </td>
                    <td className='text-right py-2 px-4'>{item.quantity}</td>
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
                  <td className='text-right py-2 px-4 border-t' colSpan='2'>
                    Tổng cộng
                  </td>
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

      {/* Modal for selecting address */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-6 w-1/2 max-h-1/2 overflow-y-auto'>
            <h3 className='text-xl font-semibold mb-4'>Chọn địa chỉ</h3>
            <ul className='space-y-2'>
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className='p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-100'
                  onClick={() => handleAddressSelect(index)}
                >
                  <div className='font-bold'>{address.fullname}</div>
                  <div>{address.phone}</div>
                  <div>{`${address.detail}, ${address.commune}, ${address.district}, ${address.province}`}</div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsModalOpen(false)}
              className='mt-4 w-full p-3 bg-primary hover:bg-hover-primary text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500'
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;