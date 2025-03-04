import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAddressThunk } from '../redux/thunk/addressThunk';
import orderService from '@services/order.service';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import { getCartByUser } from '@redux/thunk/cartThunk';
import { setSelectedProduct } from '@redux/slices/cartSlice';
import AddressFormDialog from '@components/ProfilePage/AddressFormDialog';
import cartService from '@services/cart.service';
import { toast } from 'react-toastify';
import shippingMethodService from '@services/shippingMethod.service';
import paymentMethodService from '@services/paymentMethod.service';
import { Gift } from 'lucide-react';

import { ToVietnamCurrencyFormat } from '../helpers/ConvertCurrency';
import voucherService from '@services/voucher.service';

function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const { addresses } = useSelector(state => state.address);
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
  const [isLoading, setIsLoading] = useState(false);

  // const selectedProductIds = useSelector(state => state.cart.selectedProduct);
  const selectedProductIds = JSON.parse(
    sessionStorage.getItem('selectedProductIds') || '[]'
  );
  console.log('productIds: ', selectedProductIds);

  const [productItems, setProductItems] = useState([]);

  const [shippingMethods, setShippingMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  // const [voucherInput, setVoucherInput] = useState('');
  const [voucher, setVoucher] = useState(0);
  const [ownVouchers, setOwnVouchers] = useState([]);

  const [discountPrice, setDiscountPrice] = useState(0);
  const handleSelectDiscount = voucher => {
    const selectedVoucher = voucher?.voucherId;

    const totalPrice = calculateTotal();

    let discountPrice = (totalPrice * selectedVoucher?.discountPercent) / 100;

    if (discountPrice > selectedVoucher?.maxPriceDiscount * 1000) {
      discountPrice = selectedVoucher?.maxPriceDiscount * 1000;
    }
    setDiscountPrice(discountPrice);

    setVoucher(selectedVoucher);
    setModalOpen(false);
  };

  // const handleApplyVoucher = () => {
  //   const foundCode = discountCodes.find(
  //     code => code.voucherCode === voucherInput.trim()
  //   );
  //   if (foundCode) {
  //     setVoucher(foundCode.discountPercentage);
  //     setModalOpen(false);
  //     setVoucherInput('');
  //   } else {
  //     alert('Mã giảm giá không hợp lệ.');
  //   }
  // };

  // const handleKeyPress = event => {
  //   if (event.key === 'Enter') {
  //     handleApplyVoucher();
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shipping = await shippingMethodService.getAll();
        setShippingMethods(shipping.data);
        const payment = await paymentMethodService.getAll();
        setPaymentMethods(payment.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCartDetail = async () => {
      const product = [];
      selectedProductIds.forEach(async id => {
        console.log('hehe: ', id);
        try {
          const data = await cartService.getCartDetail(id);
          product.push(data.data);
        } catch (error) {
          console.error(error);
        }
      });
      setProductItems(product);
    };

    fetchCartDetail();
  }, []);
  console.log(productItems);
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

  const [deliveryFees, setDeliveryFees] = useState([]);

  const fetchDeliveryFees = async address => {
    try {
      setIsLoading(true);
      const fees = [];
      await Promise.all(
        shippingMethods.map(async (method, index) => {
          const response = await orderService.getDeliveryFee(
            {
              province: address.province
                .replace('Tỉnh ', '')
                .replace('Thành phố ', ''),
              district: address.district,
              ward: address.commune,
            },
            method.shippingMethod
          );
          fees[index] = response;
        })
      );
      setDeliveryFees(fees);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      fetchDeliveryFees(selectedAddress);
    }
  }, [selectedAddress, shippingMethods]);

  useEffect(() => {
    setDeliveryFee(deliveryFees[deliveryMethod]);
  }, [deliveryFees, deliveryMethod]);

  useEffect(() => {
    const fetchUserVouchers = async () => {
      try {
        const response = await voucherService.getUserVouchers();
        setOwnVouchers(response.data);
      } catch (error) {
        console.error('Error fetching user vouchers:', error);
      }
    };

    fetchUserVouchers();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePayment = e => {
    const { value } = e.target;
    setSelectedPaymentMethod(value);
  };

  const handleChangeShipping = e => {
    const value = JSON.parse(e.target.value);
    setDeliveryMethod(value.index);
    setSelectedShippingMethod(value.id);
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
      toast.error('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!selectedPaymentMethod && !selectedShippingMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán và vận chuyển');
      return;
    }
    if (!selectedPaymentMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán');
      return;
    }

    if (!selectedShippingMethod) {
      toast.error('Vui lòng chọn phương thức vận chuyển');
      return;
    }

    const order = {
      orderDetail: selectedProductIds,
      shippingAddress: selectedAddress._id,
      shippingMethod: selectedShippingMethod,
      paymentMethod: selectedPaymentMethod,
      shippingFee: deliveryFee,
      voucherId: voucher._id,
    };
    try {
      setIsLoading(true);
      const response = await orderService.createOrder(order);
      if (response) {
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          dispatch(setSelectedProduct([]));
          toast.success('Đặt hàng thành công!');
          navigate('/thankyou');
        }
      }
      dispatch(getCartByUser(localStorage.getItem('accessToken')));
    } catch (error) {
      if (error.message) {
        toast.error('Xin lỗi. Voucher bạn chọn đã hết hạn!');
      }
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return productItems.reduce((total, item) => {
      const isDiscountActive =
        new Date(item.product.discount?.discountExpiredDate) > new Date();
      const itemPrice = isDiscountActive
        ? item.itemPrice *
          ((100 - (item.product.discount?.discountPercent || 0)) / 100)
        : item.itemPrice;

      return total + itemPrice * item.quantity;
    }, 0);
  };

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giỏ hàng', href: '/cart' },
    { label: 'Đặt hàng' },
  ];
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const handleClickOpen = (index = null) => {
    if (index !== null) {
      setEditAddress(addresses[index]);
    } else setEditAddress({});
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let maxDiscountPrice = (calculateTotal() * voucher.discountPercent) / 100;

  if (maxDiscountPrice > voucher.maxPriceDiscount * 1000) {
    maxDiscountPrice = voucher.maxPriceDiscount * 1000;
  }

  // Lọc voucher chưa hết hạn
  const validVouchers = ownVouchers.filter(voucher => {
    if (!voucher.voucherId?.expiredDate) return true; // Không có ngày hết hạn
    return new Date(voucher.voucherId.expiredDate) > new Date(); // Chưa hết hạn
  });

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
              {/* thanh toan */}
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Phương thức thanh toán
              </h3>
              <div className='flex flex-col space-y-2 mb-2'>
                {paymentMethods && paymentMethods.length > 0 ? (
                  paymentMethods.map(method => (
                    <label
                      key={method._id}
                      className='flex items-center space-x-2'
                    >
                      <input
                        type='radio'
                        name='payment'
                        value={method._id}
                        onChange={handleChangePayment}
                        className='form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
                      />
                      <span className='text-gray-700'>
                        {method.paymentMethodName}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className='text-gray-700'>No payment methods available.</p>
                )}
              </div>
              {/* van chuyen */}
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Phương thức vận chuyển
              </h3>
              <div className='flex flex-col space-y-2 mb-4'>
                {shippingMethods && shippingMethods.length > 0 ? (
                  shippingMethods.map((method, index) => (
                    <label
                      key={method._id}
                      className={`flex items-center space-x-2 ${
                        deliveryFees[index] ? '' : 'cursor-not-allowed'
                      }`}
                    >
                      <input
                        disabled={deliveryFees[index] ? false : true}
                        type='radio'
                        name='shipping'
                        value={JSON.stringify({
                          id: method._id,
                          name: method.shippingMethod,
                          index: index,
                        })}
                        onChange={handleChangeShipping}
                        className='form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
                      />
                      <span className='text-gray-700'>
                        {method.shippingMethod}
                      </span>
                      <span className='text-gray-500 ml-2'>
                        {deliveryFees[index]
                          ? ToVietnamCurrencyFormat(deliveryFees[index])
                          : 'Đang tính phí'}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className='text-gray-700'>
                    No shipping methods available.
                  </p>
                )}
              </div>
              <div className='border-t'>
                {/* chi tiet don hang */}
                <h2 className='text-lg font-semibold text-gray-900 mt-4'>
                  Chi tiết đơn hàng
                </h2>
                <div className='mt-4'>
                  {productItems.map(item => (
                    <div key={item._id} className='flex flex-col'>
                      {/* Hiển thị sản phẩm chính */}
                      <div className='flex items-center space-x-4 py-2'>
                        <img
                          src={
                            String(
                              item.product.productImagePath?.[0]
                            ).startsWith('http')
                              ? item.product.productImagePath?.[0]
                              : `http://localhost:5000/${String(
                                  item.product.productImagePath?.[0]
                                ).replace(/\\/g, '/')}`
                          }
                          alt={item.product.productName || 'Sản phẩm không tên'}
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
                            {ToVietnamCurrencyFormat(
                              new Date(
                                item.product.discount?.discountExpiredDate
                              ) > new Date()
                                ? item.itemPrice *
                                    ((100 -
                                      (item.product.discount?.discountPercent ||
                                        0)) /
                                      100) *
                                    item.quantity
                                : item.itemPrice * item.quantity
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Hiển thị quà tặng */}
                      {item.product?.promotion?.productIds ? (
                        <div className='mt-2'>
                          <h4 className='text-lg font-semibold text-gray-800'>
                            Quà tặng kèm:
                          </h4>
                          <ul className='list-disc pl-2'>
                            <li className='flex items-center text-gray-600'>
                              <img
                                src={
                                  String(
                                    item.product.promotion.productIds[0]
                                      .productImagePath?.[0]
                                  ).startsWith('http')
                                    ? item.product.promotion.productIds[0]
                                        .productImagePath?.[0]
                                    : `http://localhost:5000/${String(
                                        item.product.promotion.productIds[0]
                                          .productImagePath?.[0]
                                      ).replace(/\\/g, '/')}`
                                }
                                alt={
                                  item.product.promotion.productIds[0]
                                    .productName || 'Quà tặng không tên'
                                }
                                className='w-10 h-10 object-cover rounded-md mr-2'
                              />
                              <span>
                                {item.product.promotion.productIds[0]
                                  ?.productName || 'Không có tên'}{' '}
                                (trị giá:{' '}
                                {ToVietnamCurrencyFormat(
                                  item.product.promotion.productIds[0].price ||
                                    0
                                )}
                                )
                              </span>
                              {item.product.promotion.discountedPrice && (
                                <span className='ml-2 text-red-500'>
                                  Giảm còn:{' '}
                                  {ToVietnamCurrencyFormat(
                                    item.product.promotion.discountedPrice
                                  )}
                                </span>
                              )}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className='mt-2'>
                          <h4 className='text-lg font-semibold text-gray-800'>
                            Quà tặng kèm:
                          </h4>
                          <p className='text-gray-600'>Không có quà tặng kèm</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* khuyen mai */}
                <div className='border-t flex items-center justify-between py-2'>
                  <div className='font-bold lg:text-xl text-sm'>
                    Mã giảm giá
                  </div>
                  <div
                    className='lg:text-base  text-sm hover:text-white w-[200px] flex justify-center hover:bg-primary font-semibold cursor-pointer rounded-xl p-2 border-2'
                    onClick={() => setModalOpen(true)}
                  >
                    {voucher ? voucher.voucherName : 'Chọn mã giảm giá'}
                  </div>
                </div>
                {modalOpen && (
                  <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[50%] lg:w-[28vw] flex flex-col'>
                      <h2 className='text-2xl font-bold mb-1 text-primary border-b-2 border-gray-300 p-2 flex justify-center'>
                        Chọn mã giảm giá
                      </h2>

                      <div className='italic text-gray text-sm mb-2 flex justify-center'>
                        {ownVouchers.length > 0
                          ? 'Chỉ có thể chọn 1 mã giảm giá'
                          : 'Bạn chưa có voucher nào'}
                      </div>

                      {validVouchers.length > 0 ? (
                        <ul className='space-y-4 max-h-60 overflow-y-auto no-scrollbar'>
                          {validVouchers.map(voucher => (
                            <li
                              key={voucher._id}
                              onClick={() => handleSelectDiscount(voucher)}
                              className='cursor-pointer transition-all duration-300 rounded-lg border p-2 flex items-center gap-4 mb-2 bg-gray-50 hover:bg-gray-100 shadow-md hover:shadow-lg w-full'
                            >
                              <div className='bg-primary p-3 rounded-full'>
                                <Gift className='text-white text-xl' />
                              </div>
                              <div className='flex flex-col'>
                                <p className='text-lg font-semibold text-gray-800'>
                                  {voucher.voucherId.voucherName ||
                                    'Không rõ tên'}
                                </p>
                                <p className='text-sm text-gray-500'>
                                  Giảm {voucher.voucherId.discountPercent || 0}%{' '}
                                  <span className='italic'>
                                    (Tối đa{' '}
                                    {ToVietnamCurrencyFormat(
                                      (voucher.voucherId.maxPriceDiscount ||
                                        0) * 1000
                                    )}
                                    )
                                  </span>
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className='flex justify-center my-3'>
                          <button
                            className='p-2 border bg-primary text-white w-[50%] rounded-xl flex justify-center'
                            onClick={() => navigate('/')}
                          >
                            Thu thập ngay
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => setModalOpen(false)}
                        className='mt-6 bg-primary text-white py-2 px-5 rounded-lg hover:bg-hover-primary transition-colors duration-300'
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                )}

                {/* tong gia */}
                <div className=' border-t border-gray-200 '>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Tổng tiền hàng:</span>
                    <span className='text-gray-900'>
                      {ToVietnamCurrencyFormat(calculateTotal())}
                    </span>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <span className='text-gray-500'>Phí vận chuyển:</span>
                    <span className='text-gray-900'>
                      {selectedShippingMethod
                        ? ToVietnamCurrencyFormat(deliveryFee)
                        : 0}
                    </span>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <span className='text-gray-500'>Giá giảm:</span>
                    <span className='text-gray-900'>
                      {discountPrice
                        ? ToVietnamCurrencyFormat(discountPrice)
                        : 0}
                    </span>
                  </div>
                  <div className='flex justify-between mt-4 text-lg font-medium'>
                    <span>Tổng cộng:</span>
                    <span className='text-gray-900'>
                      {ToVietnamCurrencyFormat(
                        calculateTotal() -
                          discountPrice +
                          (selectedShippingMethod ? deliveryFee : 0)
                      )}
                    </span>
                  </div>
                </div>

                <div className='flex justify-between mt-6'>
                  <button
                    className='w-1/2 mr-2 font-semibold bg-gray-300 text-gray-700 py-3 rounded-md lg:text-lg text-sm hover:bg-gray-400'
                    onClick={() => navigate(-1)}
                  >
                    Trở về
                  </button>
                  <button
                    className={`w-1/2 ml-2 font-semibold bg-primary text-white py-3 rounded-md lg:text-lg text-sm flex justify-center items-center ${
                      isLoading
                        ? 'cursor-not-allowed'
                        : 'hover:bg-hover-primary'
                    }`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className='w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin'></div>
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
            <div className='bg-white rounded-lg p-6 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto'>
              <div className='flex justify-between mb-3 items-center'>
                <h3 className='text-xl font-semibold'>Chọn địa chỉ</h3>

                <button
                  className='bg-primary p-2 rounded-lg font-bold text-white'
                  onClick={() => handleClickOpen()}
                >
                  Thêm địa chỉ
                </button>

                <AddressFormDialog
                  open={open}
                  onClose={handleClose}
                  addressData={editAddress}
                />
              </div>

              <ul className='space-y-2 max-h-[70vh] overflow-y-auto no-scrollbar'>
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
