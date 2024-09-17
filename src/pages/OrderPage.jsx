import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAddressThunk } from '../redux/thunk/addressThunk';
import orderService from '@services/order.service';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import { getCartByUser } from '@redux/thunk/cartThunk';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [selectedAddress, setSelectedAddress] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const selectedProductIds =
    JSON.parse(localStorage.getItem('selectedProductIds')) || [];

  const filteredCartItems = cartItems.filter(item =>
    selectedProductIds.includes(item._id)
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    const defaultAddress = addresses.find(address => address.isDefault);
    setSelectedAddress(defaultAddress);
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

  useEffect(() => {
    const fetchDeliveryFee = async address => {
      try {
        setLoading(true);

        const response = await orderService.getDeliveryFee({
          province: address.province
            .replace('Tỉnh ', '')
            .replace('Thành phố ', ''),
          district: address.district,
          ward: address.commune,
        });

        setDeliveryFee(response);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryFee(selectedAddress);
  }, [selectedAddress]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSelect = index => {
    const selectedAddress = addresses[index];
    setSelectedAddress(selectedAddress);
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

  const handleSubmit = async () => {
    const { fullname, phone, address, email } = formData;

    // Kiểm tra nếu các trường cần thiết (trừ 'notes') không được điền
    if (!fullname || !phone || !address || !email) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    const order = {
      orderDetail: selectedProductIds,
      shippingAddress: selectedAddress._id,
      shippingMethod: '66e3b81baf451884b122e3d2',
      paymentMethod: '66e0a282b22a38dc6d06e84c',
      shippingFee: deliveryFee,
      totalPrice: calculateTotal() + deliveryFee,
    };
    try {
      setIsLoading(true);
      const response = await orderService.createOrder(order);
      if (response) {
        navigate('/thankyou');
      }
      dispatch(getCartByUser(localStorage.getItem('accessToken')));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return filteredCartItems.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );
  };

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giỏ hàng', href: '/cart' },
    { label: 'Đặt hàng' },
  ];

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            {/* Thông tin liên hệ và giao hàng */}
            <div className='bg-white shadow-lg rounded-lg p-6 lg:col-span-2'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Thông tin nhận hàng
              </h2>
              <div className='mt-4'>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='w-34 p-3 bg-primary text-white rounded focus:outline-none focus:ring-2  hover:bg-hover-primary'
                >
                  Chọn địa chỉ
                </button>
                <input
                  type='text'
                  name='fullname'
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder='Họ và tên'
                  className='w-full mt-4 p-3 border border-gray-300 rounded-md'
                  readOnly
                />
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Số điện thoại'
                  className='w-full mt-4 p-3 border border-gray-300 rounded-md'
                  readOnly
                />
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='Địa chỉ'
                  className='w-full mt-4 p-3 border border-gray-300 rounded-md'
                  readOnly
                />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className='w-full mt-4 p-3 border border-gray-300 rounded-md'
                  readOnly
                />
                <textarea
                  name='notes'
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder='Ghi chú'
                  className='w-full mt-4 p-3 border border-gray-300 rounded-md'
                  rows='4'
                />
              </div>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className='bg-white shadow-lg rounded-lg p-6 lg:col-span-3'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Phương thức thanh toán
              </h3>
              <div className='flex flex-col space-y-2 mb-4'>
                <label className='flex items-center space-x-2'>
                  <input
                    type='radio'
                    name='payment'
                    value='cod'
                    defaultChecked
                    className='form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
                  />
                  <span className='text-gray-700'>
                    Thanh toán khi nhận hàng (COD)
                  </span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type='radio'
                    name='payment'
                    value='bank'
                    className='form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
                  />
                  <span className='text-gray-700'>Thanh toán qua ví VNPay</span>
                </label>
              </div>
              <div className='border-t'>
                <h2 className='text-lg font-semibold text-gray-900 mt-4'>
                  Chi tiết đơn hàng
                </h2>
                <div className='mt-4'>
                  {filteredCartItems.map(item => (
                    <div
                      key={item.id}
                      className='flex items-center space-x-4 py-2'
                    >
                      <img
                        src={item.product.productImagePath?.[0] || ''}
                        alt={item.product.productName}
                        className='w-16 h-16 object-cover rounded-md'
                      />
                      <div>
                        <h3 className='text-gray-900'>
                          {item.product.productName}
                        </h3>
                        <p className='text-gray-500'>
                          Số lượng: {item.quantity}
                        </p>
                        <p>
                          {(item.itemPrice * item.quantity).toLocaleString(
                            'vi-VN',
                            {
                              style: 'currency',
                              currency: 'VND',
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mt-6 border-t border-gray-200 pt-4'>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Tổng tiền hàng:</span>
                    <span className='text-gray-900'>
                      {calculateTotal().toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <span className='text-gray-500'>Phí vận chuyển:</span>
                    <span className='text-gray-900'>
                      {deliveryFee.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <div className='flex justify-between mt-4 text-lg font-medium'>
                    <span>Tổng cộng:</span>
                    <span className='text-gray-900'>
                      {(calculateTotal() + deliveryFee).toLocaleString(
                        'vi-VN',
                        {
                          style: 'currency',
                          currency: 'VND',
                        }
                      )}
                    </span>
                  </div>
                </div>

                <div className='flex justify-between mt-6'>
                  <button
                    className='w-1/2 mr-2 font-semibold bg-gray-300 text-gray-700 py-3 rounded-md text-lg hover:bg-gray-400'
                    onClick={() => navigate('/cart')}
                  >
                    Trở về giỏ hàng
                  </button>
                  <button
                    className={`w-1/2 ml-2 font-semibold bg-primary text-white py-3 rounded-md text-lg ${
                      loading
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-hover-primary'
                    }`}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color='inherit' />
                    ) : (
                      'Xác nhận đặt hàng'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default OrderPage;
